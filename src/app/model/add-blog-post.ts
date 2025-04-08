import { Category } from "./Category";

export interface AddBlogPost {
    title: string;
    urlHandle: string;
    shortDescription: string;
    content: string;
    featuredImgUrl: string;
    author: string;
    publishedDate: Date;
    isVisible: boolean;
    selectedCategories: string[]; // Assuming categories are strings, adjust as needed
}