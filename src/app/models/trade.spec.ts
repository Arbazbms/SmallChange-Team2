import { Order } from './order';
import { Trade } from './trade';

describe('Trade', () => {
  it('should create an instance', () => {
    expect(new Trade('',0,0,'','',new Order('',0,0,'','','', new Date()),'',0,'')).toBeTruthy();
  });
});
