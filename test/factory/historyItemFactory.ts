import { internet, date, datatype } from 'faker';
import { Factory } from 'rosie';
import type { HistoryItem } from '../../src/app/types';

export const historyItemFactory = Factory.define<HistoryItem>('ChromeHistoryItemFactory').attrs({
	id: datatype.number().toString(),
	lastVisitTime: date.past().getTime(),
	title: internet.domainName(),
	url: internet.url(),
	typedCount: datatype.number(),
	visitCount: datatype.number(),
});
