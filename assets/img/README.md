# Photos — drop-in guide

The site references real photo file names but ships with a technical **line-drawing
placeholder** (`placeholder.svg`) that shows automatically until a photo exists.
Each `<img>` uses an `onerror` fallback, so the moment you add a correctly-named
photo, it appears — **no code changes needed**.

## Home hero build-sequence (4 stages, in order)

The hero plays a video-like "build sequence" that assembles the building in four
stages. Each layer uses a real photo when present and falls back to a technical
**stage SVG** (`stage-1-prep.svg` … `stage-4-finished.svg`) until then. Drop these
in for the real thing (WebP/AVIF recommended; keep the 4 combined under ~800 KB):

| Order | File name                            | Stage        |
|-------|--------------------------------------|--------------|
| 1     | `site-photo-03-civil-works.png`      | Site prep    |
| 2     | `site-photo-01-crew.png`             | Install      |
| 3     | `product-photo-02-single-unit.png`   | Unit placed  |
| 4     | `site-photo-04-two-storey-building.png` | Finished  |

> Only stage 1 is eagerly loaded; stages 2–4 lazy-load. Serve `srcset` sizes once
> real high-res photos replace the low-res PDF extractions (which top out ~827×606
> and look soft above ~900px wide).

## Add these files (JPG or WebP, same base name)

| File name              | Used on              | Suggested shot                                        |
|------------------------|----------------------|-------------------------------------------------------|
| `install-hero.jpg`     | Home hero (static tag) | Strong wide shot of a completed installation on site |
| `install-01.jpg`       | Home + Projects      | Office units on a prepared base                       |
| `install-02.jpg`       | Home + Projects      | Unit being craned into position                       |
| `install-03.jpg`       | Home + Projects      | Underside / steel frame of a unit in transit          |
| `install-04.jpg`       | Projects             | Completed accommodation block, pitched roof           |
| `install-05.jpg`       | Projects             | Linked block with covered walkway / parking           |
| `install-06.jpg`       | Projects             | Installation team on a finished site                  |
| `install-07.jpg`       | Projects             | Covered carport / structures on a camp                |
| `install-08.jpg`       | Projects             | Long accommodation camp, linked units                 |
| `sector-office.jpg`    | Sectors → Office     | A completed modular office                            |
| `sector-camp.jpg`      | Sectors → Camps      | An accommodation camp                                 |
| `sector-classroom.jpg` | Sectors → Education  | A classroom unit (interior or exterior)              |

## Specs
- **Format:** JPG or WebP (if WebP, also update the `src`/`onerror` extensions, or keep `.jpg`).
- **Size:** long edge ~1600–2000 px. Compress to keep each file under ~300 KB.
- **Aspect:** gallery tiles are 4:3 (wide tiles 8:3); the hero is cropped to fill.
- Use the client's **own high-resolution jobsite photos** — not stock or AI imagery.

## Certificates (for the About page trust section)
Add scans and swap the placeholder badges on `about.html`:
- NCC Certificate of Contractor Registration
- PACRA Certificate of Incorporation
- **Current, valid** ZRA Tax Clearance Certificate (do not publish an expired one)
