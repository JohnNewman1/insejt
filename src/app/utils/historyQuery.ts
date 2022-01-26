import { HistoryItem, OrderBy } from "../types";


export const excludeUrl = (history: HistoryItem[], url: string): HistoryItem[] => {
    const includesUrl = new RegExp(url)
    return history.filter(item => !includesUrl.test(item.url))
}

export const sortBy = (history: HistoryItem[], key: string, order: OrderBy = 'asc'): HistoryItem[] => {
    const newHistory = [...history]; 
    if (order === 'asc') {
        return newHistory.sort((a,b) => (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0))
    }

    return newHistory.sort((a,b) => (a[key] < b[key]) ? 1 : ((b[key] < a[key]) ? -1 : 0))
}