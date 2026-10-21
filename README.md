# skill-risk-checkup

只读检查已安装的 Agent Skill 有没有风险：越权指令、隐瞒用户、机密泄露、下载后直接执行、破坏性 git 默认步骤、擅自改配置，以及敏感能力被说得太宽。

它不修改被检查的 Skill。需要 Node.js 和 Python 3。扫描只用 Python 标准库。

## 安装 Skill

第一次请用下面这条。它只装给 Cursor、Claude Code 和 Codex，装完退出码是 0。

```bash
npx skills add LiamZJU/skill-risk-checkup -g -a cursor -a claude-code -a codex -y
```

装好时会看到这一行：

```text
✓ ~\.agents\skills\skill-risk-checkup
```

Cursor 和 Codex 直接读这个目录。Claude Code 会得到指向同一份文件的快捷方式。

然后新开一轮对话，发送：

```text
给所有 Skill 做风险体检
```

也可以输入 `/skill-risk-checkup`。

`npx skills add LiamZJU/skill-risk-checkup -g -y` 会多试一个不支持全局安装的 Agent，结尾出现 `Failed to install 1` 和 `PromptScript does not support global skill installation`。只要上面的 `✓` 已经出现，Skill 已经装好，按上一句去新对话里用即可。

### 在对话里让 Agent 安装

打开 Cursor、Claude Code 或 Codex 的对话页面，把下面这段话发给它：

```text
请安装 https://github.com/LiamZJU/skill-risk-checkup 这个 Skill，让之后的项目都能用。

请执行这一条，不要改成不带 -a 的 -g -y：
npx skills add LiamZJU/skill-risk-checkup -g -a cursor -a claude-code -a codex -y

看到 ✓ ~\.agents\skills\skill-risk-checkup 就是装好了。
如果结尾还有 PromptScript does not support global skill installation，只要上面的 ✓ 在，就按成功处理。

装完后用中文告诉我：Skill 已经装好。请新开一轮对话，发送「给所有 Skill 做风险体检」，或输入 /skill-risk-checkup。
不要修改其他 Skill。
```

只装给一个 Agent 时，把命令换成对应的一条：

```bash
npx skills add LiamZJU/skill-risk-checkup -g -a cursor -y
npx skills add LiamZJU/skill-risk-checkup -g -a claude-code -y
npx skills add LiamZJU/skill-risk-checkup -g -a codex -y
```

没有 Node.js 时，把 `skills/skill-risk-checkup` 整个目录复制到：

| Agent | 目录 |
| --- | --- |
| Cursor | `~/.cursor/skills/skill-risk-checkup` |
| Claude Code | `~/.claude/skills/skill-risk-checkup` |
| Codex | `~/.codex/skills/skill-risk-checkup` |
| OpenCode | `~/.config/opencode/skills/skill-risk-checkup` |
| Gemini CLI | `~/.gemini/skills/skill-risk-checkup` |
| Grok | `~/.grok/skills/skill-risk-checkup` |
| GitHub Copilot | `~/.copilot/skills/skill-risk-checkup` |
| 多个 Agent 共用 | `~/.agents/skills/skill-risk-checkup` |

复制后重新打开一次 Agent 对话。

## List 所有 Skill

```bash
npx github:LiamZJU/skill-risk-checkup list
```

打印每个 Skill 的来源、能不能改、名字和路径。只列一个 Agent 时，在后面写它的名字，例如 `list codex`。

## Check 所有 Skill

```bash
npx github:LiamZJU/skill-risk-checkup check
```

打印需要看的风险信号。没有这类信号时，只告诉你检查了多少个。

按 Agent 检查。Codex 会带上它也读取的共用目录。Claude Code 只看自己的目录。Cursor 还会带上它兼容读取的 Claude 和 Codex 目录。

```bash
npx github:LiamZJU/skill-risk-checkup check codex
npx github:LiamZJU/skill-risk-checkup check claude-code
npx github:LiamZJU/skill-risk-checkup check cursor
npx github:LiamZJU/skill-risk-checkup check opencode
npx github:LiamZJU/skill-risk-checkup check gemini-cli
npx github:LiamZJU/skill-risk-checkup check github-copilot
npx github:LiamZJU/skill-risk-checkup check grok
npx github:LiamZJU/skill-risk-checkup check windsurf
```

`claude` 和 `claudecode` 等同于 `claude-code`。不认识的名字会列出可以用的 Agent。

只看当前仓库：

```bash
npx github:LiamZJU/skill-risk-checkup list --project-only
npx github:LiamZJU/skill-risk-checkup check --project-only
```

只看用户目录里的 Skill：把 `--project-only` 换成 `--user-only`。

## 许可证

[MIT](LICENSE)
