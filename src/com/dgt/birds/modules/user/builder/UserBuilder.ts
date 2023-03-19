/* eslint-disable */

import User from "../model/User";

export default class UserBuilder
{
  private user: User = new User();

  userId = (value: string) => { this.user.userId = value; return this; }
  name = (value: string) => { this.user.name = value; return this; }
  firstName = (value: string) => { this.user.firstName = value; return this; }
  lastName = (value: string) => { this.user.lastName = value; return this; }
  middleName = (value: string) => { this.user.middleName = value; return this; }
  emailAddress = (value: string) => { this.user.emailAddress = value; return this; }
  emailVerifiedAt = (value: Date) => { this.user.emailVerifiedAt = value; return this; }
  password = (value: string) => { this.user.password = value; return this; }
  address = (value: string) => { this.user.address = value; return this; }
  address2 = (value: string) => { this.user.address2 = value; return this; }
  mobileNumber = (value: string) => { this.user.mobileNumber = value; return this; }
  dateOfBirth = (value: string) => { this.user.dateOfBirth = value; return this; }
  city = (value: string) => { this.user.city = value; return this; }
  state = (value: string) => { this.user.state = value; return this; }
  country = (value: string) => { this.user.country = value; return this; }
  zipCode = (value: number) => { this.user.zipCode = value; return this; }
  lastLoginDate = (value: Date) => { this.user.lastLoginDate = value; return this; }
  avatarId = (value: number) => { this.user.avatarId = value; return this; }
  bio = (value: string) => { this.user.bio = value; return this; }
  status = (value: string) => { this.user.status = value; return this; }
  creatUser = (value: number) => { this.user.createUser = value; return this; }
  updateUser = (value: number) => { this.user.updateUser = value; return this; }
  vendorCommissionAmount = (value: number) => { this.user.vendorCommissionAmount = value; return this; }
  vendorCommissionType = (value: string) => { this.user.vendorCommissionType = value; return this; }
  education = (value: Array<Education>) => { this.user.education = value; return this; }
  experience = (value: Array<Experience>) => { this.user.experience = value; return this; }
  socialMedia = (value: object) => { this.user.socialMedia = value; return this; }
  billingFirstName = (value: string) => { this.user.billingFirstName = value; return this; }
  billingLastName = (value: string) => { this.user.billingLastName = value; return this; }
  billingAddress = (value: string) => { this.user.billingAddress = value; return this; }
  billingAddress2 = (value: string) => { this.user.billingAddress2 = value; return this; }
  billingPhone = (value: string) => { this.user.billingPhone = value; return this; }
  billingCity = (value: string) => { this.user.billingCity = value; return this; }
  billingState = (value: string) => { this.user.billingState = value; return this; }
  billingCountry = (value: string) => { this.user.billingCountry = value; return this; }
  billingZipCode = (value: number) => { this.user.billingZipCode = value; return this; }
  deletedAt = (value: Date) => { this.user.deletedAt = value; return this; }
  authToken = (value: string) => { this.user.authToken = value; return this; }
  createdAt = (value: Date) => { this.user.createdAt = value; return this; }
  updatedAt = (value: Date) => { this.user.updatedAt = value; return this; }
  paymentGateway = (value: string) => { this.user.paymentGateway = value; return this; }
  totalGuest = (value: number) => { this.user.totalGuest = value; return this; }
  verifySubmitStatus = (value: string) => { this.user.verifySubmitStatus = value; return this; }
  isVerified = (value: boolean) => { this.user.isVerified = value; return this; }
  businessName = (value: string) => { this.user.businessName = value; return this; }
  locale = (value: string) => { this.user.locale = value; return this; }
  userRoles = (value: Array<string>) => { this.user.userRoles = value; return this; }
  username = (value: string) => { this.user.username = value; return this; }
  photoLink = (value: string) => { this.user.photoLink = value; return this; }
  createdBy = (value: string) => { this.user.createdBy = value; return this; }
  modifiedBy = (value: string) => { this.user.modifiedBy = value; return this; }
  deviceId = (value: string) => { this.user.deviceId = value; return this; }
  geoLocation = (value: string) => { this.user.geoLocation = value; return this; }
  loginAttempt = (value: number) => { this.user.loginAttempt = value; return this; }
  gender = (value: string) => { this.user.gender = value; return this; }
  channel = (value: string) => { this.user.channel = value; return this; }
  authTokenCreatedDate = (value: Date) => { this.user.authTokenCreatedDate = value; return this; }
  authTokenExpirationDate = (value: Date) => { this.user.authTokenExpirationDate = value; return this; }
  otp = (value: string) => { this.user.otp = value; return this; }
  otpCreatedDate = (value: Date) => { this.user.otpCreatedDate = value; return this; };
  otpExpDate = (value: Date) => { this.user.otpExpDate = value; return this; };
  isOtpVerified = (value: boolean) => { this.user.isOtpVerified = value; return this; };
  oauth2Channel = (value: string) => { this.user.oauth2Channel = value; return this; }
  oauth2AccessToken = (value: string) => { this.user.oauth2AccessToken = value; return this; };
  oauth2RefreshToken =(value: string) => { this.user.oauth2RefreshToken = value; return this; };
  oauth2Scope = (value: string) => { this.user.oauth2Scope = value; return this; }
  oauth2TokenType = (value: string) => { this.user.oauth2TokenType = value; return this; };
  oauth2IdToken = (value: string) => { this.user.oauth2IdToken = value; return this; };
  oauth2UserId = (value: string) => { this.user.oauth2UserId = value; return this; };
  rememberMeActive = (value: boolean) => { this.user.rememberMeActive = true; return this; };
  rememberMeCreatedDate = (value: Date) => { this.user.rememberMeCreatedDate = value; return this; };
  rememberMeExpDate = (value: Date) => { this.user.rememberMeExpDate = value; return this; };
  build = () => this.user;
}

export interface Education{
  from: string,
  to: string,
  location: string,
  reward: string
}

export interface Experience{
  from: string,
  to: string,
  location: string,
  position: string
}