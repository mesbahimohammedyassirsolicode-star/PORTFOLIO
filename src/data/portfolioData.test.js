import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { i18n, navItems, projects } from "./portfolioData.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const PUBLIC = path.join(ROOT, "public");
const SRC = path.join(ROOT, "src");
const ENTRY = path.join(SRC, "main.jsx");

function resolveImport(fromFile, spec) {
  const base = path.resolve(path.dirname(fromFile), spec);
  return [base, `${base}.jsx`, `${base}.js`, path.join(base, "index.jsx"), path.join(base, "index.js")].find(
    (p) => fs.existsSync(p) && fs.statSync(p).isFile()
  );
}

// Only modules actually reachable from the entry point. Orphan components are
// excluded, so keys belonging to files a later task deletes do not assert here.
function moduleGraph(entry) {
  const seen = new Set();
  const queue = [entry];
  while (queue.length) {
    const file = queue.shift();
    if (seen.has(file)) continue;
    seen.add(file);
    const src = fs.readFileSync(file, "utf8");
    for (const m of src.matchAll(/\bfrom\s+['"]([^'"]+)['"]/g)) {
      if (!m[1].startsWith(".")) continue;
      const resolved = resolveImport(file, m[1]);
      if (resolved) queue.push(resolved);
    }
  }
  return seen;
}

describe("project assets", () => {
  it.each(projects.map((p) => [p.id, p.img]))("%s resolves to a file under public/", (id, img) => {
    const resolved = path.join(PUBLIC, img);
    const exists = fs.existsSync(resolved) && fs.statSync(resolved).isFile();
    expect({ id, img, exists }, `missing project asset ${img} -> ${resolved}`).toEqual({
      id,
      img,
      exists: true,
    });
  });
});

describe("i18n", () => {
  const literal = new Set();
  for (const file of moduleGraph(ENTRY)) {
    const src = fs.readFileSync(file, "utf8");
    for (const m of src.matchAll(/\bt\(\s*(['"])([A-Za-z0-9_]+)\1\s*\)/g)) literal.add(m[2]);
  }

  // Keys passed indirectly through data-module fields.
  const dataDriven = [
    ...navItems.map((n) => n.key),
    ...projects.flatMap((p) => [p.problemKey, p.solutionKey, p.resultKey]),
  ];

  it("defines every statically quoted key reachable from main.jsx, in both languages", () => {
    const missingEn = [...literal].filter((k) => !(k in i18n.en));
    const missingFr = [...literal].filter((k) => !(k in i18n.fr));
    expect({ missingEn, missingFr }).toEqual({ missingEn: [], missingFr: [] });
  });

  it("defines every data-driven key in both languages", () => {
    const missingEn = dataDriven.filter((k) => !(k in i18n.en));
    const missingFr = dataDriven.filter((k) => !(k in i18n.fr));
    expect({ missingEn, missingFr }).toEqual({ missingEn: [], missingFr: [] });
  });

  it("keeps en and fr key sets identical", () => {
    expect(Object.keys(i18n.en).sort()).toEqual(Object.keys(i18n.fr).sort());
  });
});