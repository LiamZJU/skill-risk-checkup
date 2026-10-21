# skill-risk-checkup

只读检查已安装的 Agent Skill 有没有风险：越权指令、隐瞒用户、机密泄露、下载后直接执行、破坏性 git 默认步骤、擅自改配置，以及敏感能力被说得太宽。

它不修改被检查的 Skill。

## 安装

需要 Node.js（用来运行 `npx`）和 Python 3。扫描脚本只用 Python 标准库。

装到当前用户、所有项目都能用：

```bash
npx skills add LiamZJU/skill-risk-checkup -g -y
```

只装给某一个 Agent：

```bash
npx skills add LiamZJU/skill-risk-checkup -g -a cursor -y
npx skills add LiamZJU/skill-risk-checkup -g -a claude-code -y
npx skills add LiamZJU/skill-risk-checkup -g -a codex -y
```

先看仓库里有哪些 Skill，再决定装哪个：

```bash
npx skills add LiamZJU/skill-risk-checkup --list
```

装进当前项目、而不是用户目录时，去掉 `-g`。

常用 `--agent` 值：`cursor`、`claude-code`、`codex`、`github-copilot`、`opencode`、`gemini-cli`、`grok`、`windsurf`。不写 `-a` 时，安装器会按本机已有的 Agent 询问。

### 不用 Node 时

把 `skills/skill-risk-checkup` 整个目录复制到对应位置：

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

## 使用

在对话里说：

- 给所有 Skill 做风险体检
- `/skill-risk-checkup`
- 只检查某一个 Skill，并给出它的路径

没指定范围时，检查本机各 Agent 的用户级 Skill，以及当前 git 仓库里的项目 Skill。不遍历整个用户主目录。

## 要求

- Python 3。命令行里先试 `python`，没有再用 `py -3`。
- 不需要安装第三方 Python 包。

可以先确认扫描脚本本身没坏：

```bash
python skills/skill-risk-checkup/scripts/scan_skills.py --self-test
```

## 许可证

[MIT](LICENSE)
