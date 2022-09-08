import { Instrument } from './instrument';

export class Price {
  constructor(
    public instrumentId: string,
    public bidPrice: number,
    public askPrice: number,
    public timeStamp: Date,
    public instrument: Instrument
  ) {}
}
