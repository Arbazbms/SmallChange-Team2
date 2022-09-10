import { TradeModel } from './trade-model';

describe('TradeModel', () => {
  it('should create an instance', () => {
    expect(new TradeModel('','',0,0,0)).toBeTruthy();
  });
});
