const fs = require("fs");
const { encoding_for_model, get_encoding } = require("tiktoken");

const pricing = JSON.parse(fs.readFileSync("./pricing.json", "utf8"));

function usd(x) {
  if (x >= 1) return `$${x.toFixed(2)}`;
  if (x >= 0.01) return `$${x.toFixed(4)}`;
  return `$${x.toFixed(6)}`;
}

function getArg(name) {
  const i = process.argv.indexOf(name);
  return i !== -1 ? process.argv[i + 1] : null;
}

const model = process.argv[2] ?? "gpt-4o-mini";
const rawArgs = process.argv.slice(3);
const outIndex = rawArgs.indexOf("--out");
const textArgs = outIndex === -1 ? rawArgs : rawArgs.slice(0, outIndex);
const text = textArgs.join(" ");




if (!text) {
  throw new Error('Usage: node index.js <model> "your prompt text here"');
}
if (!pricing[model]) {
  throw new Error(`Unknown model "${model}". Available: ${Object.keys(pricing).join(", ")}`);
}
let Tin;

try {
  const enc = encoding_for_model(model);
  Tin = enc.encode(text).length;
  enc.free();
} catch {
  const enc = get_encoding(pricing[model].encoding);
  Tin = enc.encode(text).length;
  enc.free();
}

const Pin = pricing[model].input_per_1m;
const inputCost = (Tin / 1_000_000) * Pin;

const outArg = getArg("--out");
const Tout = outArg ? Number(outArg) : 500;

if (!Number.isFinite(Tout) || Tout < 0) {
  throw new Error('Invalid --out value. Example: --out 250');
}


const Pout = pricing[model].output_per_1m;
const outputCost = (Tout / 1_000_000) * Pout;

const totalCost = inputCost + outputCost;
const totalTokens = Tin + Tout;


console.log({
  model,
  Tin,
  Tout,
  totalTokens,
  inputCost_usd: usd(inputCost),
  outputCost_usd: usd(outputCost),
  totalCost_usd: usd(totalCost),
});


