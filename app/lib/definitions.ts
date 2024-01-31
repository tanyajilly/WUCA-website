import { type BlocksContent } from '@strapi/blocks-react-renderer';

export interface Article {
    id: number;
    attributes: {
        basicArticleData: {
            id: number;
            title: string;
            description: string;
            image?: {
                [key: string]: any;
            };
            author: Author;
        }
        pageContent: BlocksContent;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        slug: string;
        categories?:  Categories;
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

export interface ArticleData {
    id: number;
    slug: string;
}

export interface NavigationItem {
    id: number;
    title: string;
    type: 'INTERNAL' | 'EXTERNAL';
    path: string;
    externalPath: string | null;
    menuAttached: boolean;
    collapsed: boolean;
    parent: NavigationItem | null;
    items: NavigationItem[] | null;
}

interface StrapiBaseImage {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    width: number;
    height: number;
    size: number;
    url: string;
  }

  interface StrapiImageFormat extends StrapiBaseImage {
    path: null | string;
  }
  
  interface StrapiImageAttributes extends StrapiBaseImage {
    alternativeText: string;
    caption: string;
    formats: {
      thumbnail?: StrapiImageFormat;
      small?: StrapiImageFormat;
      medium?: StrapiImageFormat;
      large?: StrapiImageFormat;
    };
    previewUrl: null | string;
    provider: string;
    provider_metadata: null | any; // Adjust based on your provider metadata structure
  }
  
  export interface StrapiImage {
    data: {
        id: number;
        attributes: StrapiImageAttributes;
    }
  }
