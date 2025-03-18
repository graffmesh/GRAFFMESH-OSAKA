import { describe, it, expect } from 'vitest';
import { encrypt, decrypt } from '../services/encryptionService';

describe('EncryptionService', () => {
  const text = 'Hello, World!';

  it('should encrypt and decrypt text correctly', () => {
    const encryptedText = encrypt(text);
    const decryptedText = decrypt(encryptedText);

    expect(decryptedText).toBe(text);
  });

  it('should produce different encrypted text for the same input', () => {
    const encryptedText1 = encrypt(text);
    const encryptedText2 = encrypt(text);

    expect(encryptedText1).not.toBe(encryptedText2);
  });

  it('should throw an error if decryption fails', () => {
    const invalidEncryptedText = 'invalid:encryptedText';

    expect(() => decrypt(invalidEncryptedText)).toThrow();
  });
});
