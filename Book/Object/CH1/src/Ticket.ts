export class Ticket {
  private fee;

  constructor(fee: number) {
    this.fee = fee;
  }
  public getFee() {
    return this.fee;
  }
}
