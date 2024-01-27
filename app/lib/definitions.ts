import { type BlocksContent } from '@strapi/blocks-react-renderer';

export interface Article {
    id: number;
    attributes: {
        heading: string;
        content: BlocksContent;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        slug: string;
        image?: {
            [key: string]: any;
        };
        author?:      Author;
        categories?:  Categories;
        comments?:    Comments;
    };
}

export interface Author {
    data: {
        id:         number;
        attributes: {
            name: string;
        }
    } | null;
}

export interface Categories {
    data: {
        id:         number;
        attributes: CategoryAttributes;
    }[];
}

export interface CategoryAttributes {
    name:       string;
    slug:       string;
}

export interface Comments {
    data: {
        id:         number;
        attributes: CommentAttributes;
    }[];
}

export interface CommentAttributes {
    text:       string;
    author:     string;
    updatedAt:  string;
}

export interface Pagination {
    page: number;
	pageSize: number;
	pageCount: number;
	total: number;
}

export interface ArticlesResponse {
    data?: Article[];
    meta?: {
        pagination: Pagination;
    };
    error?: Error;
}

export interface SingleArticleResponse {
    data?: Article;
    meta: {};
    error?: Error;
}

export interface UserResponse {
    jwt:  string;
    user: User;
}

export interface UserData {
    username:  string;
    email: string;
    password?: string;
}

export interface User extends UserData {
    id:        number;
    provider?:  string;
    confirmed?: boolean;
    blocked?:   boolean;
    createdAt?: Date;
    updatedAt?: Date;
    avatar?:    string;
}
export interface ArticleData {
    id: number;
    slug: string;
}