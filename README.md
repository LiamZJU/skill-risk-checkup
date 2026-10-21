# skill-risk-checkup

只读检查已安装的 Agent Skill 有没有风险：越权指令、隐瞒用户、机密泄露、下载后直接执行、破坏性 git 默认步骤、擅自改配置，以及敏感能力被说得太宽。

它不修改被检查的 Skill。需要 Node.js 和 Python 3。扫描只用 Python 标准库。

## 安装 Skill

装进用户目录后，在对话里说「给所有 Skill 做风险体检」或 `/skill-risk-checkup`：

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

打印每个 Skill 的来源、能不能改、名字和路径。

## Check 所有 Skill

```bash
npx github:LiamZJU/skill-risk-checkup check
```

打印需要看的风险信号。没有这类信号时，只告诉你检查了多少个。

只看当前仓库：

```bash
npx github:LiamZJU/skill-risk-checkup list --project-only
npx github:LiamZJU/skill-risk-checkup check --project-only
```

只看用户目录里的 Skill：把 `--project-only` 换成 `--user-only`。

## 许可证

[MIT](LICENSE)
