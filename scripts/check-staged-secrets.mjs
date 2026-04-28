import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const SECRET_PATTERNS = [
  { label: "Private key block", regex: /-----BEGIN [A-Z ]*PRIVATE KEY-----/g },
  { label: "AWS access key", regex: /\bAKIA[0-9A-Z]{16}\b/g },
  { label: "GitHub token", regex: /\bghp_[A-Za-z0-9]{36}\b/g },
  { label: "Slack token", regex: /\bxox[baprs]-[A-Za-z0-9-]{10,}\b/g },
  { label: "OpenAI key", regex: /\bsk-[A-Za-z0-9]{20,}\b/g },
  { label: "Generic bearer token", regex: /\bBearer\s+[A-Za-z0-9\-._~+/]+=*\b/g },
];

const SKIP_EXTENSIONS = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".svg",
  ".ico",
  ".pdf",
  ".zip",
  ".gz",
  ".woff",
  ".woff2",
  ".ttf",
]);

const isProbablyTextFile = (filePath) => {
  const extension = filePath.slice(filePath.lastIndexOf(".")).toLowerCase();
  return !SKIP_EXTENSIONS.has(extension);
};

const getStagedFiles = () => {
  const output = execSync("git diff --cached --name-only --diff-filter=ACMR", {
    encoding: "utf8",
  }).trim();

  return output ? output.split(/\r?\n/).filter(Boolean) : [];
};

const findings = [];

for (const stagedFile of getStagedFiles()) {
  if (!isProbablyTextFile(stagedFile)) {
    continue;
  }

  const absolutePath = resolve(process.cwd(), stagedFile);
  if (!existsSync(absolutePath)) {
    continue;
  }

  const content = readFileSync(absolutePath, "utf8");
  for (const pattern of SECRET_PATTERNS) {
    if (pattern.regex.test(content)) {
      findings.push({ file: stagedFile, type: pattern.label });
    }
    pattern.regex.lastIndex = 0;
  }
}

if (findings.length > 0) {
  console.error("Potential secret(s) detected in staged files:");
  for (const finding of findings) {
    console.error(`- ${finding.file}: ${finding.type}`);
  }
  console.error("Commit blocked. Remove secrets or move them to local env files.");
  process.exit(1);
}

console.log("Secret scan passed for staged files.");
