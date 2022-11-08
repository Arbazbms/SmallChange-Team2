export class Portfolio {

    public gain: number
    public ifgain:boolean 
    public selected:boolean
    constructor(
        public portfolio_item_id: string,
        public client_id: string,
        public instrument_id: string,
        public trade_id: string,
        public cost_price: number, 
        public quantity:number,
        public market_value: number
        // public portfolioItemId: string,
        // public clientId: string,
        // public instrumentId: string,
        // public tradeId: string,
        // public costPrice: number, 
        // public quantity:number,
        // public selected:boolean


    ){
        // this.instrument=''
        // this.instrumentid=''
        // this.orderid=''
        // this.costprice=0
        // this.marketprice=0
        this.gain=this.cost_price-this.market_value
        this.ifgain=this.cost_price>this.market_value
        this.selected=false
    }

}
