#!/bin/bash

# Exit on error, undefined variables, and pipe failures
set -euo pipefail

# === 定数定義 ===

# Output file name
OUTPUT_FILE="project_code.md"

# Target file extensions
EXTENSIONS=("js" "css" "html" "json" "sh" "ts" "yml" "tsx" "md" "cjs" "mjs")

# Directories to exclude
EXCLUDE_DIR=("node_modules" ".git" "dev" ".yarn" ".turbo")

# Paths to exclude
EXCLUDE_PATH=("$OUTPUT_FILE" ".pnp.*")

# === 関数定義 ===

# Initialize output file
initialize_output() {
    {
        echo "# Project Code Documentation"
        echo
        echo "Generated on $(date '+%Y-%m-%dT%H:%M:%S.%6N%z')" # ISO 8601 format
        echo
    } > "$OUTPUT_FILE" || { echo "Failed to initialize output file."; exit 1; }
}

# Generate Directives Structure
generate_directives() {
    echo "## Directives Structure" >> "$OUTPUT_FILE"
    echo '```' >> "$OUTPUT_FILE"

    # 結合した除外ディレクトリパターン
    EXCLUDE_PATTERN=$(IFS='|'; echo "${EXCLUDE_DIR[*]}")

    # Use tree command to generate directory structure, excluding specified directories
    tree -I "$EXCLUDE_PATTERN" --noreport >> "$OUTPUT_FILE" || { echo "Failed to generate directory structure."; exit 1; }
    echo '```' >> "$OUTPUT_FILE"
    echo >> "$OUTPUT_FILE"
}

# Generate Table of Index
generate_table_of_index() {
    echo "## Table of Index" >> "$OUTPUT_FILE"
    echo >> "$OUTPUT_FILE"

    # 動的に拡張子の条件を生成
    FIND_NAME_CONDITIONS=()
    for ext in "${EXTENSIONS[@]}"; do
        FIND_NAME_CONDITIONS+=("-name" "*.$ext" "-o")
    done
    # Remove the last '-o'
    unset 'FIND_NAME_CONDITIONS[${#FIND_NAME_CONDITIONS[@]}-1]'

    # 動的に除外パスの条件を生成
    FIND_EXCLUDE_CONDITIONS=()
    for excl_dir in "${EXCLUDE_DIR[@]}"; do
        FIND_EXCLUDE_CONDITIONS+=("!" "-path" "*/$excl_dir/*")
    done
    for excl_path in "${EXCLUDE_PATH[@]}"; do
        FIND_EXCLUDE_CONDITIONS+=("!" "-path" "*/$excl_path")
    done

    # Find commandを動的に構築し実行
    find . -type f \( "${FIND_NAME_CONDITIONS[@]}" \) "${FIND_EXCLUDE_CONDITIONS[@]}" | while IFS= read -r FILE; do
        # ファイルパスをアンカー形式に変換
        FILE_ANCHOR=$(echo "$FILE" | sed -E 's/[^a-zA-Z0-9]/-/g' | tr '[:upper:]' '[:lower:]')
        echo "- [\`$FILE\`](#$FILE_ANCHOR)" >> "$OUTPUT_FILE"
    done || { echo "Failed to generate table of index."; exit 1; }

    echo >> "$OUTPUT_FILE"
}

# Add file content with full path headings
add_file_contents() {
    # 動的に拡張子の条件を生成
    FIND_NAME_CONDITIONS=()
    for ext in "${EXTENSIONS[@]}"; do
        FIND_NAME_CONDITIONS+=("-name" "*.$ext" "-o")
    done
    # Remove the last '-o'
    unset 'FIND_NAME_CONDITIONS[${#FIND_NAME_CONDITIONS[@]}-1]'

    # 動的に除外パスの条件を生成
    FIND_EXCLUDE_CONDITIONS=()
    for excl_dir in "${EXCLUDE_DIR[@]}"; do
        FIND_EXCLUDE_CONDITIONS+=("!" "-path" "*/$excl_dir/*")
    done
    for excl_path in "${EXCLUDE_PATH[@]}"; do
        FIND_EXCLUDE_CONDITIONS+=("!" "-path" "*/$excl_path")
    done

    # Find commandを動的に構築し実行
    find . -type f \( "${FIND_NAME_CONDITIONS[@]}" \) "${FIND_EXCLUDE_CONDITIONS[@]}" | \
    parallel --no-notice 'EXT={#}; FILE={}; \
    FILE_ANCHOR=$(echo "{}" | sed -E "s/[^a-zA-Z0-9]/-/g" | tr "[:upper:]" "[:lower:]"); \
    echo "## <a id=\"${FILE_ANCHOR}\"></a> {}" >> project_code.md; \
    echo "\`\`\`${EXT##*.}" >> project_code.md; \
    cat "{}" >> project_code.md; \
    echo "\`\`\`" >> project_code.md; \
    echo >> project_code.md'
}

# === メイン処理 ===

echo "Generating Markdown document with all project code..."

# Initialize output file
initialize_output

# Add directives structure
generate_directives

# Add Table of Index
generate_table_of_index

# Add file content
add_file_contents

echo "Markdown document generated: $OUTPUT_FILE"