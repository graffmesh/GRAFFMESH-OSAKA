import { describe, expect, test } from 'vitest';
import { encrypt, decrypt } from '../utils/encryption';

describe('Encryption Utils', () => {
  test('encrypt and decrypt text', () => {
    const originalText = 'Hello, World!';
    const encryptedText = encrypt(originalText);
    const decryptedText = decrypt(encryptedText);

    expect(decryptedText).toBe(originalText);
  });

  test('ensure encryption generates different results for the same input', () => {
    const text = 'Test Input';
    const encrypted1 = encrypt(text);
    const encrypted2 = encrypt(text);

    expect(encrypted1).not.toBe(encrypted2);
  });
});
