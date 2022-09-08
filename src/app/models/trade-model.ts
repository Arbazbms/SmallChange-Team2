export class TradeModel {
  constructor(
    public instrumentId: string,
    public description: string,
    public minQuantity: number,
    public maxQuantity: number,
    public targetPrice: number
  ) {}
}
