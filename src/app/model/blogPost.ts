import { Category } from "./Category";

export interface BlogPost {
    id: any;
    title: string;
    urlHandle: string;
    shortDescription: string;
    content: string;
    featuredImgUrl: string;
    author: string;
    publishedDate: Date;
    isVisible: boolean;
    categories: Category[];
}