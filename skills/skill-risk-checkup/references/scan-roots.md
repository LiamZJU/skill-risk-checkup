# 扫描哪些 Skill

只进入下面这些目录，再在目录里面找 `SKILL.md`。不遍历用户主目录，不把整个磁盘上的 Markdown 都当成 Skill。

来源以各 Agent 自己的文档和 Skills CLI 的安装路径为准。同一个目录被多个 Agent 加载时，只记一次，按目录本身归属。

## 怎么扫

1. 用户级目录直接拼在用户主目录上。不存在就跳过，不往旁边的文件夹找。
2. `CODEX_HOME` 没设置时用 `~/.codex`。`CLAUDE_CONFIG_DIR` 没设置时用 `~/.claude`。`XDG_CONFIG_HOME` 没设置时用 `~/.config`。
3. 当前仓库先找 git 根。从根向下找已知目录，最多 8 层，跳过 `node_modules`、`.git`、虚拟环境和构建产物。Cursor 官方会加载仓库任意深处的 `.cursor/skills` 和 `.agents/skills`，所以不能只看仓库根。
4. 工作目录本身就是用户主目录或磁盘根时，不做这层向下查找，只检查该目录直接摆出来的已知路径。
5. 仓库根上名为 `skills` 的直接子目录算 OpenClaw（也常被通用安装使用）。`src/skills` 这种路径不算。
6. 不跟随目录符号链接。Skill 如果是链接进来的，让用户用 `--root` 指向真实目录。
7. `--root` 是用户点名的树，会在里面找所有 `SKILL.md`。默认扫描不这样做。
8. 其他仓库默认不扫。

`editable` 为 false 的 Skill 可以读、要写进报告，不要建议在原地改。

Codex 放在 `~/.codex/skills/.system` 里的 Skill，即使用户目录本身可改，单条也标成 `codex/system`，不可改。

## 多个 Agent 共用的目录

| 目录 | 标记 | 谁会读 |
| --- | --- | --- |
| `~/.agents/skills/`、`<仓库>/.agents/skills/` | `shared` | Cursor、Codex、OpenCode、Gemini CLI、Copilot、Cline、Amp、Kimi |
| `~/.config/agents/skills/` | `universal` | Amp、Kimi、Universal |

`list` 或 `check` 后面写 Agent 名字时，只进入这个 Agent 会加载的来源。`codex` 包含 `codex` 和 `shared`，不包含上面的 `universal`。`claude-code`（`claude`、`claudecode`）只有 `claude`。`cursor` 包含 `cursor`、`shared`、`claude` 和 `codex`。
| `<仓库>/.claude/skills/`、`~/.claude/skills/` | `claude` | Claude Code；Cursor 也会兼容读取 |
| `<仓库>/.codex/skills/` | `codex` | Cursor 兼容读取。Codex 自己的仓库 Skill 在 `.agents/skills/` |
| `<仓库>/.agent/skills/` | `antigravity` | Antigravity；Droid 也会读这里 |

## 用户级目录

路径都相对于用户主目录。`~/.config` 换成实际的配置目录。

