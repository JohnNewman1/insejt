import { transformChromeHistoryItem } from '../../src/app/utils/historyItem';
import { chromeHistoryItemFactory } from '../factory/chromeHistoryItemFactory';

describe('historyItem', () => {
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