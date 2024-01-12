# Qwik legacy decorators issue

This repository demonstrates the issue with legacy TS decorators in Qwik dev mode

## Reproduction

1. Clone this repo
2. Install dependencies via `pnpm i`
3. Run `pnpm start` and you'll see following error

```
[vite] Pre-transform error: Expression expected
[vite] Pre-transform error: Unexpected token `@`. Expected identifier, string literal, numeric literal or [ for the computed key
[vite] Pre-transform error: Unexpected token `@`. Expected identifier, string literal, numeric literal or [ for the computed key (x2)
```

This error does not apper in preview mode. Run `pnpm preview` to verify it.
Vite will open your browser and you'll see a todo list app. You will be able to add and remove todos.
