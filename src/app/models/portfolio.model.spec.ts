import { Portfolio } from './portfolio.model';

describe('Portfolio', () => {
  it('should create an instance', () => {
    expect(new Portfolio('','','',-1,-1)).toBeTruthy();
  });
});
