import { TRequestParams, TResponse } from "./global";

export interface ArticleList {
    id: number;
    title: string;
    author: string;
    cover: string;
    sort: number;
    user_id: string;
    status: 0 | 1;
    recommend_flag: boolean;
    commented_flag: boolean;
    created_at: string;
    updated_at: string;
    view_count: number;
    comment_count: number;
    collection_count: number;
    zan_count: number;
    share_count: number;
    last_commented_at: string;
    source: string;
    source_url: string;
    keyword: Array<string | number>;
    category: Array<any>;
}

export interface ArticleListParams extends TRequestParams {
    page: number;
    size: number;
}

export interface ArticleListResponse extends TResponse {
    list: ArticleList[];
    total: number;
    current_page: number;
    last_page: number;
    size: number;
    prev_page_url: string | null;
    next_page_url: string | null;
}

export interface ArticleCategoryList {
    id: string;
    pid: string;
    name: string;
    sort: number;
    status: number;
    created_at: number;
    updated_at: number;
    article_count: number;
}

export interface ArticleCategoryListResponse {
    list: ArticleCategoryList[];
    count: number;
}

export interface ArticleCategoryListSelect {
    id: string;
    pid: string;
    name: string;
    sort: number;
    status: number;
    created_at: number;
    updated_at: number;
}

export interface ArticleCategoryListSelectResponse {
    list: ArticleCategoryListSelect[];
}

export interface ArticleAddParams {
    user_id: number;
    title: string;
    author: string;
    summary: string;
    cover: string;
    sort: number;
    recommend_flag: boolean;
    commented_flag: boolean;
    status: number;
    source: string;
    source_url: string;
    content: string;
    keyword: any;
    attachment_path: any;
    category: any;
}

export interface ArticleAddResponse {
    id: string;
}

export interface ArticleInfoResponse {
    id: number;
    title: string;
    author: string;
    cover: string;
    summary: string;
    sort: number;
    user_id: string;
    status: 0 | 1;
    recommend_flag: boolean;
    commented_flag: boolean;
    created_at: string;
    updated_at: string;
    view_count: number;
    comment_count: number;
    collection_count: number;
    zan_count: number;
    share_count: number;
    last_commented_at: string;
    source: string;
    source_url: string;
    content: string;
    keyword: Array<string | number>;
    attachment_path: Array<string>;
    category: Array<any>;
}