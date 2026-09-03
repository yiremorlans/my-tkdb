// A minimal in-memory stand-in for the @supabase/supabase-js client, covering
// only the chainable shapes this codebase actually uses: select/insert/
// update/upsert/delete with .eq()/.in()/.is()/.gt()/.lt()/.order()/.limit()/
// .single(), plus .rpc() for the handful of plpgsql functions in db/migrations.
// Good enough to exercise db/supabase.js's logic without a real Supabase project.
//
// forceError works on rpc too: forceError('rpc', '<function name>', err).
//
// Usage:
//   const fake = createFakeSupabase({ character_relationships: [] });
//   mock.module('@supabase/supabase-js', {
//     namedExports: { createClient: () => fake.client },
//   });
//   const { getRelationship } = await import('../db/supabase.js');

function matches(row, filters) {
  return filters.every(([col, val, kind]) => {
    switch (kind) {
      case 'in': return val.includes(row[col]);
      // `.is(col, null)` is Postgres IS NULL — a column that was never set is
      // undefined in these plain objects, so both spellings count as null.
      case 'is': return val === null ? row[col] == null : row[col] === val;
      case 'gt': return row[col] != null && row[col] > val;
      case 'lt': return row[col] != null && row[col] < val;
      default: return row[col] === val;
    }
  });
}

