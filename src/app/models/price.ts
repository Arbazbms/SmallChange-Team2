import { Instrument } from './instrument';

export class Price {
  constructor(
    instrumentId: string,
    bidPrice: number,
    askPrice: number,
    timeStamp: Date,
    instrument: Instrument
  ) {}
}
