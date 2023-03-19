export default class PasswordUtil {
    static saltStrength: number;
    static salt: any;
    static hash: (plainPassword: string) => string;
    static match: (plainPassword: string, hashedPassword: string) => boolean;
}
