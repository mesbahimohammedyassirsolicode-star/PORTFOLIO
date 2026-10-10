import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const CSS = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "styles.css");
const css = fs.readFileSync(CSS, "utf8");

const tokensIn = (re) =>
  new Set([...css.matchAll(re)].flatMap((m) => [...m[1].matchAll(/(--[a-z0-9-]+)\s*:/g)].map((x) => x[1])));

const root = tokensIn(/(?:^|\n):root\s*\{([^}]*)\}/g);
const dark = tokensIn(/\.dark\s*\{([^}]*)\}/g);
const used = new Set([...css.matchAll(/var\((--[a-z0-9-]+)/g)].map((m) => m[1]));

describe("css tokens", () => {
  it("defines every referenced var() in :root", () => {
    expect([...used].filter((v) => !root.has(v))).toEqual([]);
  });

  it("defines every .dark override in :root as well", () => {
    expect([...dark].filter((v) => !root.has(v))).toEqual([]);
  });
});