export function createFakeSupabase(initialTables = {}) {
  const tables = {};
  for (const [name, rows] of Object.entries(initialTables)) {
    tables[name] = rows.map((r) => ({ ...r }));
  }

  // One-shot forced errors, keyed by `${table}:${op}`. Set with forceError,
  // consumed (and cleared) the next time that table+op executes.
  const failures = new Map();
  const calls = [];

  function forceError(table, op, error) {
    failures.set(`${table}:${op}`, error);
  }

  // Per-table sequence, seeded past any id the caller preloaded.
  const sequences = new Map();
  function nextId(table) {
    if (!sequences.has(table)) {
      const highest = (tables[table] || []).reduce(
        (max, row) => (typeof row.id === 'number' && row.id > max ? row.id : max),
        0,
      );
      sequences.set(table, highest);
    }
    const id = sequences.get(table) + 1;
    sequences.set(table, id);
    return id;
  }

  function from(table) {
    tables[table] = tables[table] || [];
    const state = { table, op: 'select', filters: [], payload: null, single: false, order: null };

    const builder = {
      select() { return builder; },
      insert(payload) { state.op = 'insert'; state.payload = Array.isArray(payload) ? payload : [payload]; return builder; },
      update(payload) { state.op = 'update'; state.payload = payload; return builder; },
      upsert(payload, opts) { state.op = 'upsert'; state.payload = payload; state.upsertOpts = opts; return builder; },
      delete() { state.op = 'delete'; return builder; },
      eq(col, val) { state.filters.push([col, val]); return builder; },
      in(col, vals) { state.filters.push([col, vals, 'in']); return builder; },
      is(col, val) { state.filters.push([col, val, 'is']); return builder; },
      gt(col, val) { state.filters.push([col, val, 'gt']); return builder; },
      lt(col, val) { state.filters.push([col, val, 'lt']); return builder; },
      order(col, opts) { state.order = { col, opts }; return builder; },
      limit(n) { state.limit = n; return builder; },
      single() { state.single = true; return builder; },
      then(resolve, reject) { return execute(state).then(resolve, reject); },
      catch(reject) { return execute(state).catch(reject); },
    };
    return builder;
  }

  async function execute(state) {
    calls.push({ table: state.table, op: state.op });

    const key = `${state.table}:${state.op}`;
    if (failures.has(key)) {
      const err = failures.get(key);
      failures.delete(key);
      return { data: null, error: err };
    }

    const list = tables[state.table];

    if (state.op === 'select') {
      let rows = list.filter((r) => matches(r, state.filters));
      if (state.order) {
        const { col, opts } = state.order;
        const dir = opts?.ascending === false ? -1 : 1;
        rows = [...rows].sort((a, b) => (a[col] > b[col] ? dir : a[col] < b[col] ? -dir : 0));
      }
      if (state.limit != null) rows = rows.slice(0, state.limit);
      if (state.single) {
        if (rows.length === 0) {
          return { data: null, error: { code: 'PGRST116', message: 'No rows found' } };
        }
        return { data: { ...rows[0] }, error: null };
      }
      return { data: rows.map((r) => ({ ...r })), error: null };
    }

    if (state.op === 'insert') {
      const now = new Date().toISOString();
      // Stand in for BIGSERIAL: a table keyed by an auto id (public_encounters)
      // hands that id straight back to the caller, which then uses it for the
      // atomic claim.
      const inserted = state.payload.map((r) => ({
        affinity: 0,
        times_met: 0,
        created_at: now,
        updated_at: now,
        ...r,
        ...(r.id === undefined ? { id: nextId(state.table) } : {}),
      }));
      list.push(...inserted);
      // Return copies — like a real API response, this is a point-in-time
      // snapshot, not a live reference the caller could accidentally alias.
      return { data: state.single ? { ...inserted[0] } : inserted.map((r) => ({ ...r })), error: null };
    }

    if (state.op === 'update') {
      const targets = list.filter((r) => matches(r, state.filters));
      targets.forEach((r) => Object.assign(r, state.payload, { updated_at: new Date().toISOString() }));
      return { data: state.single ? (targets[0] ? { ...targets[0] } : null) : targets.map((r) => ({ ...r })), error: null };
    }

    if (state.op === 'upsert') {
      const conflictKeys = state.upsertOpts?.onConflict?.split(',') || [];
      const payloadRows = Array.isArray(state.payload) ? state.payload : [state.payload];
      const results = payloadRows.map((p) => {
        const existing = list.find((r) => conflictKeys.every((k) => r[k] === p[k]));
        if (existing) {
          Object.assign(existing, p, { updated_at: new Date().toISOString() });
          return { ...existing };
        }
        const created = { created_at: new Date().toISOString(), updated_at: new Date().toISOString(), ...p };
        list.push(created);
        return { ...created };
      });
      return { data: results, error: null };
    }

    if (state.op === 'delete') {
      const targets = list.filter((r) => matches(r, state.filters));
      tables[state.table] = list.filter((r) => !matches(r, state.filters));
      return { data: targets, error: null };
    }

    return { data: null, error: { message: `fakeSupabase: unhandled op "${state.op}"` } };
  }

  // Stand-ins for the plpgsql functions in db/migrations. These reimplement the
  // SQL in JS, so they verify that callers pass the right arguments and read the
  // result back correctly — NOT that the SQL itself is right. Atomicity in
  // particular is a property of Postgres and is not modelled here.
  // Lets a test pin the month boundary rather than depending on wall clock.
  let rpcNow = new Date();
  function setRpcNow(date) {
    rpcNow = date;
  }

  const rpcHandlers = {
    // db/migrations/010: INSERT ... ON CONFLICT (user, char, kind)
    //                    DO UPDATE SET total = total + 1
    record_encounter_milestone({ p_user_id, p_character_id, p_milestone_type }) {
      tables.encounter_milestones = tables.encounter_milestones || [];
      const now = rpcNow.toISOString();

      const existing = tables.encounter_milestones.find(
        (r) => r.discord_user_id === p_user_id
          && r.character_id === p_character_id
          && r.milestone_type === p_milestone_type,
      );
      if (existing) {
        existing.total += 1;
        existing.last_at = now;
        return existing.total;
      }

      tables.encounter_milestones.push({
        discord_user_id: p_user_id,
        character_id: p_character_id,
        milestone_type: p_milestone_type,
        total: 1,
        first_at: now,
        last_at: now,
      });
      return 1;
    },

    // db/migrations/011: INSERT ... ON CONFLICT DO UPDATE SET wins = wins + 1
    record_encounter_win({ p_user_id, p_guild_id }) {
      const yearMonth = `${rpcNow.getUTCFullYear()}-${String(rpcNow.getUTCMonth() + 1).padStart(2, '0')}`;
      tables.encounter_win_stats = tables.encounter_win_stats || [];

      const existing = tables.encounter_win_stats.find(
        (r) => r.discord_user_id === p_user_id && r.guild_id === p_guild_id && r.year_month === yearMonth,
      );
      if (existing) {
        existing.wins += 1;
        existing.last_win_at = rpcNow.toISOString();
        return existing.wins;
      }

      tables.encounter_win_stats.push({
        discord_user_id: p_user_id,
        guild_id: p_guild_id,
        year_month: yearMonth,
        wins: 1,
        last_win_at: rpcNow.toISOString(),
      });
      return 1;
    },
  };

  async function rpc(name, args) {
    calls.push({ table: `rpc:${name}`, op: 'rpc' });

    const key = `rpc:${name}`;
    if (failures.has(key)) {
      const err = failures.get(key);
      failures.delete(key);
      return { data: null, error: err };
    }

    const handler = rpcHandlers[name];
    if (!handler) return { data: null, error: { message: `fakeSupabase: no rpc handler for "${name}"` } };
    return { data: handler(args || {}), error: null };
  }

  return {
    client: { from, rpc },
    tables,
    calls,
    forceError,
    setRpcNow,
  };
}
