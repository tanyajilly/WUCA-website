import { type BlocksContent } from "@strapi/blocks-react-renderer";

export interface Article {
    id: number;
    attributes: {
        title: string;
        description: string;
        image?: {
            [key: string]: any;
        };
        author: Author;
        pageContent: BlocksContent;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        slug: string;
        categories?: Categories;
    };
    articleType?: "articles" | "facts";
}

export interface Author {
    data: {
        id: number;
        attributes: {
            name: string;
        };
    } | null;
}

export interface Categories {
    data: {
        id: number;
        attributes: CategoryAttributes;
    }[];
}

export interface CategoryAttributes {
    name: string;
    slug: string;
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
    type: "INTERNAL" | "EXTERNAL" | "WRAPPER";
    path: string;
    external: boolean;
    menuAttached: boolean;
    collapsed: boolean;
    parent: NavigationItem | null;
    items: NavigationItem[];
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

interface StrapiMediaFormat extends StrapiBaseImage {
    path: null | string;
}

interface StrapiMediaAttributes extends StrapiBaseImage {
    alternativeText: string;
    caption: string;
    formats?: {
        thumbnail?: StrapiMediaFormat;
        small?: StrapiMediaFormat;
        medium?: StrapiMediaFormat;
        large?: StrapiMediaFormat;
    };
    previewUrl: string | undefined;
    provider: string;
    provider_metadata: null | any; // Adjust based on your provider metadata structure
}

export interface StrapiMedia {
    data: {
        id: number;
        attributes: StrapiMediaAttributes;
    };
}

export interface Page {
    id: number;
    attributes: {
        name: string;
        pageContent: BlocksContent;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        slug: string;
    };
}

export interface SinglePageResponse {
    data?: Page;
    meta: {};
    error?: Error;
}

export type DayOfWeek =
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday";

export const dayOfWeekMap: { [key in DayOfWeek]: number } = {
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
    Sunday: 0,
};

export interface Event {
    id: number;
    attributes: {
        title: string;
        description: string;
        image?: {
            [key: string]: any;
        };
        pageContent: BlocksContent;
        slug: string;
        startDate: string;
        endDate?: string;
        startTime?: string;
        endTime?: string;
        location: string;
        isRepeatable: boolean;
        repeatFrequency?: "weekly" | "biweekly";
        dayOfWeek?: DayOfWeek;
    };
}

export interface EventsResponse {
    data?: Event[];
    meta?: {
        pagination: Pagination;
    };
    error?: Error;
}

export interface SingleEventResponse {
    data?: Event;
    meta: {};
    error?: Error;
}

export interface AccordionData {
    id: number;
    attributes: {
        question: string;
        answer: string;
    };
}
