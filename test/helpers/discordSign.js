// Signs a fake Discord interaction payload the same way discord-interactions'
// verifyKeyMiddleware checks it: Ed25519 over timestamp||body, raw (not
// SPKI-wrapped) key material, hex-encoded — so tests can hit a real running
// app.js over HTTP without Discord's servers involved.
const { subtle } = globalThis.crypto;

export async function generateDiscordKeyPair() {
  const keyPair = await subtle.generateKey({ name: 'Ed25519' }, true, ['sign', 'verify']);
  const publicKeyHex = Buffer.from(await subtle.exportKey('raw', keyPair.publicKey)).toString('hex');
  return { keyPair, publicKeyHex };
}

export async function signInteraction(privateKey, bodyString) {
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const message = Buffer.concat([Buffer.from(timestamp, 'utf8'), Buffer.from(bodyString, 'utf8')]);
  const signature = Buffer.from(await subtle.sign({ name: 'Ed25519' }, privateKey, message)).toString('hex');
  return { timestamp, signature };
}
