/* eslint-disable */
import { Request, Response } from "express";
import { Body, Controller, Get, Post, Query, Req, Res } from "@nestjs/common";
import UserApiPaths from "../constants/UserApiPaths";
import CreateUserRequestDTO from "../dto/request/CreateUserRequestDTO";
import UserService from "../service/UserService";
import ResponseDTO from "../../../config/ResponseDTO";
import LoginUserRequestDTO, { AutomaticLoginRequestDTO } from "../dto/request/LoginUserRequestDTO";
import {
    ApiBadRequestResponse,
    ApiCreatedResponse, ApiExcludeEndpoint, ApiHeader,
    ApiInternalServerErrorResponse,
    ApiOkResponse, ApiOperation, ApiQuery,
    ApiTags
} from "@nestjs/swagger";
import LoginUserResponseDTO from "../dto/response/LoginUserResponseDTO";
import LoggerFactory from "../../../config/LoggerFactory";
import CreateUserResponseDTO from "../dto/response/CreateUserResponseDTO";
import ValidateOtpRequestDTO from "../dto/request/ValidateOtpRequestDTO";
import ValidateOtpResponseDTO from "../dto/response/ValidateOtpResponseDTO";
import {
    BadRequestResponseDTO,
    InternalServerErrorResponseDTO,
    Oauth2ConsentUrlDTO
} from "../../../api-schema/SwaggerDocsSchema";
import ResponseDispatcher from "../../../config/ResponseDispatcher";
import Oauth2ValidateUserRequestDTO from "../dto/request/Oauth2ValidateUserRequestDTO";
import UpdatePasswordRequestDTO from "../dto/request/UpdatePasswordRequestDTO";
import UpdatePasswordResponseDTO from "../dto/response/UpdatePasswordResponseDTO";
import OauthConsentUserRequestDTO from "../dto/request/OauthConsentUserRequestDTO";
import UserDetailsListDTO, { UserDetailsDTO } from "../dto/response/UserDetailsListDTO";
import { UserDetailsQueryParams } from "../service/UserBasicServiceUtils";
import UpdateUserDetailsRequestDTO from "../dto/request/UpdateUserDetailsRequestDTO";
import GenericConstants from "../../../const/GenericConstants";
import UpdateUserPasswordRequestDTO from "../dto/request/UpdateUserPasswordRequestDTO";
import UpdateUserResponseDTO from "../dto/response/UpdateUserResponseDTO";
import UpdateUserPasswordResponseDTO from "../dto/response/UpdateUserPasswordResponseDTO";
import BasicResponseDTO from "../../course/dto/response/BasicResponseDTO";
import { IsBase64, IsString } from "class-validator";
import { ReadStream } from "fs";
import { Readable } from 'stream';
import GoogleDriveServiceUtils from "../../../utils/google/GoogleDriveServiceUtils";

class Test{
    @IsBase64() @IsString() image: string
}
@ApiTags('User Management')
@ApiBadRequestResponse({ description: "Bad request response", status: 400, type: BadRequestResponseDTO })
@ApiCreatedResponse({ status: 200 })
@ApiInternalServerErrorResponse({ description: "Server error",  type: InternalServerErrorResponseDTO })
@Controller(UserApiPaths.USER_BASE_API)
export default class UserController
{
    logger = LoggerFactory.createLogger(UserController.name);
    constructor(private readonly userService: UserService) {}

    @Post(UserApiPaths.USER_BASIC_SIGN_UP)
    @ApiOperation({ description: "This API is used to sign-up a new user into the application. An OTP will be sent automatically to the user's email address for verification."})
    @ApiOkResponse({description: "Successful response", status: 200, type: CreateUserResponseDTO})
    @ApiCreatedResponse({description: "Successful response", status: 201, type: CreateUserResponseDTO})
    async handleSignUpUserRequest(@Req() req: Request, @Res() res: Response, @Body() requestDTO: CreateUserRequestDTO)
    {
        const serviceResponse: ResponseDTO = await this.userService.createUserBasic(req.url, requestDTO);
        return ResponseDispatcher.respond(res, serviceResponse);
    }

