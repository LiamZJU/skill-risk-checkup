#!/usr/bin/env node
"use strict";

const { spawnSync } = require("child_process");
const path = require("path");

const script = path.join(__dirname, "..", "skills", "skill-risk-checkup", "scripts", "scan_skills.py");
const args = process.argv.slice(2);
const candidates =
  process.platform === "win32"
    ? [
        ["py", ["-3"]],
        ["python", []],
        ["python3", []],
      ]
    : [
        ["python3", []],
        ["python", []],
      ];

for (const [command, prefix] of candidates) {
  const result = spawnSync(command, [...prefix, script, ...args], { stdio: "inherit" });
  if (result.error && result.error.code === "ENOENT") {
    continue;
  }
  process.exit(result.status === null ? 1 : result.status);
}

console.error("需要 Python 3。请先安装 Python，并确认 python 或 py -3 可以运行。");
process.exit(1);
