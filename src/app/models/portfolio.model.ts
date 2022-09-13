export class Portfolio {

    public gain: number
    public ifgain:boolean 
    constructor(
        public instrument: string,
        public instrumentid: string,
        public orderid: string,
        public costprice: number, 
        public marketprice:number


    ){
        // this.instrument=''
        // this.instrumentid=''
        // this.orderid=''
        // this.costprice=0
        // this.marketprice=0
        this.gain=this.marketprice-this.costprice
        this.ifgain=this.marketprice>this.costprice
    }

}
