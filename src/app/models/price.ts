import { Instrument } from "./instrument"

export interface Price {
    instrumentId: string
    bidPrice: number
    askPrice: number
    timeStamp : Date
    instrument: Instrument
}
