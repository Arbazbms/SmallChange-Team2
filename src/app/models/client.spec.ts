import { Client } from './client';
import { Identification } from './identification.model';

describe('Client', () => {
  it('should create an instance', () => {
    expect(new Client('','','','','',['',''])).toBeTruthy();
  });
});