    @Post(UserApiPaths.USER_BASIC_LOGIN)
    @ApiOperation({ description: "This API is used to log a user into the application. The API returns the user's login response data on successful handshake. " })
    @ApiOkResponse({description: "Successful response", status: 200, type: LoginUserResponseDTO})
    @ApiCreatedResponse({description: "Successful response", status: 201, type: LoginUserResponseDTO})
    async handleUserLoginRequest(@Req() req: Request, @Res() res: Response, @Body() loginRequest: LoginUserRequestDTO)
    {
        const serviceResponse: ResponseDTO = await this.userService.loginUserBasic(req.url, loginRequest);
        return ResponseDispatcher.respond(res, serviceResponse);
    }

    @ApiOperation({ description: "This API is used to log in a user that has enabled the 'RememberMe feature'. Here, only the deviceId is required to track the last logged-in user. WEB channel is forbidden to call this endpoint as they are obliged to use Cookies to maintain user sessions." })
    @ApiOkResponse({ description: "Successful response", type: LoginUserResponseDTO } )
    @ApiCreatedResponse({ description: "Successful response", type: LoginUserResponseDTO } )
    @Post(UserApiPaths.USER_BASIC_AUTOMATIC_LOGIN)
    async handleAutomaticUserLoginRequest(@Req() req: Request, @Res() res: Response, @Body() automaticLoginRequest: AutomaticLoginRequestDTO)
    {
        const serviceResponse: ResponseDTO = await this.userService.loginUserAutomatic(req.url, automaticLoginRequest);
        return ResponseDispatcher.respond(res, serviceResponse);
    }

    @Post(UserApiPaths.USER_VALID_OTP)
    @ApiOperation({ description: "This API is used to validate the OTP sent to the user at sign-up stage. "})
    @ApiOkResponse({description: "Successful response", status: 200, type: ValidateOtpResponseDTO})
    @ApiCreatedResponse({description: "Successful response", status: 201, type: ValidateOtpResponseDTO})
    async handleOtpValidation(@Req() req: Request, @Res() res: Response, @Body() requestDTO: ValidateOtpRequestDTO)
    {
        const serviceResponse: ResponseDTO = await this.userService.validateOtp(req.url, requestDTO);
        return ResponseDispatcher.respond(res, serviceResponse);
    }

    @ApiExcludeEndpoint()
    @Get(UserApiPaths.USER_PASSWORD_RESET_PAGE_REQUEST)
    async sendPasswordEmail(@Req() req: Request, @Res() res: Response, @Query('email') email: string)
    {
        const serviceResponse: ResponseDTO = await this.userService.sendResetPasswordMail(req.url, email);
        return ResponseDispatcher.respond(res, serviceResponse);
    }

    @ApiExcludeEndpoint()
    @Get(UserApiPaths.USER_PASSWORD_RESET_PAGE)
    async handleShowResetPasswordPage(@Req() req: Request, @Res() res: Response, @Query('x-mail-id') encodedEmail: string)
    {
        // Store the email encoded in a cookie in the response object to user.
        const encodedMailKey: string = Buffer.from('x-mail-id').toString('base64');
        res.cookie(encodedMailKey, encodedEmail);

        const serviceResponse: string = await this.userService.sendResetPasswordPage(req.url, encodedEmail);
        return res.status(200).send(serviceResponse).contentType("text/html");
    }

    @ApiExcludeEndpoint()
    @Post(UserApiPaths.USER_PASSWORD_NEW_SUBMIT)
    async handlePasswordChangeSubmit(@Req() req: Request, @Res() res: Response, @Body() requestBody)
    {
        console.log("Request Body: " + requestBody);
        return res.status(200).json(requestBody);
    }

