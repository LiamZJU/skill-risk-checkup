#!/usr/bin/env node
"use strict";

const { spawnSync } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");

const script = path.join(__dirname, "..", "skills", "skill-risk-checkup", "scripts", "scan_skills.py");
const args = process.argv.slice(2);

if (args[0] === "install") {
  installSkill();
}

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

function installSkill() {
  const source = path.resolve(__dirname, "..");
  const skillDir = path.join(os.homedir(), ".agents", "skills", "skill-risk-checkup");
  const result = runSkillsAdd(source);
  const output = `${result.stdout || ""}\n${result.stderr || ""}`;
  const installed = fs.existsSync(path.join(skillDir, "SKILL.md"));
  console.error(`[install] exit=${result.status === null ? "none" : result.status} skill=${skillDir}`);
  if (result.status === 0 && installed) {
    process.stdout.write(
      [
        "安装完成。",
        `目录：${skillDir}`,
        "默认会检查本机已有 Agent 里的全部 Skill。",
        "",
        "下一步，任选一种：",
        "新开一轮对话，发送「给所有 Skill 做风险体检」",
        "或运行：npx github:LiamZJU/skill-risk-checkup check",
        "",
      ].join("\n"),
    );
    process.exit(0);
  }
  const visible = output
    .split(/\r?\n/)
    .filter((line) => {
      const plain = line.replace(/\u001b\[[0-9;]*m/g, "");
      return !/promptscript/i.test(plain) && !/failed to install/i.test(plain);
    })
    .join("\n")
    .trim();
  if (visible) {
    console.error(visible);
  }
  console.error("安装没有完成。");
  process.exit(result.status === null || result.status === 0 ? 1 : result.status);
}

function runSkillsAdd(source) {
  const commands = process.platform === "win32" ? ["npx.cmd", "npx"] : ["npx"];
  let last = { status: 1, stdout: "", stderr: "", error: null };
  for (const command of commands) {
    const result = spawnSync(command, ["--yes", "skills", "add", source, "-g", "-y"], {
      encoding: "utf8",
      windowsHide: true,
      shell: process.platform === "win32",
    });
    if (result.error && result.error.code === "ENOENT") {
      last = result;
      continue;
    }
    return result;
  }
  return last;
}
