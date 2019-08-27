import * as bcrypt from 'bcryptjs';
import { Logger } from '@nestjs/common';

 /*
* Hashes the password using bcrypt to save it securely
* @param: [password: string]: The password to be hashed
* @returns: [string]: The hashed password
*/
export function hashPassword(password: string): string {
    let hashedPass: string = '';
    try {
        hashedPass = bcrypt.hashSync(password, 8);
    } catch (error) {
        Logger.error('Error while hashing password' + error);
    }
    return hashedPass;
}

/*
* Checks if encrypted Password is Valid or not.
* @param: [unencryptedPassword: string] : Unencrypted Password
* @param: [password: string]: encrypted password
: @returns [result: boolean] true if password is valid or false
*/
export function checkIfUnencryptedPasswordIsValid(unencryptedPassword: string, password: string): boolean {
    let result: boolean = false;
    try {
        result = bcrypt.compareSync(unencryptedPassword, password);
    } catch (error) {
        Logger.error('Error while comparing passwords' + error);
    }
    return result;
}
