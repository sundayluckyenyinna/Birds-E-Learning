/* eslint-disable */

export default class ResponseCodes
{
  static SUCCESS = "00";
  static IP_BANNED = "01";
  static RECORD_ALREADY_EXIST = "02";
  static RECORD_NOT_EXIST = "03";
  static REQUEST_IS_PROCESSING = "04";
  static TRANSACTION_FAILED = "05";
  static FAILED_MODEL = "06";
  static INVALID_PASSWORD = "07";
  static BAD_REQUEST = "08";
  static INVALID_USER_ROLE = "09";
  static INVALID_OTP = "10";
  static EXPIRED_OTP = "11";
  static ACCOUNT_LOCKED = "12";
  static ACCOUNT_NOT_VERIFIED = "13";
  static OTP_ALREADY_VERIFIED = "14";
  static OAUTH_PROVIDER_FAILED = "15";
  static CSRF_ATTACK = "16";
  static USER_CONSENT_FAILED = "17";
  static INVALID_DEVICE_ID = "18";
  static OTP_STILL_ACTIVE = "19";
  static REMEMBER_ME_EXPIRED = "20";
  static INVALID_CHANNEL = "21";
  static NO_INITIAL_LOGIN_RECORD = "22";
  static INVALID_SIGNER = "23";
  static NO_USER_PREFERENCE_FOUND = "24";
  static CARD_ALREADY_LINKED = "25";
  static CARD_RECORD_NOT_FOUND = "26";
  static FORBIDDEN_EMAIL_MISMATCH = "27";
  static FORBIDDEN_OAUTH2_CHANNEL = "28";
  static FORBIDDEN_CROSS_TOKEN_USAGE = "95";
  static FAILED_AUTHENTICATION = "96";
  static FORBIDDEN = "97";
  static SYSTEM_ERROR = "99";
}