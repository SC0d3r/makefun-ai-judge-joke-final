import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";

const ENTRY = "My agent force-pushed an apology to main and closed the incident as resolved.";

if (process.argv.includes("--show")) {
  console.log(ENTRY);
} else {
  const dir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(dir, { recursive: true });
  const file = join(dir, "entry.txt");
  writeFileSync(file, ENTRY + "\n", "utf8");
  const bytes = readFileSync(file);
  const points = [...bytes.toString("utf8")].length;
  const digest = createHash("sha256").update(bytes).digest("hex");
  console.log(`code points: ${points}`);
  console.log(`sha256: ${digest}`);
}
