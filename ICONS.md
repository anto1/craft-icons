# Craft Icons — Usage Guide for Claude Code

## Overview

141 custom Craft icons. These are **brand assets** — never use Lucide, Heroicons, or other generic icon libraries.

All icons are single-color, 48×48 viewBox, use `currentColor` for fill/stroke.

## Finding the Right Icon

### Method 1: Keyword search (fastest)
Search `icon-keywords.txt` for your concept:
```
# Example: need an icon for "collaboration"
collaboration → handshake, users-group
```

### Method 2: JSON lookup (full metadata)
Read `craft-icons.json` and search the `keywords` arrays. Each icon also has:
- `category` — ai, platform, documents, organization, steps, communication, tasks, ui, misc
- `use_on` — which page types the icon fits (comparison, use-case, integration, etc.)
- `exists` — whether the React component exists in craft-growth yet
- `component` — path under `src/components/icons/` in craft-growth

## Adding Icons to Pages

Icons in `craft-growth` are inline SVG React components at `src/components/icons/`.

```tsx
import IconFocus from '@/components/icons/brand/Focus'

// Size via font-size (icons use h-[1em] w-[1em] internally)
<IconFocus className="text-[48px]" />

// Or via explicit width/height override
<IconFocus className="h-[48px] w-[48px] shrink-0" />
```

**Icon internals:** Each icon uses `cn('inline-block h-[1em] w-[1em] shrink-0 align-middle leading-[1em]', className)` — they size based on `font-size` by default. Color is hardcoded `#030302` (Craft warm black), not `currentColor`.

### If the icon component doesn't exist yet
Check `exists` in `craft-icons.json`. If `false`, the React component needs to be created first. See `icons-to-create.md` for the full list.

## Icon Sizes

| Context | Size | Class |
|---------|------|-------|
| Feature cards | 48px (default) | `text-[48px]` or `h-[48px] w-[48px]` |
| Inline / small | 24px | `text-[24px]` or `h-[24px] w-[24px]` |
| Hero accent | 64px | `text-[64px]` or `h-[64px] w-[64px]` |

## Icons by Page Type

**Comparison pages:** scale-balance, check, star, trophy, step-1/2/3, table, price-tag, good, shield, performance, quotes, flight, clock, lock, sync

**Use Case pages:** users-single, briefcase, rocket, heart, lamp, megaphone, focus, users-group, education, headphones, calendar, pencil, todo-circled, quick-capture

**Integration pages:** plug, link-chain, gear, puzzle-piece, code, sync, handshake, database, step-1/2/3, lightning

**How to Create pages:** step-1 through step-5, step-star, pencil, lamp, highlighter, doc, blank-doc, book, list, image

**Alternative pages:** trophy, shield, good, star, performance, quotes, heart, scale-balance, users-group

**Feature pages:** varies by feature — use keyword search in `icon-keywords.txt`

**Platform pages:** apple-logo, device-ipad, device-iphone, device-laptop, device-desktop, device-desktop-windows, windows, platform-android, browser-chrome, browser-firefox, browser-safari, apple-vision-1/2

**Hub pages:** compass, search, apps, filter-funnel, folder

**Customize pages:** palette-colour, styling, dark, drop, flower, washitape, pencils, text-style

## Rules

1. **Craft icons only** — they are a brand asset alongside fonts, colours, and noise texture
2. Icons inherit `currentColor` — set color via `text-*` or `text-black/XX` classes
3. Always pair icons with text labels — never standalone without context
4. Don't stretch or distort — use consistent width/height values
5. Default viewBox is `0 0 48 48`
6. Use `shrink-0` to prevent icons from collapsing in flex layouts

## Categories

| Category | Count | Examples |
|----------|-------|---------|
| ai | 6 | ai, ai-deep, ai-llama, apple-ai, atom-ai, lightning |
| platform | 16 | apple-logo, device-iphone, device-ipad, windows, android |
| documents | 14 | doc, blank-doc, book, clipboard, highlighter, image, list |
| organization | 16 | apps, archive, arrow, bookmark, calendar, folder, search |
| steps | 6 | step-1, step-2, step-3, step-4, step-5, step-star |
| communication | 10 | chat, education, email, handshake, heart, megaphone |
| tasks | 11 | check, check-squared, cursor-click, plug, scribble, todo-circled |
| ui | 16 | backlink, clock, cloud, code, command, dark, gear, lock, shield |
| food & drink | 3 | cooking, ice-cream, utensils-fork-knife |
| home & lifestyle | 5 | box-package, house, fitness-dumbbell, spa-lotus, wrench |
| nature & animals | 2 | leaf-plant, paw-animal |
| commerce | 3 | cart, receipt-invoice, chart-up |
| media | 2 | camera-photo, movie-clapper |
| misc | 12 | diamond, drop, eternity, flight, flower, headphones, hoodie, rocket, socks, timer-stopwatch |
