# Discord chance-encounter app

This Discord app gives users random chance encounters with characters via two slash commands:

- `/roam` — wander to a random location; you might run into whoever's around, weighted by house and time of day (locations ending in `_PM` only appear in the evening).
- `/meet` — pick from 4 random characters to meet up with directly.

Whichever character you meet, you respond to their dialogue (Kind / Playful / Bold / Neutral) to grow your relationship with them over time. Progress is stored per Discord user in `data/relationships.json`.

Three read-only commands report on that progress — no cooldown:

- `/affinity <name> [up to 5 names]` — relationship level and progress bar for the named characters.
- `/house` — which of the 8 houses your total bonds lean toward.
- `/bonds` — a plain-text list of every character you have at least 1 point with, ranked closest first, each with their relationship level. **ephemeral**

Each encounter displays a canvas-composited image: the location background with the character layered on top, dialogue box at the bottom, and all 4 response options visible as buttons. Command responses are ephemeral (only visible to the user who invoked it).

### Public "call out" encounters

On top of the private loop above, the bot posts a **public** encounter into one configured channel per server, on its own random cadence. The character is shown as a black silhouette over a real background, and the first person to name them wins:

- `/call <name>` — say who you think the silhouette is. Only works in that server's encounter channel. A wrong *real name* costs you a 10-second pause; a typo or nonsense costs nothing. **ephemeral**
- `/encounters channel|disable|status` — **Manage Server permission required**, checked on every invocation rather than relying on Discord's overridable default. Points the feature at a channel (re-running it moves the channel, bringing any live encounter with it), turns it off, or reports whether it's running.

Get it right first and the post is edited to add a reveal embed: a relationship-tiered line naming you and the character, over a thumbnail of their real art. The big silhouette stays put. Nobody gets it in time and the post edits to a non-committal "the moment has passed" — the image is dropped and the name is never spoken.

**A win never moves affinity.** Affinity only ever grows through `/roam` and `/meet`, so the public game can't race anyone past dialogue tiers they haven't seen. Instead a win grants a *pending boost* — worth one extra point on your next `/roam` or `/meet` with that character (win twice before you go back and both apply to that one reunion) — and logs a *milestone*, a themed "what happened after" moment that shows up as a **Moments together** tally in `/affinity`.

Each server runs independently: its own schedule, its own in-flight encounter, its own channel. Affinity stays global to the Discord user. Full design notes are in [`docs/public-encounters.md`](docs/public-encounters.md); the one-time bot install this needs is in [`docs/channel-call-response-feature.md`](docs/channel-call-response-feature.md).

## Project structure
Below is a basic overview of the project structure:

```
├── assets/
│   ├── bg/     -> location background art, served at /assets/bg
│   └── chars/  -> character portrait art, served at /assets/chars
├── constants/
│   ├── backgrounds.js -> houses, general locations, and PM/evening gating
│   ├── characters.js  -> character roster, grouped by house
│   ├── game.js        -> response options, affinity values, relationship levels
│   └── publicEncounters.js -> teasers/winner lines/milestones, name matching, guess cooldown
├── examples    -> short, feature-specific sample apps from the original template
│   ├── app.js  -> finished app.js code
│   ├── button.js
│   ├── command.js
│   ├── modal.js
│   ├── selectMenu.js
├── data/ -> legacy local per-user data (gitignored; superseded by Supabase)
│   └── relationships.json -> relationship progress
├── db/
│   └── schema.sql -> Postgres schema for future migration
├── .env.sample  -> sample .env file
├── app.js       -> main entrypoint for app
├── commands.js  -> slash command payloads + helpers
├── encounters.js -> builds the slash-command message payloads (/roam, /meet, /affinity, /house, /bonds), handles dialogue responses
├── storage.js   -> reads/writes data/relationships.json
├── commandLimits.js -> per-command rolling 3-hour cooldown for /roam and /meet (Supabase-backed, anchored to last completed encounter)
├── publicEncounters.js -> public call-out encounters: spawn, expiry, /call and /encounters handlers
├── encounterScheduler.js -> the per-guild tick loop that drives those spawns
├── discordRest.js -> bot-initiated channel POST/PATCH (everything else answers an interaction)
├── imageComposition.js -> canvas-based image rendering (bg + character + dialogue, or a black silhouette)
├── utils.js     -> utility functions and enums
├── package.json
├── README.md
└── .gitignore
```

