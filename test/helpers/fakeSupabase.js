// A minimal in-memory stand-in for the @supabase/supabase-js client, covering
// only the chainable shapes this codebase actually uses: select/insert/
// update/upsert/delete with .eq()/.in()/.order()/.single(). Good enough to exercise
// db/supabase.js's logic without a real Supabase project.
//
// Usage:
//   const fake = createFakeSupabase({ character_relationships: [] });
//   mock.module('@supabase/supabase-js', {
//     namedExports: { createClient: () => fake.client },
//   });
//   const { getRelationship } = await import('../db/supabase.js');

function matches(row, filters) {
  return filters.every(([col, val, kind]) =>
    kind === 'in' ? val.includes(row[col]) : row[col] === val,
  );
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
      order(col, opts) { state.order = { col, opts }; return builder; },
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
      const inserted = state.payload.map((r) => ({ affinity: 0, times_met: 0, created_at: now, updated_at: now, ...r }));
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

  return {
    client: { from },
    tables,
    calls,
    forceError,
  };
}
