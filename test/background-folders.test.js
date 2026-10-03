// backgroundPath's folder rules. That every listed file actually sits at its
// resolved path is a validateContent error (see test/validate-content.test.js).
import { test } from 'node:test';
import assert from 'node:assert';

import { backgroundPath } from '../constants/backgrounds.js';

test('a location is foldered by its lowercased key', () => {
  assert.strictEqual(
    backgroundPath('Frostheim_Ballroom.png'),
    'frostheim/Frostheim_Ballroom.png',
  );
  assert.strictEqual(
    backgroundPath('Ultio_Cave.png'),
    'ultio/Ultio_Cave.png',
  );
});

test('Galaxy Express shares darkwick; Star Festival has its own folder', () => {
  assert.strictEqual(
    backgroundPath('Galaxy_Express_AM.png'),
    'darkwick/Galaxy_Express_AM.png',
  );
  assert.strictEqual(
    backgroundPath('Hotarubi_River_PM.png'),
    'festival/Hotarubi_River_PM.png',
  );
});

test("a character room sits in its house's folder", () => {
  assert.strictEqual(
    backgroundPath('Frostheim_Jin_Room.png'),
    'frostheim/Frostheim_Jin_Room.png',
  );
});

test('backgroundPath throws on an unlisted file', () => {
  assert.throws(() => backgroundPath('Nowhere.png'), /No assets\/bg folder/);
});
