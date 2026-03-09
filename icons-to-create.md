# Icons To Create — React Components Needed

These icons exist in Figma but don't have React components in `craft-growth` yet.
Each needs a `.tsx` file in `src/components/icons/` following the existing pattern.

## Template

Matches the exact pattern from `craft-growth/src/components/icons/brand/`:

```tsx
import { cn } from '@/utils/ClassNames'

// 2025 Brand Icon – IconName
const IconIconName = ({ className }: { className?: string }) => {
  return (
    <svg
      className={cn('inline-block h-[1em] w-[1em] shrink-0 align-middle leading-[1em]', className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      fill="none"
    >
      <path
        fill="#030302"
        d="..." // SVG path data from Figma export
      />
    </svg>
  )
}

export default IconIconName
```

**Key conventions:**
- Component name: `Icon{PascalCase}` (e.g., `IconRocket`, `IconScaleBalance`)
- Sizing: em-based (`h-[1em] w-[1em]`), NOT fixed px — parent controls size via `text-[48px]` etc.
- Color: `fill="#030302"` (Craft's warm near-black) — NOT `currentColor`
- Uses `cn()` utility from `@/utils/ClassNames` for className merging
- Single `<path>` with optimized SVG data (merged paths, no groups)
- No barrel/index exports — each icon imported by direct path

## Icons to Create (40)

### High Priority — used across many page types

| Icon | Figma Name | Component Path | Used On |
|------|-----------|----------------|---------|
| rocket | Icon=Rocket | `brand/Rocket` | use-case, how-to-create, cta |
| lamp | Icon=Lamp | `brand/Lamp` | use-case, how-to-create, feature |
| plug | Icon=Plug | `brand/Plug` | integration, feature |
| gear | Icon=Gear | `brand/Gear` | integration, how-to-create |
| heart | Icon=Heart | `brand/Heart` | use-case, alternative |
| trophy | Icon=Trophy | `brand/Trophy` | comparison, alternative |
| scale-balance | Icon=Scale-Balance | `brand/ScaleBalance` | comparison, alternative |
| search | Icon=Search | `brand/Search` | hub, feature |
| link-chain | Icon=Link-Chain | `brand/LinkChain` | integration, feature |
| megaphone | Icon=Megaphone | `brand/Megaphone` | use-case, cta |
| performance | Icon=Performance | `brand/Performance` | comparison, alternative, feature |
| puzzle-piece | Icon=Puzzle-Piece | `brand/PuzzlePiece` | integration |
| lightning | Icon=Lightning | *(needs path)* | feature, comparison, integration |
| briefcase | Icon=Briefcase | `brand/Briefcase` | use-case, alternative |
| handshake | Icon=Handshake | `brand/Handshake` | integration, use-case |
| cursor-click | Icon=Cursor-Click | `brand/CursorClick` | feature, use-case |

### Medium Priority — specific page types

| Icon | Figma Name | Component Path | Used On |
|------|-----------|----------------|---------|
| bell | Icon=Bell | `brand/Bell` | feature, use-case |
| flag | Icon=Flag | `brand/Flag` | use-case, feature |
| filter-funnel | Icon=Filter-Funnel | `brand/FilterFunnel` | hub, feature |
| command | Icon=Command | `brand/Command` | feature, use-case |
| backlink | Icon=Backlink-[[ | `brand/Backlink` | feature, use-case |
| database | Icon=Database | `brand/Database` | feature, integration |
| palette-colour | Icon=Palette-Colour | `brand/PaletteColour` | feature, customize |
| code | Icon=Code | *(needs path)* | feature, integration |
| email | Icon=Email | *(needs path)* | integration, feature |
| quick-capture | Icon=Quick capture | `brand/QuickCapture` | feature, use-case |
| branch | Icon=Branch | `brand/Branch` | feature, use-case |
| pin-location | Icon=Pin-Location | `brand/PinLocation` | use-case |
| step-4 | Icon=Step-4 | `brand/StepFour` | how-to-create |
| step-5 | Icon=Step-5 | `brand/StepFive` | how-to-create |
| summarise | Icon=Summarise | `brand/Summarise` | feature, ai |
| whiteboard | Icon=Whiteboard | `brand/Whiteboard` | feature |

### Low Priority — niche or decorative

| Icon | Figma Name | Component Path | Used On |
|------|-----------|----------------|---------|
| underline | Icon=Underline | `brand/Underline` | feature |
| pagebreak | Icon=PageBreak | `brand/PageBreak` | feature |
| washitape | Icon=Washitape | `brand/Washitape` | customize |
| socks | Icon=Socks | `brand/Socks` | — |
| hoodie | Icon=Hoodie | `brand/Hoodie` | — |
| icon102 | Icon=Icon102 | `brand/Icon102` | — |

### Not Yet in Figma — Proposed

| Icon | Purpose | Recommended For |
|------|---------|-----------------|
| chart-up | Growth, analytics, trends | comparison, feature |
| versus | VS comparisons | comparison, alternative |
| sparkle | AI, magic, new | feature, ai |
| template | Templates, starting points | how-to-create, hub |
| brain | Knowledge, thinking | use-case, feature |
| layers | Structure, depth | feature |
| arrow-transfer | Migration, switch | comparison |
| calendar-update | Last updated, freshness | all |
| workflow | Process, automation | use-case, integration |
| timeline | History, roadmap | feature |

## Already Generated (38)

All 38 TSX files are in `icons-library/components/` ready to copy to `craft-growth/src/components/icons/brand/`.

### From JSON pipeline (6)
`Rocket.tsx`, `Plug.tsx`, `Gear.tsx`, `Search.tsx`, `Bell.tsx`, `Flag.tsx`

### From Figma MCP direct download (32)
`Backlink.tsx`, `Branch.tsx`, `Briefcase.tsx`, `Code.tsx`, `Command.tsx`, `CursorClick.tsx`, `Database.tsx`, `Email.tsx`, `FilterFunnel.tsx`, `Handshake.tsx`, `Heart.tsx`, `Hoodie.tsx`, `Icon102.tsx`, `Lamp.tsx`, `Lightning.tsx`, `LinkChain.tsx`, `Megaphone.tsx`, `Pagebreak.tsx`, `PaletteColour.tsx`, `Performance.tsx`, `PinLocation.tsx`, `PuzzlePiece.tsx`, `QuickCapture.tsx`, `ScaleBalance.tsx`, `Socks.tsx`, `Step4.tsx`, `Step5.tsx`, `Summarise.tsx`, `Trophy.tsx`, `Underline.tsx`, `Washitape.tsx`, `Whiteboard.tsx`

**Note:** Multi-layer icons (trophy, palette-colour, database, etc.) were composed from individual Figma vector layers. Visual verification recommended — stroked icons may need "Outline Stroke" applied in Figma for clean fills.

## Export & Generate Process

### Step 1: Export SVGs from Figma
1. Open the Component Library in Figma
2. Select all remaining icons that need components
3. **Important:** Right-click → "Outline Stroke" on each icon (converts strokes to fills)
4. Export as SVG (48×48 frame, not just the vector)
5. Save to `icons-library/svg/` folder with kebab-case names (e.g., `heart.svg`)

### Step 2: Generate TSX
```bash
cd icons-library
node generate-icons.mjs
```

This reads SVGs from `./svg/`, generates TSX components in `./components/`.

### Step 3: Copy to craft-growth
```bash
cp components/*.tsx /path/to/craft-growth/src/components/icons/brand/
```

### Step 4: Verify
Each icon should:
- Render at correct size via em-based sizing
- Show `#030302` warm black color
- Accept `className` for overrides
- Match visual weight of existing icons (Check, Focus, Doc, etc.)

### Alternative: JSON pipeline
If you have SVG path data in JSON format (from Figma MCP or other tools):
```bash
node json-to-tsx.mjs
```
Reads `svg-data*.json` files and generates TSX components in `./components/`.
