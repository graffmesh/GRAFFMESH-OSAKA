#!/usr/bin/env bash

# Exit on error, undefined variables, and pipe failures
set -euo pipefail

# === 関数定義 ===

# ログ出力関数
log() {
    echo "⌁ 💁🏼‍♀️ ⌁ [$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

# エラーハンドリング関数
handle_error() {
    local line_no=$1
    local command=$2
    log "Error occurred at line ${line_no}"
    log "Failed command: ${command}"
    exit 1
}

# エラートラップの設定
trap 'handle_error ${LINENO} "${BASH_COMMAND}"' ERR

# 必要なコマンドのチェック
check_requirements() {
    local required_commands=("corepack" "yarn" "tree")
    for cmd in "${required_commands[@]}"; do
        if ! command -v "$cmd" &> /dev/null; then
            log "Error: ${cmd} is not installed"
            exit 1
        fi
    done
}

# Yarnのセットアップ関数
setup_yarn() {
    log "Initializing Yarn"
    yarn init -2 || return 1

    log "Setting Yarn version"
    yarn set version stable || return 1

    yarn plugin import interactive-tools
    yarn plugin import version

    # package.jsonの復元
    if ! git checkout package.json; then
        log "Failed to recover package.json"
        log "Please Fix package.json: $ git checkout package.json"
        exit 1
    fi

    log "Setting up dependencies"
    yarn unlink &> /dev/null || true  # エラーメッセージを抑制し、失敗しても続行
    yarn install || return 1
}

# メイン関数
main() {
    log "Running: Setup Workspaces ⌁ 🧊"

    # 依存関係のチェック
    check_requirements

    # Corepackの有効化
    log "Enabling corepack"
    corepack enable || {
        log "Failed to enable corepack"
        exit 1
    }

    # Yarnのセットアップ
    setup_yarn || {
        log "Failed to setup yarn environment"
        exit 1
    }

    # ディレクトリ構造の表示
    if ! tree -L 3; then
        log "Failed to display directory structure"
    fi

    # ビルドの実行
    yarn build || {
        log "Failed to build"
        exit 1
    }

    log "Finished: Setup Workspaces ⌁ ⚡️"
    echo
}

# メイン関数の実行
main

exit 0