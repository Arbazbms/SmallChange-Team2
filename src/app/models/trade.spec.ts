import { Trade } from './trade';

describe('Trade', () => {
  it('should create an instance', () => {
    expect(new Trade('',0,0,'','','','',0)).toBeTruthy();
  });
});
