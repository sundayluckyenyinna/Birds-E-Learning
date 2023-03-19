import BlCourse from "./BlCourse";
export default class BravoCourseCategory {
    id: number;
    name: string;
    imageId: number;
    content: string;
    slug: string;
    status: string;
    _lft: number;
    _rgt: number;
    parentId: number;
    createUser: number;
    updateUser: number;
    deletedAt: Date;
    originId: number;
    lang: string;
    createdAt: Date;
    updatedAt: Date;
    courses: Array<BlCourse>;
}
