import { Preference } from './preference';

describe('Preference', () => {
  it('should create an instance', () => {
    expect(new Preference("11",'aggressive','0-900','ss','0-8 years')).toBeTruthy();
  });
});
