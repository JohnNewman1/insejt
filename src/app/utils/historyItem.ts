import { ChromeHistoryItem, HistoryItem, VisitItem } from "../types";

export const transformChromeHistoryItem = (historyItem: ChromeHistoryItem): HistoryItem => { 
      return {
        id: historyItem.id,
        lastVisitTime: historyItem.lastVisitTime,
        title: historyItem.title,
        url: historyItem.url,
        typedCount: historyItem.typedCount,
        visitCount: historyItem.visitCount,
      };
}

export const findHistoryItemFromVisitId = (history: HistoryItem[], visits: VisitItem[], visitId: number): HistoryItem => {
    const historyItemId = visits.find(visit => visit.referringVisitId === visitId).historyItemId;
    if (!historyItemId) return;

    return history.find(historyItem => historyItem.id === historyItemId);
}