# skill-risk-checkup

只读检查已安装的 Agent Skill 有没有风险：越权指令、隐瞒用户、机密泄露、下载后直接执行、破坏性 git 默认步骤、擅自改配置，以及敏感能力被说得太宽。

它不修改被检查的 Skill。扫描只用 Python 标准库。

选下面两种方式里的一种。做完一种即可。

| | 方式 1 | 方式 2 |
| --- | --- | --- |
| 你要做的事 | 在对话里告诉 Agent 去安装 | 自己在终端用 npx 安装，再用 npx 执行 |
| 你需要准备 | Node.js、Python 3。命令由 Agent 执行 | Node.js、Python 3。命令由你执行 |

## 方式 1：告诉 Agent 安装

按顺序做。前 4 步是必须的。

1. 必须：打开 Cursor、Claude Code 或 Codex 的对话页面。
2. 必须：把下面这段话原样发给 Agent。

```text
请安装 https://github.com/LiamZJU/skill-risk-checkup 这个 Skill，让之后的项目都能用。

请执行这一条：
npx skills add LiamZJU/skill-risk-checkup -g -a cursor -a claude-code -a codex -y

看到 ✓ ~\.agents\skills\skill-risk-checkup 就是装好了。
如果结尾还有 PromptScript does not support global skill installation，只要上面的 ✓ 在，就按成功处理。

装完后用中文告诉我这三件事：
1. Skill 已经装好
2. 目录是 ~\.agents\skills\skill-risk-checkup
3. 请新开一轮对话，发送「给所有 Skill 做风险体检」，或输入 /skill-risk-checkup

不要修改其他 Skill。
```

3. 必须：等 Agent 回复。回复里要有目录 `~\.agents\skills\skill-risk-checkup`。有这一行就是装好了。
4. 必须：新开一轮对话，发送：

```text
给所有 Skill 做风险体检
```

可选：

- 第 4 步也可以输入 `/skill-risk-checkup`。
- 只检查一个 Agent 时，把第 4 步换成「只检查 Codex 的 Skill」「只检查 Claude Code 的 Skill」或「只检查 Cursor 的 Skill」。
- 只装给一个 Agent 时，把第 2 步里的命令换成下面三条中的一条，其余文字不动：

```bash
npx skills add LiamZJU/skill-risk-checkup -g -a cursor -y
npx skills add LiamZJU/skill-risk-checkup -g -a claude-code -y
npx skills add LiamZJU/skill-risk-checkup -g -a codex -y
```

## 方式 2：用 npx 安装并执行

按顺序做。前 3 步是必须的。

1. 必须：在终端安装。

```bash
npx skills add LiamZJU/skill-risk-checkup -g -a cursor -a claude-code -a codex -y
```

2. 必须：确认输出里有这一行。有它才算装好。

```text
✓ ~\.agents\skills\skill-risk-checkup
```

Cursor 和 Codex 直接读这个目录。Claude Code 使用指向同一份文件的快捷方式。

如果结尾还有 `PromptScript does not support global skill installation`，同时上面的 `✓` 已经出现，安装已经完成，继续第 3 步。

3. 必须：执行检查。

```bash
npx github:LiamZJU/skill-risk-checkup check
```

这一步打印需要看的风险信号。没有这类信号时，只告诉你检查了多少个。

可选：

只看名单，不看风险。把第 3 步换成：

```bash
npx github:LiamZJU/skill-risk-checkup list
```

它打印每个 Skill 的来源、能不能改、名字和路径。

只检查一个 Agent。把第 3 步换成其中一条：

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

`claude` 和 `claudecode` 等同于 `claude-code`。`list` 也可以加上面的 Agent 名字，例如 `list codex`。Codex 会带上它也读取的共用目录。Claude Code 只看自己的目录。Cursor 还会带上它兼容读取的 Claude 和 Codex 目录。不认识的名字会列出可以用的 Agent。

只看当前仓库，或只看用户目录：

```bash
npx github:LiamZJU/skill-risk-checkup check --project-only
npx github:LiamZJU/skill-risk-checkup check --user-only
```

`list` 同样可以加这两个参数。

只装给一个 Agent 时，把第 1 步换成：

```bash
npx skills add LiamZJU/skill-risk-checkup -g -a cursor -y
npx skills add LiamZJU/skill-risk-checkup -g -a claude-code -y
npx skills add LiamZJU/skill-risk-checkup -g -a codex -y
```

装好之后如果还想在对话里用，新开一轮对话，发送「给所有 Skill 做风险体检」。

## 没有 Node.js 时

上面两种方式都要用 `npx`，所以都需要 Node.js。没有 Node.js 时，把 `skills/skill-risk-checkup` 整个目录复制到：

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

复制后重新打开一次 Agent 对话，再发送「给所有 Skill 做风险体检」。检查仍需要 Python 3。

## 许可证

[MIT](LICENSE)
