import config from "@config/index";
import initLogger, { LoggerService } from "@lib/logging";

export default class EncryptionManager {
  static instance: EncryptionManager;
  logger: LoggerService;
  private _keysGenerated = false;
  private _key!: CryptoKey;
  private _iv!: Uint8Array;

  static getInstance() {
    if (!this.instance) {
      this.instance = new EncryptionManager();
    }
    return this.instance;
  }

  private constructor() {
    this.logger = initLogger("UTILITY", this.constructor.name);

    // Generate a key

    this._generateIvAndKey()
      .then(() => {
        this.logger.success("Keys Generated ");
      })
      .catch(e => this.logger.error("Keys generation failed", e));
  }

  private async _generateIvAndKey() {
    if (typeof window === "undefined") return;
    if (this._keysGenerated) return;
    const { secret, passphrase } = config.security.localStorage;
    this._key = await this._stringToCryptoKey(passphrase);
    this._iv = this.stringToUint8Array(secret);
    this._keysGenerated = true;
  }

  private async _stringToCryptoKey(passphrase: string): Promise<CryptoKey> {
    const encoder = new TextEncoder();
    const passphraseBuffer = encoder.encode(passphrase);

    // Derive a key using the passphrase
    const key = await window.crypto.subtle.importKey(
      "raw",
      passphraseBuffer,
      { name: "PBKDF2" },
      false,
      ["deriveKey", "deriveBits"],
    );

    // Export the derived key
    return window.crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: new Uint8Array(16), // Use a random salt
        iterations: 100000, // Adjust as needed for your security requirements
        hash: "SHA-256",
      },
      key,
      { name: "AES-GCM", length: 256 }, // Or other desired parameters
      true,
      ["encrypt", "decrypt"],
    );
  }

  stringToUint8Array(str: string): Uint8Array {
    const encoder = new TextEncoder();
    return encoder.encode(str);
  }

  uint8ArrayToString(uint8Array: Uint8Array): string {
    const decoder = new TextDecoder();
    return decoder.decode(uint8Array);
  }

  stringToArrayBuffer(str: string): ArrayBuffer {
    return this.stringToUint8Array(str).buffer;
  }

  arrayBufferToString(buffer: ArrayBuffer): string {
    const decoder = new TextDecoder();
    return decoder.decode(buffer);
  }

  arrayBufferToBase64(buffer: ArrayBuffer): string {
    const binary = String.fromCharCode.apply(
      null,
      Array.from(new Uint8Array(buffer)),
    );
    return btoa(binary);
  }

  base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binaryString = atob(base64);
    const length = binaryString.length;
    const buffer = new ArrayBuffer(length);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < length; i++) {
      view[i] = binaryString.charCodeAt(i);
    }
    return buffer;
  }

  async encrypt(plainText: string): Promise<ArrayBuffer> {
    await this._generateIvAndKey();
    const encoded = new TextEncoder().encode(plainText);

    const encrypted = await window.crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: this._iv,
      },
      this._key,
      encoded,
    );

    return encrypted;
  }

  async decrypt(encrypted: ArrayBuffer): Promise<string | null> {
    try {
      await this._generateIvAndKey();
      const decrypted = await window.crypto.subtle.decrypt(
        {
          name: "AES-GCM",
          iv: this._iv,
        },
        this._key,
        encrypted,
      );

      const decoded = new TextDecoder().decode(decrypted);
      return decoded;
    } catch (error) {
      return null;
    }
  }

  async getIv(): Promise<Uint8Array> {
    await this._generateIvAndKey();
    return this._iv;
  }

  async test() {
    try {
      // Encrypt a token
      const token = "secret-token";
      const data = await this.encrypt(token);

      // Decrypt the token
      const decryptedToken = await this.decrypt(data);
      console.log("Decrypted token:", decryptedToken);
    } catch (error) {
      console.error("Encryption/Decryption error:", error);
    }
  }
}
