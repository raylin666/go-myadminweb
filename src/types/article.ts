import { TRequestParams, TResponse } from "./global";

export interface ArticleList {
    id: number | string;
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

export interface ArticleAddOrUpdateParams {
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

export interface ArticleAddOrUpdateResponse {
    id: number | string;
}

export interface ArticleInfoResponse {
    id: number | string;
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

export interface ArticleCategoryList {
    id: number | string;
    pid: string;
    name: string;
    sort: number;
    status: number;
    created_at: number;
    updated_at: number;
    article_count: number;
}

export interface ArticleCategoryParams extends TRequestParams {
    page: number;
    size: number;
}

export interface ArticleCategoryListResponse extends TResponse {
    list: ArticleCategoryList[];
}

export interface ArticleCategoryListSelect {
    id: string | number;
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

export interface ArticleCategoryInfoResponse {
    id: number | string;
    name: string;
    pid: number;
    color: string;
    cover: string;
    sort: number;
    status: number;
    created_at: string;
    updated_at: string;
}

export interface ArticleCategoryAddOrUpdateParams {
    name: string;
    pid: number;
    cover: string;
    color: string;
    sort: number;
    status: number;
}

export interface ArticleCategoryAddOrUpdateResponse {
    id: string | number;
}