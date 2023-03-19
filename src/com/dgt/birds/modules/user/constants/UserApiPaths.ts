/* eslint-disable */
export default class UserApiPaths
{
    static USER_BASE_API = "/user";
    static USER_BASIC_SIGN_UP = "/basic/signup";
    static USER_BASIC_LOGIN = "/basic/login";
    static USER_BASIC_AUTOMATIC_LOGIN = "/basic/remember/login";
    static USER_OAUTH_CONSENT = "/oauth2/consent";
    static USER_OAUTH_CONSENT_VALIDATION = "/oauth2/consent-validation";
    static USER_OAUTH_LOGIN = "/oauth2/login";
    static USER_VALID_OTP = "/verification/otp";
    static USER_PASSWORD_RESET_PAGE_REQUEST = "/password/reset";
    static USER_PASSWORD_RESET_PAGE = "/password/reset/page";
    static USER_PASSWORD_NEW_SUBMIT = "/password/new/submit"
    static USER_SEND_OTP = "/verification/send/otp";
    static USER_GET_ALL = "/all/details";
    static USER_GET_SINGLE = "/single/details"

    // Mobile app password
    static USER_PASSWORD_MOBILE_RESET_MAIL_REQUEST = "/credentials/reset/mail";
    static USER_PASSWORD_RESET_OTP_VALIDATION = "/credentials/reset/verification/otp";
    static USER_PASSWORD_RESET_SUBMIT_REQUEST = "/credentials/new/submit";
    static USER_DETAILS_UPDATE = "/profile/update";
    static USER_PASSWORD_UPDATE = "/profile/password/update";
    static USER_LOG_OUT = "/logout";
}