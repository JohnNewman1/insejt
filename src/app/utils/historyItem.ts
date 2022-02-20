import { ChromeHistoryItem, ChromeVisitItem, HistoryItem } from "../types";

export const transformChromeHistoryItem = (historyItem: ChromeHistoryItem, visits): HistoryItem => { 
	return {
		id: historyItem.id,
		lastVisitTime: historyItem.lastVisitTime,
		title: historyItem.title,
		url: historyItem.url,
		typedCount: historyItem.typedCount,
		visitCount: historyItem.visitCount,
		visits,
	};
}

export const findReferrerHistoryItem = (history: HistoryItem[], visits: ChromeVisitItem[], reffererId: string): HistoryItem => {
	const historyItemId = visits.find(visit => visit.visitId === reffererId).id;
	if (!historyItemId) return;

	return history.find(historyItem => historyItem.id === historyItemId);
}