import { Client } from './client.model';
import { Identification } from './identification.model';

describe('Client', () => {
  it('should create an instance', () => {
    expect(new Client(0,'','','','','','','',new Identification('',''))).toBeTruthy();
  });
});
