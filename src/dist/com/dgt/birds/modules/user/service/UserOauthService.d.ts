import LoggerFactory from "../../../config/LoggerFactory";
import UserSQLRepository from "../repository/UserSQLRepository";
import MessageSource from "../../../config/MessageSource";
import OauthConsentUserRequestDTO from "../dto/request/OauthConsentUserRequestDTO";
import ResponseDTO from "../../../config/ResponseDTO";
import Oauth2ValidateUserRequestDTO from "../dto/request/Oauth2ValidateUserRequestDTO";
import UserBasicService from "./UserBasicService";
export default class UserOauthService {
    private readonly userRepository;
    private readonly messageSource;
    private readonly userBasicService;
    logger: LoggerFactory;
    constructor(userRepository: UserSQLRepository, messageSource: MessageSource, userBasicService: UserBasicService);
    getOauth2UserConsentUrl(requestUrl: string, requestDTO: OauthConsentUserRequestDTO): Promise<ResponseDTO>;
    private getGoogleOauth2UserConsentUrl;
    private getFacebookOauth2UserConsentUrl;
    private getAppleOauth2UserConsentUrl;
    validateOauth2User(requestUrl: string, requestDTO: Oauth2ValidateUserRequestDTO): Promise<ResponseDTO>;
    validateGoogleUser(requestUrl: string, requestDTO: Oauth2ValidateUserRequestDTO): Promise<ResponseDTO>;
    validateFacebookUser(requestUrl: string, requestDTO: Oauth2ValidateUserRequestDTO): Promise<ResponseDTO>;
    private getFacebookBasicUserInfo;
    private getFacebookUserPublicInfo;
}
