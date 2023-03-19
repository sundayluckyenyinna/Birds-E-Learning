export declare class CourseCategoryData {
    name: string;
    imageId: number;
    content: string;
    slug: string;
    status: string;
    language: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare class CourseCategoryListResponseDTO {
    responseCode: string;
    responseMessage: string;
    responseData: Array<CourseCategoryData>;
}
