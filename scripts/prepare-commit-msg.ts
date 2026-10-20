import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";

const messageFile = process.argv[2];
if (!messageFile) throw new Error("Commit message file is required");

const message = execFileSync("bun", ["x", "--no-install", "devmoji"], {
  encoding: "utf8",
  input: readFileSync(messageFile, "utf8"),
});
writeFileSync(messageFile, message);
