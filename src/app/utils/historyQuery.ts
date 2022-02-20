import { HistoryItem, OrderBy } from "../types";


export const excludeUrl = (history: HistoryItem[], urls: string[]): HistoryItem[] => {
	const includesUrl = new RegExp(`(${urls.join('|')})`);
	return history.filter(item => !includesUrl.test(item.url))
}
export const googleSearches = (history: HistoryItem[]): HistoryItem[][] => {
	const includesGoogle = /Google\sSearch/
	const googleSearches = history.filter(item => includesGoogle.test(item.title))
	return groupArrayOfObjects<HistoryItem>(googleSearches, 'title')
}

const groupArrayOfObjects = <T>(list: T[], key: string): T[][] => {
	return list.reduce((output, item) => {
		const indexOfSeach = output.findIndex((googles) => googles[0][key] === item[key]);
		indexOfSeach === -1 ? output.push([item]) : output[indexOfSeach].push(item);
		return output;
	}, []);
};


export const sortBy = (history: HistoryItem[], key: string, order: OrderBy = 'asc'): HistoryItem[] => {
	const newHistory = [...history]; 
	if (order === 'asc') {
		return newHistory.sort((a,b) => (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0))
	}

	return newHistory.sort((a,b) => (a[key] < b[key]) ? 1 : ((b[key] < a[key]) ? -1 : 0))
}