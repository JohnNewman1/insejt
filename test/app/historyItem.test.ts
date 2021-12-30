import { findReferrerHistoryItem, transformChromeHistoryItem } from '../../src/app/utils/historyItem';
import { chromeHistoryItemFactory } from '../factory/chromeHistoryItemFactory';
import { chromeVisitItemFactory } from '../factory/chromeVisitItemFactory';
import { historyItemFactory } from '../factory/historyItemFactory';

describe('historyItem', () => {
    describe('transformChromeHistoryItem', () => {
        it('can transform a chrome history item to a history item', () => {
            const chromeHistoryItem = chromeHistoryItemFactory.build();
            const result =  transformChromeHistoryItem(chromeHistoryItem);

            expect(result).toEqual({
                id: chromeHistoryItem.id,
                lastVisitTime: chromeHistoryItem.lastVisitTime,
                title: chromeHistoryItem.title,
                url: chromeHistoryItem.url,
                typedCount: chromeHistoryItem.typedCount,
                visitCount: chromeHistoryItem.visitCount
            });
        });
    });
    describe('findReferrerHistoryItem', () => {
        it('find history item from referrer id', () => {
            const history = historyItemFactory.buildList(20);
            const referrer = historyItemFactory.build({
                id: '1001'
            })
            history.push(referrer);

            const visits = chromeVisitItemFactory.buildList(20);
            const referrerVisit = chromeVisitItemFactory.build({
                id: '1001',
                visitId: '1003'
            });
            visits.push(referrerVisit);

            const result = findReferrerHistoryItem(history, visits, '1003')
            expect(result).toEqual(referrer);
        });
    });
});