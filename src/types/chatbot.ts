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
