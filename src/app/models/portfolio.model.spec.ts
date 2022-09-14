import { Portfolio } from './portfolio.model';

describe('Portfolio', () => {
  it('should create an instance', () => {

    expect(new Portfolio('','','',0,0)).toBeTruthy();

  });
});
