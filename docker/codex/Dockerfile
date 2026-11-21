# syntax=docker/dockerfile:1
FROM rust:1.95.0-bookworm AS builder
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates git python3 pkg-config libssl-dev libcap-dev libasound2-dev \
    clang libclang-dev cmake protobuf-compiler \
    && rm -rf /var/lib/apt/lists/*
ARG CODEX_REVISION=727283cea5ba30e8cf8bbac6b68a03a4d91cf1b7
WORKDIR /src/codex
RUN test "${#CODEX_REVISION}" -eq 40 \
    && printf '%s' "$CODEX_REVISION" | grep -Eq '^[0-9a-f]{40}$' \
    && git init . \
    && git remote add origin https://github.com/openai/codex.git \
    && git fetch --depth=1 origin "$CODEX_REVISION" \
    && git checkout --detach FETCH_HEAD \
    && test "$(git rev-parse HEAD)" = "$CODEX_REVISION"
COPY build.py /usr/local/lib/codex-build.py
ARG TARGETARCH
ENV CARGO_TARGET_DIR=/cache/target
RUN --mount=type=cache,id=codex-cargo-registry,target=/usr/local/cargo/registry,sharing=locked \
    --mount=type=cache,id=codex-cargo-git,target=/usr/local/cargo/git,sharing=locked \
    --mount=type=cache,id=codex-v8-${TARGETARCH},target=/tmp/codex-package,sharing=locked \
    --mount=type=cache,id=codex-target-bookworm-rust1.95.0-${TARGETARCH},target=/cache/target,sharing=locked \
    python3 /usr/local/lib/codex-build.py

FROM debian:bookworm-slim AS runtime
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates bubblewrap libssl3 libbz2-1.0 libzstd1 zlib1g libcap2 libasound2 \
    && rm -rf /var/lib/apt/lists/*
ARG CODEX_REVISION=727283cea5ba30e8cf8bbac6b68a03a4d91cf1b7
LABEL org.opencontainers.image.source="https://github.com/openai/codex" \
    org.opencontainers.image.revision=$CODEX_REVISION
COPY --from=builder /out/ /usr/local/bin/
RUN codex --version && test -x /usr/local/bin/codex-code-mode-host \
    && ! ldd /usr/local/bin/codex /usr/local/bin/codex-code-mode-host | grep 'not found'
ENV CODEX_HOME=/codex/home
WORKDIR /codex/workspace
ENTRYPOINT ["codex", "app-server", "--listen", "ws://0.0.0.0:4500", "--ws-auth", "capability-token", "--ws-token-file", "/codex/home/transport-token"]
