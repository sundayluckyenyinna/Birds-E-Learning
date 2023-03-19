/* eslint-disable */

import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { UserStatus } from "../constants/UserStatus";
import UserBuilder, { Education, Experience } from "../builder/UserBuilder";
import UserAuth from "./UserAuth";
import { Exclude } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

/**
 * This class provides the implementation of the entity class that will be mapped directly to the User table in
 *  the database.
 */


@Entity({ name: "users" })
export default class User
{
   @PrimaryGeneratedColumn({name: "id", type: "bigint"}) @Exclude()
   id: number

   @Column({name: "user_id", type: "uuid"}) @ApiProperty()
   userId: string

  @Column({name: "name", type: "varchar" }) @ApiProperty()
  name: string;

  @Column({name: "first_name", type: "varchar"}) @ApiProperty()
  firstName: string

  @Column({name: "last_name", type: "varchar"}) @ApiProperty()
  lastName: string

  @Column({name: "middle_name", type: "varchar"}) @ApiProperty()
  middleName: string

  @Column({name: "email", type: "varchar" }) @ApiProperty()
  emailAddress: string

  @Column({ name: "email_verified_at", type: "datetime" }) @ApiProperty()
  emailVerifiedAt: Date;

  @Column({name: "password", type: "varchar"}) @ApiProperty()
  password: string

  @Column({name: "address", type: "varchar" }) @ApiProperty()
  address: string

  @Column({name: "address2", type: "varchar" }) @ApiProperty()
  address2: string

  @Column({name: "phone", type: "varchar" }) @ApiProperty()
  mobileNumber: string

  @Column({name: "birthday", type: "varchar" }) @ApiProperty()
  dateOfBirth: string

  @Column({name: "city", type: "varchar" }) @ApiProperty()
  city: string

  @Column({ name: "state", type: "varchar" }) @ApiProperty()
  state: string;

  @Column({name: "country", type: "varchar" }) @ApiProperty()
  country: string

  @Column({ name: "zip_code", type: "bigint" }) @ApiProperty()
  zipCode: number;

  @Column({name: "last_login_at", type: "datetime" }) @ApiProperty()
  lastLoginDate: Date

  @Column({ name: "avatar_id", type: "bigint" }) @ApiProperty()
  avatarId: number;

  @Column({ name: "bio", type: "longtext" }) @ApiProperty()
  bio: string;

  @Column({name: "status", type: "varchar", default: UserStatus.UNVERIFIED }) @ApiProperty()
  status: string

  @Column({ name: "create_user", type: "int" }) @ApiProperty()
  createUser: number;

  @Column({ name: "update_user", type: "int" }) @ApiProperty()
  updateUser: number;

  @Column({ name: "vendor_commission_amount", type: "int" }) @ApiProperty()
  vendorCommissionAmount: number;

  @Column({ name: "vendor_commission_type", type: "varchar" }) @ApiProperty()
  vendorCommissionType: string;

  @Column({ name: "education", type: "simple-array" }) @ApiProperty()
  education: Array<Education>;

  @Column({ name: "experience", type: "simple-array"}) @ApiProperty()
  experience: Array<Experience>;

  @Column({ name: "social_media", type: "simple-json" }) @ApiProperty()
  socialMedia: Object;

  @Column({ name: "billing_first_name", type: "varchar" }) @ApiProperty()
  billingFirstName: string;

  @Column({ name: "billing_last_name", type: "varchar" }) @ApiProperty()
  billingLastName: string;

  @Column({ name: "billing_address", type: "varchar" }) @ApiProperty()
  billingAddress: string;

  @Column({ name: "billing_address2", type: "varchar" }) @ApiProperty()
  billingAddress2: string;

  @Column({ name: "billing_phone", type: "varchar" }) @ApiProperty()
  billingPhone: string;

  @Column({ name: "billing_city", type: "varchar" }) @ApiProperty()
  billingCity: string;

  @Column({ name: "billing_state", type: "varchar" }) @ApiProperty()
  billingState: string;

  @Column({ name: "billing_country", type: "varchar" }) @ApiProperty()
  billingCountry: string;

