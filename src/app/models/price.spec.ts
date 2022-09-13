import { Instrument } from './instrument';
import { Price } from './price';

describe('Price', () => {
  it('should create an instance', () => {
    expect(new Price('',0,0,new Date(),new Instrument('','','','','',0,0,))).toBeTruthy();
  });
});
