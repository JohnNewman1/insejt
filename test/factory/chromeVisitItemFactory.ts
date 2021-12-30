import { date, datatype } from 'faker';
import { Factory } from 'rosie';
import type { ChromeVisitItem } from '../../src/app/types';

export const chromeVisitItemFactory = Factory.define<ChromeVisitItem>('ChromeHistoryItemFactory').attrs({
    id: datatype.number().toString(),
    transition: 'link',
    visitId: datatype.number().toString(),
    visitTime: date.past().getTime(),
    referringVisitId: datatype.number().toString(),
});
