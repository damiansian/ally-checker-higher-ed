import { readFileSync, writeFileSync } from "node:fs";

const budgetPath = "tests/a11y-budget.json";
const reportPath = "test-results/playwright-results.json";
const summaryPath = "test-results/a11y-summary.json";

function parseJson(path) {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (err) {
    throw new Error(`Unable to parse ${path}: ${err.message}`);
  }
}

function collectFailedTests(node, out = []) {
  if (!node || typeof node !== "object") return out;
  if (Array.isArray(node)) {
    for (const item of node) collectFailedTests(item, out);
    return out;
  }

  if (Array.isArray(node.tests)) {
    for (const t of node.tests) {
      const failedResults = (t.results || []).filter((r) => r.status === "failed");
      if (failedResults.length > 0) {
        out.push({
          title: t.title,
          errors: failedResults.flatMap((r) => r.errors || []).map((e) => e.message || ""),
        });
      }
    }
  }

  for (const value of Object.values(node)) collectFailedTests(value, out);
  return out;
}

function countRulesFromErrors(errors) {
  const counts = {};
  const re = /\[([a-z0-9-]+)\]/gi;
  for (const msg of errors) {
    for (const match of msg.matchAll(re)) {
      const id = match[1];
      counts[id] = (counts[id] || 0) + 1;
    }
  }
  return counts;
}

const budget = parseJson(budgetPath);
const report = parseJson(reportPath);

const failedTests = collectFailedTests(report);
const allErrors = failedTests.flatMap((t) => t.errors);
const ruleCounts = countRulesFromErrors(allErrors);

const summary = {
  generatedAt: new Date().toISOString(),
  failedTests: failedTests.length,
  ruleCounts,
};
writeFileSync(summaryPath, JSON.stringify(summary, null, 2));

const maxFailedTests = budget.maxFailedTests ?? 0;
if (failedTests.length > maxFailedTests) {
  console.error(
    `A11y budget failed: ${failedTests.length} failed tests (max ${maxFailedTests}).`
  );
  process.exit(1);
}

const maxRuleFailures = budget.maxRuleFailures || {};
for (const [rule, max] of Object.entries(maxRuleFailures)) {
  const actual = ruleCounts[rule] || 0;
  if (actual > max) {
    console.error(`A11y budget failed: rule [${rule}] count ${actual} exceeds max ${max}.`);
    process.exit(1);
  }
}

console.log("A11y budget check passed.");
console.log(`Failed tests: ${failedTests.length}`);
