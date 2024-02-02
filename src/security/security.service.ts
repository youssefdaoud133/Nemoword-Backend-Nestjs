import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { createCipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import { createDecipheriv } from 'crypto';
import * as crypto from 'crypto';

@Injectable()
export class SecurityService {
  private readonly algorithm: string = 'aes-256-cbc';
  private readonly key: Buffer = crypto.randomBytes(32);
  private readonly iv: Buffer = crypto.randomBytes(16);
  async HashPassword(password: string) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
  }
  async VarifyPassword(password: string, HashPassword: string) {
    const isMatch = await bcrypt.compare(password, HashPassword);
    return isMatch;
  }
  encrypt(text: string): string {
    const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
    let encrypted = cipher.update(text, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  decrypt(encryptedText: string): string {
    try {
      const decipher = crypto.createDecipheriv(
        this.algorithm,
        this.key,
        this.iv,
      );
      let decrypted = decipher.update(encryptedText, 'hex', 'utf-8');
      decrypted += decipher.final('utf-8');
      return decrypted;
    } catch (error) {
      console.error('Decryption error:', error);
      console.error('Encrypted text:', encryptedText);
      console.error('Key:', this.key.toString('hex'));
      console.error('IV:', this.iv.toString('hex'));
      throw error;
    }
  }
}
