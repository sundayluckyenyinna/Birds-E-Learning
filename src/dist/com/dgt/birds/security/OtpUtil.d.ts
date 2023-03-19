export default class OtpUtil {
    private static numerics;
    private static expiresIn;
    private static expiresInMillSec;
    static generateToken: (length: number) => string;
    static getTokenExpirationTime: () => Date;
}
