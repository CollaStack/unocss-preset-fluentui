# unocss-preset-fluentui

A [UnoCSS](https://unocss.dev) preset that maps [Fluent UI design tokens](https://github.com/microsoft/fluentui/tree/master/packages/tokens) to utility classes — bringing the Microsoft Fluent design language to your atomic CSS workflow.

## Installation

```bash
# npm
npm install unocss-preset-fluentui

# pnpm
pnpm add unocss-preset-fluentui

# bun
bun add unocss-preset-fluentui
```

## Setup

Add the preset to your UnoCSS config:

```ts
// uno.config.ts
import { defineConfig } from 'unocss'
import presetFluentUI from 'unocss-preset-fluentui'

export default defineConfig({
  presets: [presetFluentUI()],
})
```

You can also forward UnoCSS preset options such as `prefix`:

```ts
export default defineConfig({
  presets: [presetFluentUI({ prefix: 'fl-' })],
})
```

## Usage

Use Fluent UI token-based utility classes directly in your markup:

```html
<div
  class="bg-neutral-background1 text-neutral-foreground1 rounded-medium p-m shadow-4"
>
  Hello, Fluent!
</div>
```

## Utility Class Reference

The preset reads all tokens from `@fluentui/tokens` and generates utility classes following this mapping:

### Colors

| Prefix      | CSS Property                              | Example                    |
| ----------- | ----------------------------------------- | -------------------------- |
| `text-`     | `color`                                   | `text-neutral-foreground1` |
| `bg-`       | `background-color`                        | `bg-brand-background`      |
| `border-`   | `border-color`                            | `border-neutral-stroke1`   |
| `border-t-` | `border-top-color`                        | `border-t-brand-stroke1`   |
| `border-b-` | `border-bottom-color`                     |                            |
| `border-l-` | `border-left-color`                       |                            |
| `border-r-` | `border-right-color`                      |                            |
| `border-x-` | `border-left-color`, `border-right-color` |                            |
| `border-y-` | `border-top-color`, `border-bottom-color` |                            |

### Border Radius

| Prefix     | CSS Property    | Example                              |
| ---------- | --------------- | ------------------------------------ |
| `rounded-` | `border-radius` | `rounded-medium`, `rounded-circular` |

### Typography

| Prefix         | CSS Property  | Example                       |
| -------------- | ------------- | ----------------------------- |
| `font-`        | `font-family` | `font-base`, `font-monospace` |
| `text-`        | `font-size`   | `text-base600`                |
| `text-`        | `font-weight` | `text-semibold`               |
| `line-height-` | `line-height` | `line-height-base600`         |

### Shadow

| Prefix    | CSS Property | Example                 |
| --------- | ------------ | ----------------------- |
| `shadow-` | `box-shadow` | `shadow-4`, `shadow-16` |

### Border Width

| Prefix    | CSS Property   | Example                       |
| --------- | -------------- | ----------------------------- |
| `border-` | `border-width` | `border-thin`, `border-thick` |

### Spacing

| Prefix        | CSS Property                     | Example      |
| ------------- | -------------------------------- | ------------ |
| `p-`          | `padding`                        | `p-m`, `p-l` |
| `pt-` / `pb-` | `padding-top` / `padding-bottom` |              |
| `py-`         | `padding-top`, `padding-bottom`  |              |
| `pl-` / `pr-` | `padding-left` / `padding-right` |              |
| `px-`         | `padding-left`, `padding-right`  |              |
| `m-`          | `margin`                         | `m-s`        |
| `mt-` / `mb-` | `margin-top` / `margin-bottom`   |              |
| `my-`         | `margin-top`, `margin-bottom`    |              |
| `ml-` / `mr-` | `margin-left` / `margin-right`   |              |
| `mx-`         | `margin-left`, `margin-right`    |              |

### Z-Index

| Prefix | CSS Property | Example                  |
| ------ | ------------ | ------------------------ |
| `z-`   | `z-index`    | `z-content`, `z-overlay` |

### Animation

| Prefix     | CSS Property                | Example             |
| ---------- | --------------------------- | ------------------- |
| `animate-` | `animation-timing-function` | `animate-easy-ease` |
| `animate-` | `animation-duration`        | `animate-normal`    |

## Works with FluentProvider

This preset generates classes whose values are CSS custom properties (e.g. `var(--colorNeutralForeground1)`). To resolve these variables at runtime, wrap your app with Fluent UI's `FluentProvider`:

```tsx
import { FluentProvider, webLightTheme } from '@fluentui/react-components'

function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      <div className="bg-neutral-background1 text-neutral-foreground1 font-monospace text-base600 border-thin border-brand-background p-m">
        Hello, world!
      </div>
    </FluentProvider>
  )
}
```

Switching themes (e.g. `webDarkTheme`) automatically updates all utility class values — no rebuild needed.

## Development

```bash
# Install dependencies
bun install

# Run playground
bun run dev

# Run tests
bun run test

# Build
bun run build
```

## License

[MIT](./LICENSE)
