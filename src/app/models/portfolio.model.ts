export class Portfolio {

    public gain: number
    public ifgain:boolean 
    public selected:boolean
    constructor(
        public instrument: string,
        public instrumentid: string,
        public orderid: string,
        public costprice: number, 
        public marketprice:number,
        // public selected:boolean


    ){
        // this.instrument=''
        // this.instrumentid=''
        // this.orderid=''
        // this.costprice=0
        // this.marketprice=0
        this.gain=this.marketprice-this.costprice
        this.ifgain=this.marketprice>this.costprice
        this.selected=false
    }

}
