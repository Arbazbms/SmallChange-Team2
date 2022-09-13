export class TradeHist {
    constructor(
        public asset:string,
        public side:string,
        public security:string,
        public account:string,
        public qty:number,
        public cash:number,
        public date:Date)
   {} 
}
