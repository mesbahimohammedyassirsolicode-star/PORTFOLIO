import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { i18n, projects } from "./portfolioData.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const PUBLIC = path.join(ROOT, "public");

describe("project assets", () => {
  it.each(projects.map((p) => [p.id, p.img]))(
    "%s resolves to a file under public/",
    (_id, img) => {
      const rel = img.replace(/^assets\/projects\//, "");
      expect(fs.existsSync(path.join(PUBLIC, rel))).toBe(true);
    }
  );
});

describe("i18n", () => {
  const SOURCES = ["App.jsx", ...fs.readdirSync(path.join(ROOT, "src/components")).filter((f) => f.endsWith(".jsx")).map((f) => `components/${f}`)];

  it("defines every key a component references, in both languages", () => {
    const used = new Set();
    for (const rel of SOURCES) {
      const src = fs.readFileSync(path.join(ROOT, "src", rel), "utf8");
      for (const m of src.matchAll(/\bt\('([a-z0-9_]+)'\)/g)) used.add(m[1]);
    }
    const missingEn = [...used].filter((k) => !(k in i18n.en));
    const missingFr = [...used].filter((k) => !(k in i18n.fr));
    expect({ missingEn, missingFr }).toEqual({ missingEn: [], missingFr: [] });
  });

  it("keeps en and fr key sets identical", () => {
    expect(Object.keys(i18n.en).sort()).toEqual(Object.keys(i18n.fr).sort());
  });
});