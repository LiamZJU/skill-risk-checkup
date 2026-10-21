# skill-risk-checkup

只读检查已安装的 Agent Skill 有没有风险：越权指令、隐瞒用户、机密泄露、下载后直接执行、破坏性 git 默认步骤、擅自改配置，以及敏感能力被说得太宽。

它不修改被检查的 Skill。需要 Node.js 和 Python 3。扫描只用 Python 标准库。

## 安装 Skill

### 在对话里让 Agent 安装

打开 Cursor、Claude Code、Codex 或其他 Agent 的对话页面，把下面这段话发给它。Agent 会自己跑安装命令，不用先开终端。

```text
请安装这个 Skill，装到我的用户目录，让之后的项目都能用：
https://github.com/LiamZJU/skill-risk-checkup

请执行：
npx skills add LiamZJU/skill-risk-checkup -g -y

只装给某一个 Agent 时，改用对应的一条：
npx skills add LiamZJU/skill-risk-checkup -g -a cursor -y
npx skills add LiamZJU/skill-risk-checkup -g -a claude-code -y
npx skills add LiamZJU/skill-risk-checkup -g -a codex -y

装完告诉我 Skill 落在哪个目录。不要修改其他 Skill。
```

也可以用自己的话，只要带上仓库地址，例如：「帮我安装 https://github.com/LiamZJU/skill-risk-checkup 这个 skill」。Agent 读到本页后，按上面的命令安装。

装好后新开一轮对话，说「给所有 Skill 做风险体检」，或输入 `/skill-risk-checkup`。

### 自己在终端安装

```bash
npx skills add LiamZJU/skill-risk-checkup -g -y
```

只装给一个 Agent：

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
