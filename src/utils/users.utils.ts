import * as bcrypt from 'bcrypt';

export class UserUtils {
  static async saltAndHashPassword(password: string) {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);

    return hash;
  }

  static async validatePassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }
}
