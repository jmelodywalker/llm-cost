# BACKGROUND

## llm-cost

A lightweight CLI tool to estimate LLM prompt costs using real tokenization and model pricing.

## Features
- Model-aware token counting (via tokenizer)
- Input + output token cost estimation
- CLI usage with output token override
- Pricing defined via JSON

## Usage

```bash
npm install
node index.js gpt-4o-mini "Write a haiku about developers learning to adopt ai faster."
node index.js gpt-4o-mini "Write a haiku about developers learning to adopt ai faster." --out 50

# OUTPUT

Displays token counts and estimated USD cost.
