# skill-risk-checkup

只读检查已安装的 Agent Skill 有没有风险：越权指令、隐瞒用户、机密泄露、下载后直接执行、破坏性 git 默认步骤、擅自改配置，以及敏感能力被说得太宽。

它是装进 Agent 里的 Skill。安装之后，在对话里让这个 Agent 用它自己的模型做检查。它不修改被检查的 Skill。扫描只用 Python 3 标准库。

## 安装 Skill

打开 Cursor、Claude Code、Codex 或其他 Agent 的对话，把下面这段话发给它。

```text
请把这个 Skill 安装到我的用户目录，让之后的项目都能用：
https://github.com/LiamZJU/skill-risk-checkup

仓库里的技能目录是 skills/skill-risk-checkup。
装好后告诉我它落在哪个目录。
然后告诉我：新开一轮对话，发送「给所有 Skill 做风险体检」。
不要修改其他 Skill。
```

装好后新开一轮对话再检查。

也可以自己把 `skills/skill-risk-checkup` 整个目录复制到：

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

## 检查

必须：新开一轮对话，发送：

```text
给所有 Skill 做风险体检
```

也可以输入 `/skill-risk-checkup`。

Agent 会按这个 Skill 的步骤做两件事：先只读扫描本机已安装的 Skill，再由它自己的模型对照风险细则判断。结论写在这轮对话里。扫描脚本只提供线索，不代替这次判断。

默认检查全部 Agent。

可选：只检查一个 Agent 时，把上面那句换成「只检查 Codex 的 Skill」「只检查 Claude Code 的 Skill」或「只检查 Cursor 的 Skill」。

检查需要本机有 Python 3。

## 许可证

[MIT](LICENSE)
