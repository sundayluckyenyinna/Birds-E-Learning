/* eslint-disable */

import { ApiProperty } from "@nestjs/swagger";
import BlUserPreference from "../../model/BlUserPreference";

export default class CreateUserPreferenceResponseDTO{
    @ApiProperty() responseCode: string;
    @ApiProperty() responseMessage: string;
    @ApiProperty() responseData: BlUserPreference;
}