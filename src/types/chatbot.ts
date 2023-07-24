import { TRequestParams, TResponse } from "./global";

export interface ChatbotList {
    id: number;
    name: string;
    parent: object;
    icon: string;
    describe: string;
    question: string;
    sort: number;
    status: 0 | 1;
    created_at: string;
    updated_at: string;
}

export interface ChatbotListParams extends TRequestParams {
    page: number;
    size: number;
}

export interface ChatbotListResponse extends TResponse {
    list: ChatbotList[];
    total: number;
    current_page: number;
    last_page: number;
    size: number;
    prev_page_url: string | null;
    next_page_url: string | null;
}

export interface ChatbotListSelect {
    id: string;
    pid: string;
    name: string;
    icon: string;
    describe: string;
    question: string;
    sort: number;
    status: number;
    created_at: number;
    updated_at: number;
}

export interface ChatbotListSelectResponse {
    list: ChatbotListSelect[];
}

export interface ChatbotAddOrUpdateParams {
    name: string;
    pid: number;
    icon: string;
    describe: string;
    question: string;
    sort: number;
    status: number;
}

export interface ChatbotAddOrUpdateResponse {
    id: string;
}