export declare class CreatePostDto {
    title: string;
    content: string;
    summary: string;
    thumbnail?: string;
    referencePlace?: string;
    images?: string;
    attachFiles?: string;
    categoryId: number;
    subcategoryId?: number;
}
