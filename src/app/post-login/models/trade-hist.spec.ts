import { TradeHist } from './trade-hist';

describe('TradeHist', () => {
  it('should create an instance', () => {
    expect(new TradeHist("Equity","Buy","Tata","HDFC",15,799,new Date(2022,3,2))).toBeTruthy();
  });
});
