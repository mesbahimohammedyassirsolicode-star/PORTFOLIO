import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = path.join(ROOT, "public");
const ASSET = "/MYM-logo.png";

// Every branded surface must render the official logo artwork, never a
// re-created monogram or text lockup.
const brandedSurfaces = ["src/components/Navbar.jsx", "src/components/Footer.jsx"];

describe("official MYM logo", () => {
  it("the official logo asset resolves to a real file under public/", () => {
    const resolved = path.join(PUBLIC, ASSET);
    const exists = fs.existsSync(resolved) && fs.statSync(resolved).isFile();
    expect({ ASSET, resolved, exists: true }).toEqual({ ASSET, resolved, exists });
  });

  it.each(brandedSurfaces)("%s references the official logo asset", (rel) => {
    const abs = path.join(ROOT, rel);
    expect(fs.existsSync(abs), `missing component ${rel}`).toBe(true);
    const src = fs.readFileSync(abs, "utf8");
    expect(src, `${rel} must use the official asset ${ASSET}, not a re-created replacement`).toContain(ASSET);
  });

  it.each(brandedSurfaces)("%s no longer imports the re-created monogram", (rel) => {
    const src = fs.readFileSync(path.join(ROOT, rel), "utf8");
    expect(src).not.toContain("MymLogo");
  });
});