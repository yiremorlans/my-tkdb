// validateContent() is the startup guard that catches characters.js and
// dialogue.js drifting apart (see its file header: this exact drift hid two
// real bugs in production before). Running it in CI, not just at boot,
// catches a future content edit that breaks the catalog before it ships.
import { test } from 'node:test';
import assert from 'node:assert';
import { validateContent } from '../constants/validateContent.js';

test('validateContent does not throw against the real character/dialogue catalog', () => {
  assert.doesNotThrow(() => validateContent());
});

test('validateContent reports its findings as { errors, warnings } without throwing when there are no errors', () => {
  const result = validateContent();
  assert.deepStrictEqual(result.errors, []);
  assert.ok(Array.isArray(result.warnings));
});