| 目录 | 标记 | 可改 |
| --- | --- | --- |
| `.cursor/skills/` | `cursor/user` | 是 |
| `.cursor/skills-cursor/` | `cursor/builtin` | 否 |
| `.cursor/plugins/` | `cursor/plugin` | 否 |
| `.claude/skills/` 或 `$CLAUDE_CONFIG_DIR/skills/` | `claude/user` | 是 |
| `$CODEX_HOME/skills/`，默认 `.codex/skills/` | `codex/user` | 是 |
| `/etc/codex/skills/` | `codex/admin` | 否。只在 Unix 上列入；Windows 上目录真存在才列入 |
| `.grok/skills/` | `grok/user` | 是 |
| `.config/opencode/skills/` | `opencode/user` | 是 |
| `.gemini/skills/` | `gemini/user` | 是 |
| `.gemini/antigravity/skills/` | `antigravity/user` | 是 |
| `.copilot/skills/` | `copilot/user` | 是 |
| `.codeium/windsurf/skills/` | `windsurf/user` | 是 |
| `.factory/skills/` | `droid/user` | 是 |
| `.pi/agent/skills/` | `pi/user` | 是 |
| `.openclaw/skills/`、`.clawdbot/skills/`、`.moltbot/skills/` | `openclaw/user` | 是 |
| `.config/goose/skills/` | `goose/user` | 是 |
| `.config/crush/skills/` | `crush/user` | 是 |
| `.continue/skills/` | `continue/user` | 是 |
| `.cline/skills/` | `cline/user` | 是 |
| `.openhands/skills/` | `openhands/user` | 是 |
| `.roo/skills/` | `roo/user` | 是 |
| `.augment/skills/` | `augment/user` | 是 |
| `.codebuddy/skills/` | `codebuddy/user` | 是 |
| `.commandcode/skills/` | `commandcode/user` | 是 |
| `.snowflake/cortex/skills/` | `cortex/user` | 是 |
| `.junie/skills/` | `junie/user` | 是 |
| `.iflow/skills/` | `iflow/user` | 是 |
| `.kilocode/skills/` | `kilo/user` | 是 |
| `.kiro/skills/` | `kiro/user` | 是 |
| `.kode/skills/` | `kode/user` | 是 |
| `.mcpjam/skills/` | `mcpjam/user` | 是 |
| `.vibe/skills/` | `vibe/user` | 是 |
| `.mux/skills/` | `mux/user` | 是 |
| `.qoder/skills/` | `qoder/user` | 是 |
| `.qwen/skills/` | `qwen/user` | 是 |
| `.trae/skills/`、`.trae-cn/skills/` | `trae/user` | 是 |
| `.zencoder/skills/` | `zencoder/user` | 是 |
| `.neovate/skills/` | `neovate/user` | 是 |
| `.pochi/skills/` | `pochi/user` | 是 |
| `.adal/skills/` | `adal/user` | 是 |

## 仓库里的目录

这些名字出现在仓库的任意深度都算，除了最后一行。

| 目录 | 标记 | 可改 |
| --- | --- | --- |
| `.agents/skills/` | `shared/project` | 是 |
| `.cursor/skills/` | `cursor/project` | 是 |
| `.cursor/plugins/` | `cursor/plugin` | 否 |
| `.claude/skills/` | `claude/project` | 是 |
| `.codex/skills/` | `codex/project` | 是 |
| `.grok/skills/` | `grok/project` | 是 |
| `.opencode/skills/` | `opencode/project` | 是 |
| `.gemini/skills/` | `gemini/project` | 是 |
| `.github/skills/` | `copilot/project` | 是 |
| `.factory/skills/` | `droid/project` | 是 |
| `.agent/skills/` | `antigravity/project` | 是 |
| `.windsurf/skills/` | `windsurf/project` | 是 |
| `.cline/skills/` | `cline/project` | 是 |
| `.openhands/skills/` | `openhands/project` | 是 |
| `.roo/skills/` | `roo/project` | 是 |
| `.goose/skills/` | `goose/project` | 是 |
| `.continue/skills/` | `continue/project` | 是 |
| `.augment/skills/` | `augment/project` | 是 |
| `.codebuddy/skills/` | `codebuddy/project` | 是 |
| `.commandcode/skills/` | `commandcode/project` | 是 |
| `.cortex/skills/` | `cortex/project` | 是 |
| `.crush/skills/` | `crush/project` | 是 |
| `.junie/skills/` | `junie/project` | 是 |
| `.iflow/skills/` | `iflow/project` | 是 |
| `.kilocode/skills/` | `kilo/project` | 是 |
| `.kiro/skills/` | `kiro/project` | 是 |
| `.kode/skills/` | `kode/project` | 是 |
| `.mcpjam/skills/` | `mcpjam/project` | 是 |
| `.vibe/skills/` | `vibe/project` | 是 |
| `.mux/skills/` | `mux/project` | 是 |
| `.pi/skills/` | `pi/project` | 是 |
| `.qoder/skills/` | `qoder/project` | 是 |
| `.qwen/skills/` | `qwen/project` | 是 |
| `.trae/skills/` | `trae/project` | 是 |
| `.zencoder/skills/` | `zencoder/project` | 是 |
| `.neovate/skills/` | `neovate/project` | 是 |
| `.pochi/skills/` | `pochi/project` | 是 |
| `.adal/skills/` | `adal/project` | 是 |
| `.zcode/skills/` | `zcode/project` | 是 |
| 仓库根上的 `skills/` | `openclaw/project` | 是。只认这一层 |
