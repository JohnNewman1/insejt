import { internet, date, datatype } from 'faker';
import { Factory } from 'rosie';
import type { ChromeHistoryItem } from '../../src/app/types';

export const chromeHistoryItemFactory = Factory.define<ChromeHistoryItem>('ChromeHistoryItemFactory').attrs({
    id: datatype.number().toString(),
    lastVisitTime: date.past().getTime(),
    title: internet.domainName(),
    url: internet.url(),
    typedCount: datatype.number(),
    visitCount: datatype.number()
});
