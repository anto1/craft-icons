#!/usr/bin/env node

/**
 * Generate TSX icon components from SVG files.
 * Matches the craft-growth icon pattern exactly.
 *
 * Usage:
 *   1. Export icons from Figma as SVG (select all → Export → SVG)
 *   2. Put SVGs in ./svg/ folder (kebab-case names, e.g. rocket.svg)
 *   3. Run: node generate-icons.mjs
 *   4. Copy output ./components/ to craft-growth/src/components/icons/brand/
 *
 * Options:
 *   --svg-dir=<path>    Source SVG directory (default: ./svg)
 *   --out-dir=<path>    Output TSX directory (default: ./components)
 *   --list              Just list what would be generated, don't write files
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'fs'
import { join, basename, extname } from 'path'

// Parse CLI args
const args = Object.fromEntries(
  process.argv.slice(2)
    .filter(a => a.startsWith('--'))
    .map(a => {
      const [k, v] = a.replace('--', '').split('=')
      return [k, v ?? true]
    })
)

const SVG_DIR = args['svg-dir'] || join(import.meta.dirname, 'svg')
const OUT_DIR = args['out-dir'] || join(import.meta.dirname, 'components')
const LIST_ONLY = args['list'] === true

// kebab-case to PascalCase
function toPascalCase(str) {
  return str
    .split(/[-_\s]+/)
    .map(s => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join('')
}

// Extract all <path>, <circle>, <rect>, <polygon>, <ellipse> elements from SVG
function extractShapes(svgContent) {
  const shapes = []

  // Match self-closing and paired tags for common SVG shapes
  const tagRegex = /<(path|circle|rect|polygon|ellipse|line|polyline)\s[^>]*?\/?>/gi
  let match
  while ((match = tagRegex.exec(svgContent)) !== null) {
    shapes.push(match[0])
  }

  return shapes
}

// Extract viewBox from SVG
function extractViewBox(svgContent) {
  const match = svgContent.match(/viewBox="([^"]*)"/)
  if (match) return match[1]

  // Try to get width/height
  const w = svgContent.match(/width="([^"]*)"/)
  const h = svgContent.match(/height="([^"]*)"/)
  if (w && h) return `0 0 ${parseFloat(w[1])} ${parseFloat(h[1])}`

  return '0 0 48 48'
}

// Clean shape attributes: replace colors with #030302, remove IDs
function cleanShape(shapeStr) {
  return shapeStr
    // Replace fill colors (but keep "none")
    .replace(/fill="(?!none)[^"]*"/g, 'fill="#030302"')
    // Replace stroke colors
    .replace(/stroke="(?!none)[^"]*"/g, 'stroke="#030302"')
    // Remove var() CSS references
    .replace(/var\(--[^)]+,\s*([^)]+)\)/g, '$1')
    // Remove IDs
    .replace(/\s+id="[^"]*"/g, '')
    // Remove data attributes
    .replace(/\s+data-[^=]*="[^"]*"/g, '')
    // Clean up style attributes that reference variables
    .replace(/style="[^"]*"/g, '')
}

// Calculate transform to center content in 48x48
function calcTransform(viewBox) {
  const parts = viewBox.split(/\s+/).map(Number)
  const [vx, vy, vw, vh] = parts

  if (Math.abs(vw - 48) < 0.1 && Math.abs(vh - 48) < 0.1) {
    return null // Already 48x48, no transform needed
  }

  // Scale to fit within 48x48 with padding (content should be ~40px max like Figma icons)
  const targetSize = 40 // Figma icons have ~4px padding on each side
  const scale = Math.min(targetSize / vw, targetSize / vh)
  const scaledW = vw * scale
  const scaledH = vh * scale
  const tx = (48 - scaledW) / 2 - vx * scale
  const ty = (48 - scaledH) / 2 - vy * scale

  return { tx: round(tx), ty: round(ty), scale: round(scale) }
}

function round(n) {
  return Math.round(n * 10000) / 10000
}

// Generate TSX component
function generateTSX(name, svgContent) {
  const pascalName = toPascalCase(name)
  const componentName = `Icon${pascalName}`
  const viewBox = extractViewBox(svgContent)
  const shapes = extractShapes(svgContent)

  if (shapes.length === 0) {
    console.warn(`  ⚠ No shapes found in ${name}.svg — skipping`)
    return null
  }

  const transform = calcTransform(viewBox)

  // Clean and indent shapes
  const cleanedShapes = shapes.map(s => cleanShape(s))

  let innerContent
  if (transform) {
    const transformAttr = `translate(${transform.tx}, ${transform.ty}) scale(${transform.scale})`
    innerContent = `      <g transform="${transformAttr}">\n`
    innerContent += cleanedShapes.map(s => `        ${s}`).join('\n')
    innerContent += '\n      </g>'
  } else {
    innerContent = cleanedShapes.map(s => `      ${s}`).join('\n')
  }

  return `import { cn } from '@/utils/ClassNames'

// 2025 Brand Icon – ${pascalName}
const ${componentName} = ({ className }: { className?: string }) => {
  return (
    <svg
      className={cn('inline-block h-[1em] w-[1em] shrink-0 align-middle leading-[1em]', className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      fill="none"
    >
${innerContent}
    </svg>
  )
}

export default ${componentName}
`
}

// Main
function main() {
  if (!existsSync(SVG_DIR)) {
    console.error(`SVG directory not found: ${SVG_DIR}`)
    console.error('Create it and add your exported SVG files, then run again.')
    process.exit(1)
  }

  const files = readdirSync(SVG_DIR).filter(f => extname(f) === '.svg')

  if (files.length === 0) {
    console.error(`No .svg files found in ${SVG_DIR}`)
    process.exit(1)
  }

  console.log(`Found ${files.length} SVG files in ${SVG_DIR}\n`)

  if (!LIST_ONLY) {
    mkdirSync(OUT_DIR, { recursive: true })
  }

  let generated = 0
  let skipped = 0

  for (const file of files) {
    const name = basename(file, '.svg')
    const pascalName = toPascalCase(name)
    const outFile = `${pascalName}.tsx`

    if (LIST_ONLY) {
      console.log(`  ${file} → ${outFile} (Icon${pascalName})`)
      generated++
      continue
    }

    try {
      const svgContent = readFileSync(join(SVG_DIR, file), 'utf8')
      const tsx = generateTSX(name, svgContent)

      if (tsx) {
        writeFileSync(join(OUT_DIR, outFile), tsx)
        console.log(`  ✓ ${file} → ${outFile}`)
        generated++
      } else {
        skipped++
      }
    } catch (err) {
      console.error(`  ✗ ${file}: ${err.message}`)
      skipped++
    }
  }

  console.log(`\nDone: ${generated} generated, ${skipped} skipped`)

  if (!LIST_ONLY && generated > 0) {
    console.log(`\nOutput: ${OUT_DIR}/`)
    console.log('Next: copy to craft-growth/src/components/icons/brand/')
  }
}

main()
