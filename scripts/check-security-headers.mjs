import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const REQUIRED_HEADER_KEYS = [
  "Content-Security-Policy",
  "X-Content-Type-Options",
  "X-Frame-Options",
  "Referrer-Policy",
  "Strict-Transport-Security",
  "Cross-Origin-Resource-Policy",
  "Cross-Origin-Opener-Policy",
  "Permissions-Policy",
];

const REQUIRED_CSP_DIRECTIVES = [
  "default-src 'self'",
  "script-src 'self'",
  "object-src 'none'",
  "frame-src 'none'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
];

const configPath = resolve(process.cwd(), "vercel.json");

if (!existsSync(configPath)) {
  console.error("Security check failed: vercel.json not found.");
  process.exit(1);
}

let config;
try {
  config = JSON.parse(readFileSync(configPath, "utf8"));
} catch {
  console.error("Security check failed: vercel.json contains invalid JSON.");
  process.exit(1);
}

const allHeaders = (config.headers ?? [])
  .flatMap((rule) => rule.headers ?? [])
  .filter((header) => typeof header?.key === "string" && typeof header?.value === "string");

const headerMap = new Map(allHeaders.map((header) => [header.key, header.value]));

const missingKeys = REQUIRED_HEADER_KEYS.filter((key) => !headerMap.has(key));
if (missingKeys.length > 0) {
  console.error(`Security check failed: missing headers: ${missingKeys.join(", ")}`);
  process.exit(1);
}

const cspValue = headerMap.get("Content-Security-Policy") ?? "";
const missingDirectives = REQUIRED_CSP_DIRECTIVES.filter((directive) => !cspValue.includes(directive));
if (missingDirectives.length > 0) {
  console.error(
    `Security check failed: CSP missing directives: ${missingDirectives.join(", ")}`
  );
  process.exit(1);
}

console.log("Security header check passed.");
