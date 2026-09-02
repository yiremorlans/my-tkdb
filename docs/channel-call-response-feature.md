# Bot presence + channel-posting enablement

Why the bot shows offline, and how to re-invite it so it can post into a
channel. This is infrastructure only — a prerequisite for the public
"call out" encounters feature, which is fully specified in
[`public-encounters.md`](./public-encounters.md). Feature mechanics (`/call`,
scheduler, silhouettes, rewards) live there, not here.

---

## The green "online" dot

An interactions-endpoint bot (`discord-interactions` + Express, no `discord.js`
gateway) never opens a gateway connection, so Discord shows it permanently
offline even though slash commands work. The dot requires an open gateway
session.

`gateway.js` holds a minimal presence-only session for exactly that:
`new Client({ intents: [GatewayIntentBits.Guilds] })`, `client.login(DISCORD_TOKEN)`,
`setPresence({ status: 'online', ... })`. It reads nothing, handles no events
beyond presence, auto-reconnects, and no-ops when `DISCORD_TOKEN` is unset.
`app.js` starts it after `app.listen`, skipped under `npm test`
(`npm_lifecycle_event`).

### Requirements

- **`DISCORD_TOKEN`** set in Railway (Developer Portal → Bot → Reset Token) —
  a different value from `APP_ID` / `PUBLIC_KEY`.
- **Railway Serverless disabled** for the service. A gateway connection is
  outbound traffic and does not reset Railway's sleep timer, so a sleeping
  container drops the connection and the bot goes offline (and the encounter
  scheduler stops — `public-encounters.md` §3).
- **Bot invited with the `bot` scope** (below). A user-only install
  (`integration_types: [1]`) is not a guild member and never shows a presence.

No privileged intents. Presence / Server Members / Message Content stay **off**
— they govern what the bot sees about *other* users, not its own online state.

---

## Re-inviting with the `bot` scope

`commands.js` registers commands with `integration_types: [0, 1]` (guild + user
install). Showing online and posting to a channel both need the guild (`bot`)
install.

**Scopes:** `bot`, `applications.commands`

**Channel permissions** (OAuth2 → URL Generator, after ticking `bot`):

| Permission | Why |
|---|---|
| View Channels | see the target channel |
| Send Messages | post into it |
| Attach Files | the encounter POST carries a composed silhouette PNG |
| Embed Links | the win edit adds a reveal embed (`public-encounters.md` §5.1) |

That's permission integer **`52224`**. Do **not** grant Manage Messages /
Manage Channels / Administrator.

**Invite URL:**

```
https://discord.com/api/oauth2/authorize?client_id=<APP_ID>&scope=bot%20applications.commands&permissions=52224
```

Re-authorizing a bot already in the server does **not** duplicate it or wipe
registered commands — it updates the granted permissions. `/roam`, `/meet`,
`/affinity`, `/house` are unaffected.

**Tighter alternative:** invite with `permissions=0`, then grant those four
permissions to the bot's role on just the encounter channel.

---

## Checklist

1. Set `DISCORD_TOKEN` in Railway.
2. Disable Serverless on the Railway service.
3. Re-invite with the URL above; confirm the bot appears in the server member
   list.
4. Deploy — `gateway.js` and its `app.js` start hook are already in the tree.
5. Bot shows online, and channel-posting is unblocked for the feature in
   [`public-encounters.md`](./public-encounters.md).
