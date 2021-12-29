export type ChromeHistoryItem = chrome.history.HistoryItem;

export type ChromeVisitItem = chrome.history.VisitItem;
export type Url = chrome.history.Url;

export interface HistoryItem {
    id: string;
    lastVisitTime?: number;
    title?: string;
    url?: string;
    typedCount?: number;
    visitCount?: number;
    visits?: ChromeVisitItem[];
}

export interface VisitItem {
    id: number
    historyItemId: string;
    transition: string
    visitTime: number;
    referringVisitId?: number
    referrerDetails?: string 
}

