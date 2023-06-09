import BlCourseLesson from "./BlCourseLesson";
export default class BlCourse {
    id: number;
    title: string;
    slug: string;
    content: string;
    imageId: number;
    bannerImageId: number;
    shortDesc: string;
    categoryId: number;
    isFeatured: boolean;
    gallery: string;
    video: string;
    price: number;
    salePrice: string;
    duration: number;
    faqs: string;
    status: string;
    publishDate: Date;
    createUser: number;
    updateUser: number;
    deletedAt: Date;
    views: number;
    createdAt: Date;
    updatedAt: Date;
    defaultState: number;
    reviewScore: number;
    include: string;
    exclude: string;
    itinerary: string;
    lessons: Array<BlCourseLesson>;
}
