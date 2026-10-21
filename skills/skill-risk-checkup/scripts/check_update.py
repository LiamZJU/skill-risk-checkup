#!/usr/bin/env python3
"""Compare the installed VERSION with GitHub main.

Stdout is JSON. Debug goes to stderr. A network failure is not an update.
"""

from __future__ import annotations

import json
import sys
import urllib.error
import urllib.request
from pathlib import Path

REMOTE_VERSION_URL = (
    "https://raw.githubusercontent.com/LiamZJU/skill-risk-checkup/main/"
    "skills/skill-risk-checkup/VERSION"
)
TIMEOUT_SECONDS = 8


def skill_root() -> Path:
    return Path(__file__).resolve().parent.parent


def read_local_version(root: Path) -> str:
    path = root / "VERSION"
    if not path.is_file():
        return ""
    return path.read_text(encoding="utf-8").strip()


def fetch_remote_version(url: str = REMOTE_VERSION_URL) -> str | None:
    request = urllib.request.Request(url, headers={"User-Agent": "skill-risk-checkup"})
    try:
        with urllib.request.urlopen(request, timeout=TIMEOUT_SECONDS) as response:
            body = response.read().decode("utf-8", errors="replace")
    except (urllib.error.URLError, TimeoutError, OSError) as exc:
        print(f"[update] remote unavailable: {exc}", file=sys.stderr)
        return None
    return body.strip()


def decide(local: str, remote: str | None) -> dict[str, object]:
    if remote is None:
        return {
            "update": False,
            "local": local,
            "remote": None,
            "reason": "remote-unavailable",
        }
    if not local:
        return {
            "update": True,
            "local": local,
            "remote": remote,
            "reason": "local-missing",
        }
    if local != remote:
        return {
            "update": True,
            "local": local,
            "remote": remote,
            "reason": "different",
        }
    return {
        "update": False,
        "local": local,
        "remote": remote,
        "reason": "same",
    }


def self_test() -> int:
    failures: list[str] = []
    same = decide("1", "1")
    different = decide("1", "2")
    missing = decide("", "2")
    offline = decide("1", None)
    if same["update"] or same["reason"] != "same":
        failures.append("same version should not update")
    if not different["update"] or different["reason"] != "different":
        failures.append("different version should update")
    if not missing["update"]:
        failures.append("missing local version should update")
    if offline["update"] or offline["reason"] != "remote-unavailable":
        failures.append("offline should not pretend there is an update")
    if failures:
        for item in failures:
            print(f"[update] SELF-TEST FAIL {item}", file=sys.stderr)
        return 1
    print("[update] self-test ok", file=sys.stderr)
    return 0


def main(argv: list[str]) -> int:
    for stream in (sys.stdout, sys.stderr):
        reconfigure = getattr(stream, "reconfigure", None)
        if reconfigure is not None:
            try:
                reconfigure(encoding="utf-8")
            except (OSError, ValueError):
                pass
    if "--self-test" in argv:
        return self_test()
    local = read_local_version(skill_root())
    remote = fetch_remote_version()
    report = decide(local, remote)
    print(
        f"[update] local={local!r} remote={remote!r} update={report['update']}",
        file=sys.stderr,
    )
    json.dump(report, sys.stdout, ensure_ascii=False)
    sys.stdout.write("\n")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