    @ApiOperation({ description: "This API is used to get the Oauth2 authorization URL for a specified authorization provider. The currently supported providers are GOOGLE and FACEBOOK "})
    @ApiOkResponse({ description: "Successful operation", type: Oauth2ConsentUrlDTO })
    @Post(UserApiPaths.USER_OAUTH_CONSENT)
    async handleUserOauth2ConsentRequest(@Req() req: Request, @Res() res: Response, @Body() requestDTO: OauthConsentUserRequestDTO){
        const serviceResponse: ResponseDTO = await this.userService.getOauth2UserConsentUrl(req.url, requestDTO);
        return ResponseDispatcher.respond(res, serviceResponse);
    }

    @ApiOperation({ description: "This API is called when a user has consented to an Oauth2 authorization server for access by this application. The API will provide the login response of the user for display on the user's dashboard." })
    @ApiOkResponse({ description: "Successful response", type: LoginUserResponseDTO })
    @Post(UserApiPaths.USER_OAUTH_CONSENT_VALIDATION)
    async handleUserOauth2ConsentValidation(@Req() req, @Res() res: Response, @Body() requestDTO: Oauth2ValidateUserRequestDTO)
    {
        const serviceResponse: ResponseDTO = await this.userService.validateOauth2User(req.url, requestDTO);
        return ResponseDispatcher.respond(res, serviceResponse);
    }

    @ApiOperation({ description: "This API is used to send a sign-up OTP to a user for email verification. This APi should only be called when in the rare case, the user did not receive an OTP automatically at sign-up time." })
    @ApiOkResponse({ description: "Successful response", type: ResponseDTO })
    @Get(UserApiPaths.USER_SEND_OTP)
    async handleSendOtpRequest(@Req() req: Request, @Res() res: Response, @Query("emailAddress") email: string)
    {
        const serviceResponse: ResponseDTO = await this.userService.sendVerificationOtp(req.url, email);
        return ResponseDispatcher.respond(res, serviceResponse);
    }

    @ApiExcludeEndpoint()
    @Get("/oauth2/consent-signup")
    async handleConsent(@Res() res: Response, @Query('code') code: string, @Query('state') state: string)
    {
        return res.status(200).json({ code: code, state: state });
    }

    // PASSWORD
    @ApiOperation({ description: "This API is used to request for a password reset OTP. The OTP will be sent to the user's specified email address" })
    @ApiOkResponse({ description: "Successful response", status: 200, type: ResponseDTO })
    @Get(UserApiPaths.USER_PASSWORD_MOBILE_RESET_MAIL_REQUEST)
    async handleMobilePasswordResetRequest(@Req() req: Request, @Res() res: Response, @Query('email') email: string)
    {
        const serviceResponse: ResponseDTO = await this.userService.sendPasswordResetMailForMobile(req.url, email);
        return ResponseDispatcher.respond(res, serviceResponse);
    }

    @ApiOperation({description: "This API is used to validate the OTP sent to a user via mail for the sake of password reset." })
    @ApiOkResponse({ description: "Successful response", status: 200, type: ValidateOtpResponseDTO })
    @Post(UserApiPaths.USER_PASSWORD_RESET_OTP_VALIDATION)
    async handleOtpForMobilePasswordReset(@Req() req: Request, @Res() res: Response, @Body() requestDTO: ValidateOtpRequestDTO)
    {
        const serviceResponse: ResponseDTO = await this.userService.validateForgetPasswordOTPForMobile(req.url, requestDTO);
        return ResponseDispatcher.respond(res, serviceResponse);
    }

    @ApiOperation({description: "This API is used to update the Password of a user that has verified Password reset otp." })
    @ApiOkResponse({ description: "Successful response", status: 200, type: UpdatePasswordResponseDTO })
    @Post(UserApiPaths.USER_PASSWORD_RESET_SUBMIT_REQUEST)
    async handleUpdateOfMobilePassword(@Req() req: Request, @Res() res: Response, @Body() requestDTO: UpdatePasswordRequestDTO)
    {
        const serviceResponse: ResponseDTO = await this.userService.updateUserPasswordForMobile(req.url, requestDTO);
        return ResponseDispatcher.respond(res, serviceResponse);
    }

