"""Сборка комплекта Codex под блокировкой кеша BuildKit."""

import os
from pathlib import Path
import subprocess
import sys

repo = Path('/src/codex')
os.environ['CODEX_REPO_ROOT'] = str(repo)
sys.path.insert(0, str(repo / 'scripts'))
from codex_package.targets import TARGET_SPECS
from codex_package.v8 import resolve_codex_v8_cargo_env

rust_version = subprocess.check_output(['rustc', '-vV'], text=True)
host = next(line.removeprefix('host: ') for line in rust_version.splitlines()
            if line.startswith('host: '))
environment = os.environ.copy()
# Штатный механизм выбранной ревизии проверяет контрольные суммы V8.
environment.update(resolve_codex_v8_cargo_env(TARGET_SPECS[host]))
subprocess.run(
    ['cargo', 'build', '--locked', '--release', '--bin', 'codex',
     '--bin', 'codex-code-mode-host'],
    cwd=repo / 'codex-rs', env=environment, check=True,
)
output = Path('/out')
output.mkdir()
# Копирование входит в тот же RUN, что и компиляция: блокировка ещё удерживается.
for name in ['codex', 'codex-code-mode-host']:
    subprocess.run(['strip', '-o', str(output / name),
                    str(Path(os.environ['CARGO_TARGET_DIR']) / 'release' / name)],
                   check=True)
    (output / name).chmod(0o755)
