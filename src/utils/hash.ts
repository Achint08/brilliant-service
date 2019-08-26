import * as bcrypt from 'bcryptjs';

 /*
* Hashes the password using bcrypt to save it securely
* @prop: [password: string]: The password to be hashed
* @returns: [string]: The hashed password
*/
export function hashPassword(password: string): string {
    return bcrypt.hashSync(password, 8);
}

export function checkIfUnencryptedPasswordIsValid(unencryptedPassword: string, password: string) {
    return bcrypt.compareSync(unencryptedPassword, password);
}