## Running app locally

Before you start, you'll need to install [NodeJS](https://nodejs.org/en/download/) and [create a Discord app](https://discord.com/developers/applications) with the proper permissions:
- `applications.commands`
- `bot` (with Send Messages enabled)


Configuring the app is covered in detail in the [getting started guide](https://discord.com/developers/docs/getting-started).

### Setup project

First clone the project:
```
git clone https://github.com/discord/discord-example-app.git
```

Then navigate to its directory and install dependencies:
```
cd my-tkdb
npm install
```

**Note:** The `canvas` package requires system dependencies. On macOS, ensure you have Xcode Command Line Tools (`xcode-select --install`). On Linux, install `libcairo2-dev` and related packages. On Windows, Visual Studio build tools are required.
### Get app credentials

Fetch the credentials from your app's settings and add them to a `.env` file (see `.env.sample` for an example). You'll need your app ID (`APP_ID`), bot token (`DISCORD_TOKEN`), and public key (`PUBLIC_KEY`). You'll also need `BASE_URL` — the public HTTPS URL this app is reachable at (your ngrok URL while developing locally, or your production domain) — since it's used to build the background/character image URLs Discord loads for `/roam` and `/meet`.

Set `TZ` (an IANA timezone name) to the zone the bot should treat as "evening" for time-gated `_PM` backgrounds and dialogue — Discord doesn't expose per-user timezones, so it's one zone for everyone. `app.js` defaults it to `America/Chicago` if unset; the startup log prints the timezone actually in effect.

Fetching credentials is covered in detail in the [getting started guide](https://discord.com/developers/docs/getting-started).

> 🔑 Environment variables can be added to the `.env` file in Glitch or when developing locally, and in the Secrets tab in Replit (the lock icon on the left).

### Install slash commands

The commands for the example app are set up in `commands.js`. All of the commands in the `ALL_COMMANDS` array at the bottom of `commands.js` will be installed when you run the `register` command configured in `package.json`:

```
npm run register
```

### Run the app

After your credentials are added, go ahead and run the app:

```
node app.js
```

> ⚙️ A package [like `nodemon`](https://github.com/remy/nodemon), which watches for local changes and restarts your app, may be helpful while locally developing.

If you aren't following the [getting started guide](https://discord.com/developers/docs/getting-started), you can move the contents of `examples/app.js` (the finished `app.js` file) to the top-level `app.js`.

### Set up interactivity

The project needs a public endpoint where Discord can send requests. To develop and test locally, you can use something like [`ngrok`](https://ngrok.com/) to tunnel HTTP traffic.

Install ngrok if you haven't already, then start listening on port `3000`:

```
ngrok http 3000
```

You should see your connection open:

```
Tunnel Status                 online
Version                       2.0/2.0
Web Interface                 http://127.0.0.1:4040
Forwarding                    https://1234-someurl.ngrok.io -> localhost:3000

Connections                  ttl     opn     rt1     rt5     p50     p90
                              0       0       0.00    0.00    0.00    0.00
```

Copy the forwarding address that starts with `https`, in this case `https://1234-someurl.ngrok.io`, then go to your [app's settings](https://discord.com/developers/applications).

On the **General Information** tab, there will be an **Interactions Endpoint URL**. Paste your ngrok address there, and append `/interactions` to it (`https://1234-someurl.ngrok.io/interactions` in the example).

Click **Save Changes**, and your app should be ready to run 🚀

## Other resources
- Read **[the documentation](https://discord.com/developers/docs/intro)** for in-depth information about API features.
- Browse the `examples/` folder in this project for smaller, feature-specific code examples
- Join the **[Discord Developers server](https://discord.gg/discord-developers)** to ask questions about the API, attend events hosted by the Discord API team, and interact with other devs.
- Check out **[community resources](https://discord.com/developers/docs/topics/community-resources#community-resources)** for language-specific tools maintained by community members.