    @ApiOperation({ description: "This API is used to fetch a list of user details" })
    @ApiOkResponse({ description: "Successful response", status: 200, type: UserDetailsListDTO })
    @ApiQuery({ name: "status", required: false, type: String })
    @ApiQuery({ name: "roles", required: false, type: String })
    @Get(UserApiPaths.USER_GET_ALL)
    async handleUserDetailsRequest(@Req() req: Request, @Res() res: Response)
    {
        const [ status, userRoleString ]: Array<string>  = [ req.query['status'] as string, req.query['roles'] as string ] as Array<string>;
        const query: UserDetailsQueryParams = { status: status, roles: userRoleString };
        const serviceResponse: ResponseDTO = await this.userService.getAllUserDetails(req.url, query);
        return ResponseDispatcher.respond(res, serviceResponse);
    }

    @ApiOperation({ description: "This API is used to fetch the details of a single user." })
    @ApiOkResponse({ description: "Success response", status: 200,  type: UserDetailsDTO })
    @Get(UserApiPaths.USER_GET_SINGLE)
    async handleGetSingleUserDetailsRequest(@Req() req, @Res() res, @Query("email") email: string)
    {
        const serviceResponse: ResponseDTO = await this.userService.getSingleUserByEmail(req.url, email);
        return ResponseDispatcher.respond(res, serviceResponse);
    }

    @Post(UserApiPaths.USER_DETAILS_UPDATE)
    @ApiOkResponse( { description: "Successful response", status: 200, type: UpdateUserResponseDTO })
    @ApiHeader({ name: "Authorization", description: "Authorization bearer token", required: true })
    async handleUserDetailsUpdate(@Req() req: Request, @Res() res: Response, @Body() requestDTO: UpdateUserDetailsRequestDTO){
        const token: string = this.getAuthToken(req);
        const serviceResponse: ResponseDTO = await this.userService.updateUserDetails(req.url, token, requestDTO);
        return ResponseDispatcher.respond(res, serviceResponse);
    }

    @Post(UserApiPaths.USER_PASSWORD_UPDATE)
    @ApiOkResponse({ description: "Successful response", status: 200, type: UpdateUserPasswordResponseDTO })
    @ApiHeader({ name: "Authorization", description: "Authorization bearer token", required: true })
    async handleUserPasswordUpdate(@Req() req: Request, @Res() res: Response, @Body() requestDTO: UpdateUserPasswordRequestDTO){
        const authToken: string = this.getAuthToken(req);
        const serviceResponse: ResponseDTO = await this.userService.updateUserPassword(req.url, authToken, requestDTO);
        return ResponseDispatcher.respond(res, serviceResponse);
    }

    @Get(UserApiPaths.USER_LOG_OUT)
    @ApiOperation({ description: "This API is used to logout a user from the system. Also the password is no more remembered after this endpoint is called for the user."})
    @ApiOkResponse({ description: "Successful response", status: 200, type: BasicResponseDTO })
    @ApiHeader({ name: "Authorization", description: "Authorization bearer token", required: true })
    async handleUserLogout(@Req() req: Request, @Res() res: Response){
        const authToken: string = this.getAuthToken(req);
        const serviceResponse: ResponseDTO = await this.userService.logoutUser(req.url, authToken);
        return ResponseDispatcher.respond(res, serviceResponse);
    }

    private getAuthToken = (request: Request): string => {
        const authHeader: string = request.get(GenericConstants.AUTH_HEADER) || GenericConstants.EMPTY_STRING;
        const token: string = authHeader.replace("Bearer ", GenericConstants.EMPTY_STRING);
        return token.trim();
    }
}
