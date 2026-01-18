# Background:

## llm-cost

A lightweight CLI tool to estimate LLM prompt costs using real tokenization and model pricing.

## Tools

- Node.js (CLI tool)
- JavaScript
- JSON-based pricing config
- Tokenization via tokenizer library
- Cost modeling and math

## Features
- Model-aware token counting (via tokenizer)
- Input + output token cost estimation
- CLI usage with output token override
- Pricing defined via JSON

# Output:

Displays token counts and estimated USD cost.

## Usage

```bash
npm install
node index.js gpt-4o-mini "Write a haiku about developers learning to adopt ai faster."
node index.js gpt-4o-mini "Write a haiku about developers learning to adopt ai faster." --out 50


