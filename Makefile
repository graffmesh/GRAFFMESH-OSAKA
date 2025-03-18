# Variables
PACKAGE_MANAGER ?= yarn
TURBO = yarn turbo run
CLI = packages/cli

# Setup the workspaces
setup:
	@sh ./scripts/setup.sh

# Generate the project structure
generate_code_markdown:
	@sh ./scripts/generate_code_markdown.sh

## This short hand
codes: generate_code_markdown

# Default target
.PHONY: all
all: build

# Install dependencies
.PHONY: install
install:
	@echo "Installing dependencies..."
	$(PACKAGE_MANAGER) install

# Build the entire monorepo
.PHONY: build
build:
	@echo "Building all projects..."
	$(TURBO) build

# Serve OOUI
.PHONY: serve-ooui
serve-ooui:
	@echo "Starting OOUI development server..."
	$(TURBO) serve ooui

# Build CLI
.PHONY: build-cli
build-cli:
	@echo "Building CLI..."
	cd $(CLI) && $(PACKAGE_MANAGER) build

# Lint the entire project
.PHONY: lint
lint:
	@echo "Linting all projects..."
	$(TURBO) lint

# Format the codebase
.PHONY: format
format:
	@echo "Formatting all code with Prettier..."
	$(PACKAGE_MANAGER) prettier --write .

# Run tests
.PHONY: test
test:
	@echo "Running all tests..."
	$(TURBO) test

# Clean build artifacts
.PHONY: clean
clean:
	@echo "Cleaning build artifacts..."
	rm -rf dist nx-cache tools/cli/dist

# CLI help
.PHONY: help
help:
	@echo "Available targets:"
	@echo "  install       Install dependencies"
	@echo "  build         Build all projects"
	@echo "  serve-ooui    Start the OOUI development server"
	@echo "  build-cli     Build the CLI"
	@echo "  lint          Run lint checks"
	@echo "  format        Format code with Prettier"
	@echo "  test          Run all tests"
	@echo "  clean         Remove build artifacts"
	@echo "  help          Display this help message"

