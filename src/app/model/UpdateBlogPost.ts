export interface UpdateBlogPost {
    title: string;
    urlHandle: string;
    shortDescription: string;
    content: string;
    featuredImgUrl: string;
    author: string;
    publishedDate: Date;
    isVisible: boolean;
    categories: string[]; // Assuming categories are strings, adjust as needed
}