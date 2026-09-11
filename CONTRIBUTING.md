# Contributing

Thanks for your interest in Vercel Stadium! This repo is a [Three.js Conf Paris](https://threejs.paris/) demo based on [Benjamin Canac](https://github.com/benjamincanac)'s **Tempest** (open source soon), rebranded with Vercel. Follow Benjamin if you want to track — or contribute to — the real project.

## Development

```bash
pnpm install
pnpm dev
```

Local dev uses Nitro's native crossws server, so the arena works with no extra setup — open `http://localhost:3000` in two tabs. The Coach needs an `AI_GATEWAY_API_KEY` in `.env`; without one it stays quiet.

Before opening a pull request:

```bash
pnpm lint
pnpm typecheck
pnpm build
```

## Pull requests

- Use [Conventional Commits](https://www.conventionalcommits.org/) in PR titles (e.g. `feat: add typing indicators`).
- Keep changes focused. Gameplay-affecting code (position, collision, elevation) lives in `shared/utils/arena.ts` so server and client prediction never disagree.
- Update the README when setup steps or architecture change.

## Realtime and secrets

- Do not commit `.env`, `AI_GATEWAY_API_KEY` or `NUXT_SESSION_PASSWORD`.
- Keep the wire protocol in [`shared/types/game.ts`](shared/types/game.ts) as the single source of truth shared by client and server.
- The server is authoritative: never accept positions from clients.

## Questions

Open a [question issue](https://github.com/larbish/vercel-stadium/issues/new?template=question.yml) or a GitHub Discussion if you need help adapting the template.
