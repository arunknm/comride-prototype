# Comride — VOLT NOIR Design System
## Master Style Reference for All Pages

This file is the single source of truth for every HTML page in the Comride app. Follow every rule exactly — no assumptions, no deviations.

---

## 1. Page Shell

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Manrope:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    * { box-sizing: border-box; }
    html, body { background: #000; color: #fff; font-family: 'Manrope', sans-serif; -webkit-font-smoothing: antialiased; }
    ::selection { background: #E2FF3B; color: #2A3000; }
  </style>
</head>
<body class="bg-black text-white">
  <!-- Content wrapper — all page content goes inside this -->
  <div style="max-width:390px;margin:0 auto;padding:64px 24px 160px">
    <!-- page sections here -->
  </div>

  <!-- Fixed bottom nav (always present) -->
  <!-- See Section 10 below -->
</body>
</html>
```

**Rules:**
- Max content width: `390px`, centered with `margin:0 auto`
- Horizontal padding: `24px` each side → `342px` usable content width
- Top padding: `64px`
- Bottom padding: `160px` (clears the fixed nav)
- Background: `#000000` (pure black)
- Body font: `Manrope`
- `-webkit-font-smoothing: antialiased` always on

---

## 2. Color Tokens

| Token | Value | Usage |
|---|---|---|
| `primary` | `#E2FF3B` | Lime accent — active states, CTAs, highlights |
| `on-primary` | `#536000` | Text on lime backgrounds |
| `background` | `#000000` | Page background |
| `surface-low` | `#131313` | Subtle card backgrounds, input fields |
| `surface` | `#191919` | Standard card backgrounds |
| `surface-high` | `#1f1f1f` | Elevated surfaces, inactive states |
| `surface-highest` | `#262626` | Highest elevation surfaces |
| `on-surface` | `#ffffff` | Primary text |
| `on-surface-variant` | `#ababab` | Secondary/muted text, labels, placeholders |
| `outline` | `#484848` | Borders, dividers |
| `success` | `#4ade80` | Positive status (e.g. LIQUID) |
| `primary-glow` | `rgba(226,255,59,0.08)` | Subtle lime glow (shadows) |
| `primary-tint` | `rgba(226,255,59,0.1)` | Lime tint backgrounds |

**Opacity conventions:**
- Borders: `rgba(72,72,72,0.1)` — very subtle dividers
- Borders (medium): `rgba(72,72,72,0.2)` — standard card borders
- Primary border: `rgba(226,255,58,0.2)` — lime-tinted borders
- Overlay dark: `rgba(0,0,0,0.6)` — glass overlays on photos

---

## 3. Typography

### Font Families
| Family | Usage |
|---|---|
| `Space Grotesk` | Headlines, display text, numbers, UI labels in cards |
| `Manrope` | Body copy, captions, buttons, tags, metadata |

### Type Scale

**Display / Hero**
```css
font-family: 'Space Grotesk', sans-serif;
font-weight: 700;
font-size: 60px;
line-height: 60px;
letter-spacing: -3px;
text-transform: uppercase;
```
*Use: page hero headings (MASTER MODULE GALLERY, ₵14,250)*

**Section Heading Large**
```css
font-family: 'Space Grotesk', sans-serif;
font-weight: 700;
font-size: 48px;
line-height: 48px;
letter-spacing: -2.4px;
text-transform: uppercase;
```
*Use: UPCOMING JOURNEY, FRIENDS ACTIVITY*

**Section Heading**
```css
font-family: 'Space Grotesk', sans-serif;
font-weight: 700;
font-size: 36px;
line-height: 40px;
letter-spacing: -1.8px;
text-transform: uppercase;
```

**Card Title Large**
```css
font-family: 'Space Grotesk', sans-serif;
font-weight: 700;
font-size: 30px;
line-height: 36px;
text-transform: uppercase;
```
*Use: NEO-SHIBUYA 09, GRID LOCK RUN, LEX_KINETIC*

**Card Title**
```css
font-family: 'Space Grotesk', sans-serif;
font-weight: 700;
font-size: 24px;
line-height: 32px;
letter-spacing: -0.6px;
text-transform: uppercase;
```

**Card Title Small**
```css
font-family: 'Space Grotesk', sans-serif;
font-weight: 700;
font-size: 20px;
line-height: 28px;
text-transform: uppercase;
```

**Stats Number**
```css
font-family: 'Space Grotesk', sans-serif;
font-weight: 700;
font-size: 36px;
line-height: 40px;
```
*Use: 128km, 4.2k kcal, 3.1k m — value in white, unit in #E2FF3B*

**Level Number**
```css
font-family: 'Space Grotesk', sans-serif;
font-weight: 700;
font-size: 96px;
line-height: 96px;
```

**Body Large**
```css
font-family: 'Manrope', sans-serif;
font-weight: 300;
font-size: 18px;
line-height: 29.25px;
color: #ababab;
```
*Use: hero description paragraph*

**Body**
```css
font-family: 'Manrope', sans-serif;
font-weight: 400;
font-size: 14px;
line-height: 22px;
color: #ababab;
```

**Body Small**
```css
font-family: 'Manrope', sans-serif;
font-weight: 400;
font-size: 12px;
line-height: 16px;
color: #ababab;
```

**Label / Tag**
```css
font-family: 'Manrope', sans-serif;
font-weight: 700;
font-size: 10px;
letter-spacing: 1px;
text-transform: uppercase;
color: #ababab;
```
*Use: CALLSIGN / USERNAME, TOTAL DISTANCE, CORE ACHIEVEMENTS*

**Section Divider Label**
```css
font-family: 'Manrope', sans-serif;
font-weight: 700;
font-size: 10px;
letter-spacing: 3.6px;
text-transform: uppercase;
color: #ababab;
```
*Use: 01. UPCOMING RIDES, 02. BUTTON SYSTEMS, etc.*

**Button Text**
```css
font-family: 'Manrope', sans-serif;
font-weight: 700;
font-size: 12px;
letter-spacing: 1px;
text-transform: uppercase;
```

**Nav Label**
```css
font-family: 'Space Grotesk', sans-serif;
font-weight: 700;
font-size: 10px;
letter-spacing: -0.5px;
text-transform: uppercase;
```

---

## 4. Spacing & Layout

| Use | Value |
|---|---|
| Section gap (between major sections) | `80px` |
| Card internal padding (large) | `40px` |
| Card internal padding (standard) | `33px` |
| Card internal padding (compact) | `24px` |
| Between cards in a section | `32px` |
| Between elements within a card | `24px` |
| Between tight elements | `16px` |
| Between label + value | `4–8px` |
| Section label margin-bottom | `48px` |

---

## 5. Border Radius

| Use | Value |
|---|---|
| Cards (standard) | `32px` |
| Small cards / inputs | `12px` |
| Input fields | `10px` |
| Pills / badges | `9999px` |
| Avatar circles | `50%` |
| Achievement icons | `32px` |

---

## 6. Component Patterns

### Section Divider
```html
<div style="display:flex;align-items:center;gap:16px;margin-bottom:48px">
  <div style="height:1px;width:28px;background:#484848;flex-shrink:0"></div>
  <span style="font-family:'Manrope',sans-serif;font-weight:700;font-size:10px;letter-spacing:3.6px;text-transform:uppercase;color:#ababab;white-space:nowrap">01. Section Name</span>
  <div style="height:1px;flex:1;background:#484848"></div>
</div>
```

### Primary Button (Lime CTA)
```html
<button style="background:#E2FF3B;border:none;border-radius:9999px;padding:14px 22px;cursor:pointer;white-space:nowrap">
  <span style="font-family:'Manrope',sans-serif;font-weight:700;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#536000">Button Label</span>
</button>
```

### Secondary Button (Outlined)
```html
<button style="background:transparent;border:1px solid #484848;border-radius:9999px;padding:14px 20px;cursor:pointer;white-space:nowrap">
  <span style="font-family:'Manrope',sans-serif;font-weight:700;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#fff">Button Label</span>
</button>
```

### Full-Width Action Button (in cards)
```html
<button style="width:100%;border:none;border-radius:9999px;padding:16px;cursor:pointer;background:linear-gradient(166.22deg,#E2FF3B 0%,#C0DC03 100%)">
  <span style="font-family:'Manrope',sans-serif;font-weight:700;font-size:14px;letter-spacing:1.4px;text-transform:uppercase;color:#000">START RIDE</span>
</button>
```

### Outlined Action Button (in cards)
```html
<button style="width:100%;background:#262626;border:1px solid rgba(226,255,58,0.4);border-radius:9999px;padding:17px;cursor:pointer">
  <span style="font-family:'Manrope',sans-serif;font-weight:700;font-size:10px;letter-spacing:1px;text-transform:uppercase;color:#E2FF3B">Launch Renewal Center</span>
</button>
```

### Standard Card
```html
<div style="background:#191919;border-radius:32px;padding:33px">
  <!-- card content -->
</div>
```

### Card with Lime Left Border
```html
<div style="background:#191919;border-left:4px solid #E2FF3B;border-radius:32px;padding:24px 24px 24px 28px">
  <!-- card content -->
</div>
```

### Photo Card (full-bleed image with overlay)
```html
<div style="background:#191919;border-radius:32px;overflow:hidden;aspect-ratio:4/5;position:relative">
  <div style="position:absolute;inset:0;overflow:hidden">
    <img src="..." style="width:125%;height:100%;object-fit:cover;margin-left:-12.5%;opacity:0.6" />
  </div>
  <div style="position:absolute;inset:0;background:linear-gradient(to top,#000 0%,rgba(0,0,0,0.2) 50%,transparent 100%)"></div>
  <!-- Badge top-left -->
  <div style="position:absolute;top:24px;left:24px;background:#E2FF3B;border-radius:9999px;padding:4px 12px">
    <span style="font-family:'Manrope',sans-serif;font-weight:700;font-size:10px;letter-spacing:1px;text-transform:uppercase;color:#536000">HARD</span>
  </div>
  <!-- Content bottom -->
  <div style="position:absolute;bottom:32px;left:32px;right:32px">
    <!-- title + meta -->
  </div>
</div>
```

### Glass Card (over photo)
```html
<div style="background:rgba(0,0,0,0.6);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.05);border-radius:32px;padding:33px">
  <!-- content -->
</div>
```

### Input Field
```html
<div>
  <label style="font-family:'Manrope',sans-serif;font-weight:700;font-size:10px;letter-spacing:1px;text-transform:uppercase;color:#ababab;display:block;margin-bottom:8px">Field Label</label>
  <div style="background:#131313;border:1px solid #484848;border-bottom:2px solid #484848;border-radius:10px;padding:18px 21px">
    <span style="font-family:'Space Grotesk',sans-serif;font-weight:400;font-size:20px;color:#6b7280;text-transform:uppercase">Placeholder</span>
  </div>
</div>
```

### Badge — Lime (Hard / Elite)
```html
<div style="background:#E2FF3B;border-radius:9999px;padding:4px 12px;display:inline-block">
  <span style="font-family:'Manrope',sans-serif;font-weight:700;font-size:10px;letter-spacing:1px;text-transform:uppercase;color:#536000">HARD</span>
</div>
```

### Badge — Muted (Entry)
```html
<div style="background:#ababab;border-radius:9999px;padding:4px 12px;display:inline-block">
  <span style="font-family:'Manrope',sans-serif;font-weight:700;font-size:10px;letter-spacing:1px;text-transform:uppercase;color:#fff">ENTRY</span>
</div>
```

### Live Status Pill
```html
<div style="background:rgba(0,0,0,0.6);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);border-radius:9999px;padding:8px 16px;display:inline-flex;align-items:center;gap:12px">
  <div style="width:8px;height:8px;border-radius:50%;background:#E2FF3B;flex-shrink:0"></div>
  <span style="font-family:'Manrope',sans-serif;font-weight:700;font-size:10px;letter-spacing:1px;text-transform:uppercase;color:#fff">LIVE TRACKING ACTIVE</span>
</div>
```

### Pro Status Pill (glowing)
```html
<div style="background:rgba(226,255,58,0.1);border:1px solid rgba(226,255,58,0.2);border-radius:9999px;padding:9px 17px;display:inline-flex;align-items:center;gap:8px;box-shadow:0 0 12px rgba(226,255,59,0.4)">
  <div style="width:8px;height:8px;border-radius:50%;background:#E2FF3B;flex-shrink:0"></div>
  <span style="font-family:'Manrope',sans-serif;font-weight:800;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#E2FF3B">PRO RIDER STATUS</span>
</div>
```

### Avatar with Lime Border
```html
<div style="width:48px;height:48px;border-radius:50%;border:2px solid #E2FF3B;overflow:hidden;padding:2px;box-sizing:border-box">
  <img src="..." style="width:100%;height:100%;border-radius:50%;object-fit:cover" />
</div>
```

### Stacked Avatars
```html
<div style="display:flex;align-items:center">
  <div style="width:32px;height:32px;border-radius:50%;border:2px solid #000;overflow:hidden;flex-shrink:0;margin-right:-8px;z-index:3">
    <img src="..." style="width:100%;height:100%;object-fit:cover" />
  </div>
  <div style="width:32px;height:32px;border-radius:50%;border:2px solid #000;overflow:hidden;flex-shrink:0;margin-right:-8px;z-index:2">
    <img src="..." style="width:100%;height:100%;object-fit:cover" />
  </div>
  <div style="width:32px;height:32px;border-radius:50%;border:2px solid #000;background:#262626;display:flex;align-items:center;justify-content:center;flex-shrink:0;z-index:1">
    <span style="font-family:'Manrope',sans-serif;font-weight:700;font-size:10px;color:#fff">+12</span>
  </div>
</div>
```

### Progress Bar
```html
<div style="background:rgba(255,255,255,0.05);height:4px;border-radius:9999px;overflow:hidden">
  <div style="background:#E2FF3B;height:100%;width:75%"></div>
</div>
```

### Stats Row (label + value pair)
```html
<div style="display:flex;flex-direction:column;gap:4px">
  <span style="font-family:'Manrope',sans-serif;font-weight:700;font-size:10px;letter-spacing:1px;text-transform:uppercase;color:#ababab">Label</span>
  <span style="font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:20px;line-height:28px;color:#E2FF3B">Value</span>
</div>
```

### Divider Row
```html
<div style="border-bottom:1px solid rgba(72,72,72,0.1);display:flex;align-items:center;justify-content:space-between;padding-bottom:9px;padding-top:8px">
  <!-- left content -->
  <!-- right content -->
</div>
```

### 2-Column Stats Grid
```html
<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
  <div style="background:#131313;border:1px solid rgba(255,255,255,0.05);border-radius:32px;padding:33px;display:flex;flex-direction:column;gap:8px">
    <span style="font-family:'Manrope',sans-serif;font-weight:700;font-size:10px;letter-spacing:1px;text-transform:uppercase;color:#ababab">WEEKLY DISTANCE</span>
    <div style="display:flex;align-items:baseline;gap:4px">
      <span style="font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:36px;line-height:40px;color:#fff">128</span>
      <span style="font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:14px;color:#E2FF3B">km</span>
    </div>
  </div>
</div>
```

### Lime Background Card (Global Activity style)
```html
<div style="background:#E2FF3B;border-radius:32px;padding:32px">
  <h4 style="font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:30px;line-height:30px;letter-spacing:-1.5px;text-transform:uppercase;color:#000;margin:0">TITLE</h4>
  <span style="font-family:'Manrope',sans-serif;font-weight:700;font-size:12px;letter-spacing:0.6px;text-transform:uppercase;color:rgba(0,0,0,0.6)">Subtitle</span>
</div>
```

### Alert / Notification Card (Lime tint)
```html
<div style="background:rgba(226,255,58,0.1);border:1px solid rgba(226,255,58,0.3);border-radius:32px;padding:33px">
  <!-- content -->
</div>
```

---

## 7. Shadow Tokens

| Use | Value |
|---|---|
| Bottom nav glow (upward) | `0px -8px 40px 0px rgba(226,255,59,0.08)` |
| Nav circle glow | `0px 0px 20px 0px rgba(226,255,59,0.3)` |
| Pro status glow | `0 0 12px rgba(226,255,59,0.4)` |
| Lime dot glow | `0 0 15px #E2FF3B` |

---

## 8. Image Treatment

| Pattern | Style |
|---|---|
| Map background | `opacity:0.4; filter:saturate(0)` |
| Cyclist / hero photo | `opacity:0.6; filter:saturate(0)` |
| Ride card photo | `opacity:0.6` (no desaturation) |
| Product photo | Full color, no filter |
| All photo cards | `linear-gradient(to top, #000 0%, rgba(0,0,0,0.2) 50%, transparent 100%)` gradient overlay |

---

## 9. Interactive States

**DNA / Selection Grid card:**
```css
/* Active */
.active { background: #E2FF3B; }
.active .label { color: #536000; }

/* Inactive */
.inactive { background: #1f1f1f; border: 1px solid rgba(72,72,72,0.1); }
.inactive .label { color: #fff; }

/* Transition */
transition: all 0.15s ease;
```

**Toggle buttons (7D / 30D):**
```html
<!-- Active -->
<div style="background:rgba(226,255,58,0.2);border-radius:9999px;padding:4px 12px">
  <span style="font-family:'Manrope',sans-serif;font-weight:700;font-size:8px;text-transform:uppercase;color:#E2FF3B">7D</span>
</div>
<!-- Inactive -->
<div style="background:#1f1f1f;border-radius:9999px;padding:4px 12px">
  <span style="font-family:'Manrope',sans-serif;font-weight:700;font-size:8px;text-transform:uppercase;color:#ababab">30D</span>
</div>
```

---

## 10. Bottom Navigation Bar

Always fixed at bottom. Always present on every page. 5 icons.

```html
<nav style="position:fixed;bottom:0;left:0;right:0;display:flex;align-items:center;justify-content:space-between;background:rgba(14,14,14,0.9);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-top:1px solid rgba(72,72,72,0.1);border-radius:32px 32px 0 0;box-shadow:0px -8px 40px 0px rgba(226,255,59,0.08);padding:16px 32px 32px;z-index:100;box-sizing:border-box">
  <!-- Active tab — lime pill -->
  <div style="background:rgba(226,255,59,0.1);border-radius:9999px;padding:8px 20px;display:flex;align-items:center;justify-content:center;cursor:pointer">
    <img src="[ICON_URL]" style="width:20px;height:20px;object-fit:contain" />
  </div>
  <!-- Inactive tabs -->
  <div style="display:flex;align-items:center;justify-content:center;cursor:pointer;padding:8px">
    <img src="[ICON_URL]" style="width:19px;height:19px;object-fit:contain" />
  </div>
  <!-- repeat for remaining tabs -->
</nav>
```

**Icon asset URLs (valid for ~7 days from last refresh):**
| Tab | Icon URL |
|---|---|
| Explore (compass) | `https://www.figma.com/api/mcp/asset/195508b3-facb-4aa9-96b4-7433d7f8ef32` |
| Modules (grid) | `https://www.figma.com/api/mcp/asset/7ccfef2c-2823-45a2-a0aa-740e127471a5` |
| Ride (car) | `https://www.figma.com/api/mcp/asset/999275d0-fbb6-4e90-8477-cd96819efefa` |
| Shop (bag) | `https://www.figma.com/api/mcp/asset/22a7d281-b15d-482e-b98a-7eaf52476e7e` |
| Profile (person) | `https://www.figma.com/api/mcp/asset/c3cb466a-9606-4970-9f67-a7bb58fb72c8` |

> **Note:** Figma asset URLs expire after 7 days. Re-fetch from Figma node `1:863` if icons stop loading.

---

## 11. Typography Tailwind Config

Always include this Tailwind config block on every page:

```html
<script src="https://cdn.tailwindcss.com"></script>
<script>
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          primary: '#E2FF3B',
          'on-primary': '#536000',
          'surface-container-low': '#131313',
          'surface-container': '#191919',
          'surface-container-high': '#1f1f1f',
          'surface-container-highest': '#262626',
          'on-surface-variant': '#ababab',
          'outline-variant': '#484848',
        },
        fontFamily: {
          headline: ['"Space Grotesk"', 'sans-serif'],
          body: ['"Manrope"', 'sans-serif'],
        },
      }
    }
  }
</script>
```

---

## 12. Do's and Don'ts

**DO:**
- Use `#E2FF3B` as the only accent color — no blues, reds, purples
- Use `Space Grotesk Bold` for all display numbers and headings
- Use `Manrope` for all body text, labels, and buttons
- Apply `text-transform: uppercase` to all headings, labels, and buttons
- Use `border-radius: 32px` for all main cards
- Use `border-radius: 9999px` for all pills and buttons
- Apply `backdrop-filter: blur(20px)` on glass overlays and the bottom nav
- Use negative letter-spacing (`-1.5px` to `-3px`) on large Space Grotesk headings
- Keep page sections separated by `80px` bottom margin

**DON'T:**
- Don't use any color not listed in Section 2
- Don't use any font other than Space Grotesk or Manrope
- Don't use `border-radius` values other than those in Section 5
- Don't use `box-shadow` colors other than lime-tinted or white/black neutrals
- Don't use `text-align: center` on body copy — only on numeric/level UI elements
- Don't use `margin: auto` for text centering
- Don't add extra pages, modals, or components not in the Figma design
