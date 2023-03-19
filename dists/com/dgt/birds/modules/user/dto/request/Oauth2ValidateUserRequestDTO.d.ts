export default class Oauth2ValidateUserRequestDTO {
    consentCode: string;
    state: string;
    authServiceProvider: string;
    channel: string;
    deviceId: string;
    oauthValidationType: string;
}
