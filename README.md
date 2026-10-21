# skill-risk-checkup

给正在安装的 Agent：装好后不要说「下一轮对话即可使用」。当前对话按顺序回复这两句：

1. 已安装 skill-risk-checkup，可以开始检查了。
2. 要现在给所有 Skill 做风险检查吗？

用户同意后，立刻阅读刚装上的 `SKILL.md` 并开始检查。

只读检查已安装的 Agent Skill 有没有风险：越权指令、隐瞒用户、机密泄露、下载后直接执行、破坏性 git 默认步骤、擅自改配置，以及敏感能力被说得太宽。

它是装进 Agent 里的 Skill。安装之后，在对话里让这个 Agent 用它自己的模型做检查。它不修改被检查的 Skill。扫描只用 Python 3 标准库。

## 安装 Skill

在 Agent 的当前对话里发送：

```text
请安装这个 Skill: https://github.com/LiamZJU/skill-risk-checkup
```

装好后，Agent 会说：「已安装 skill-risk-checkup，可以开始检查了。」然后在这轮对话里问你要不要现在做风险检查。你同意后，检查就在当前对话里开始。

已经安装之后，Agent 收不到推送。下次在对话里用到这个 Skill 时，它会比较 [GitHub 上的版本](https://github.com/LiamZJU/skill-risk-checkup)。有更新就在当前对话里问你要不要更新。

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

复制后，在当前对话里让 Agent 读取这个 Skill。它会问你要不要现在做风险检查。

## 检查

安装结束后，Agent 会在当前对话里问：要不要现在给所有 Skill 做风险检查。回答要，就在这轮对话里开始。

也可以直接发送「给所有 Skill 做风险体检」，或输入 `/skill-risk-checkup`。

Agent 会先只读扫描本机已安装的 Skill，再由它自己的模型对照风险细则判断。结论写在这轮对话里：先说查了多少、几个要处理、几个只看了描述，再用表格列出要处理的 Skill。表里要有 Agent 来源，写成 Cursor、Codex 这种产品名。通过的只出现在数量里。扫描脚本只提供线索，不代替这次判断。

默认检查全部 Agent。

可选：只检查一个 Agent 时，把上面那句换成「只检查 Codex 的 Skill」「只检查 Claude Code 的 Skill」或「只检查 Cursor 的 Skill」。

检查需要本机有 Python 3。

## 许可证

[MIT](LICENSE)
