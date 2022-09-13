export class Portfolio {
    public instrument: string
    public costprice: number 
    public marketprice:number
    public gain: number
    public ifgain:boolean 
    constructor(){
        this.instrument=''
        this.costprice=0
        this.marketprice=0
        this.gain=this.marketprice-this.costprice
        this.ifgain=this.marketprice>this.costprice
    }

}