  @Column({ name: "billing_zip_code", type: "int" }) @ApiProperty()
  billingZipCode: number;

  @Column({ name:"deleted_at", type: "datetime" }) @ApiProperty()
  deletedAt: Date;

  @Column({ name: "remember_token", type: "longtext" }) @ApiProperty()
  authToken: string;

  @Column({ name: "created_at", type: "datetime" }) @ApiProperty()
  createdAt: Date

  @Column({ name: "updated_at", type: "datetime" }) @ApiProperty()
  updatedAt: Date;

  @Column({ name: "payment_gateway", type: "varchar" }) @ApiProperty()
  paymentGateway: string;

  @Column({ name: "total_guests", type: "int" }) @ApiProperty()
  totalGuest: number;

  @Column({ name: "verify_submit_status", type: "varchar" }) @ApiProperty()
  verifySubmitStatus: string;

  @Column({ name: "is_verified", type: "boolean" }) @ApiProperty()
  isVerified: boolean;

  @Column({ name: "business_name", type: "varchar" }) @ApiProperty()
  businessName: string;

  @Column({ name: "locale", type: "varchar" }) @ApiProperty()
  locale: string;

  @Column({ name: "user_roles", type: "simple-json" }) @ApiProperty()
  userRoles: Array<string>

  @Column({name: "username", type: "varchar" }) @ApiProperty()
  username: string

  @Column({name: "photo_link", type: "varchar"}) @ApiProperty()
  photoLink: string

  @Column({name: "created_by", type: "varchar"}) @ApiProperty()
  createdBy: string

  @Column({name: "modified_By", type: "varchar"}) @ApiProperty()
  modifiedBy: string

  @Column({name: "device_id", type: "varchar" }) @ApiProperty()
  deviceId: string

  @Column({name: "geo_location", type: "varchar" }) @ApiProperty()
  geoLocation: string

  @Column({name: "login_attempt", type: "int"}) @ApiProperty()
  loginAttempt: number

  @Column({name: "gender", type: "varchar" }) @ApiProperty()
  gender: string

  @Column({name: "channel", type: "varchar" }) @ApiProperty()
  channel: string

  @Column({name: "auth_token_created_at", type: "datetime", nullable: false})
  authTokenCreatedDate: Date;

  @Column({name: "auth_token_exp_at", type: "datetime", nullable: false})
  authTokenExpirationDate: Date;

  @Column({ name: "signup_otp", type: "longtext", nullable: false })
  otp: string

  @Column({ name: "otp_created_at", type: "datetime", nullable: false })
  otpCreatedDate: Date;

  @Column({ name: "otp_exp_at", type: "datetime", nullable: false })
  otpExpDate: Date;

  @Column({ name: "is_otp_verified", type: "boolean", default: false, nullable: false })
  isOtpVerified: boolean;

  @Column( {name: "oauth2_channel", type: "varchar", nullable: false})
  oauth2Channel: string;

  @Column({ name: "oauth2_access_token", type: "longtext", nullable: false})
  oauth2AccessToken: string;

  @Column({ name: "oauth2_refresh_token", type: "longtext", nullable: false})
  oauth2RefreshToken: string;

  @Column({ name: "oauth2_scope", type: "longtext"})
  oauth2Scope: string

  @Column({ name: "oauth2_token_type", type: "varchar" })
  oauth2TokenType: string;

  @Column({ name: "oauth2_id_token", type: "longtext" })
  oauth2IdToken: string;

  @Column({ name: "oauth2_user_id", type: "longtext" })
  oauth2UserId: string;

  @Column({ name: "remember_me_active", type: "boolean", default: null, nullable: undefined })
  rememberMeActive: boolean;

  @Column({ name: "remember_me_created_date", type: "datetime", nullable: true, default: undefined })
  rememberMeCreatedDate: Date;

  @Column({ name: "remember_me_exp_date", type: "datetime", nullable: true, default: undefined })
  rememberMeExpDate: Date;
  static builder = (): UserBuilder => new UserBuilder();
}