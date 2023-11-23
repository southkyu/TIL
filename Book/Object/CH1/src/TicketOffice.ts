import { Audience } from "./Audience";

export class TicketOffce {
  private amount;
  private ticekts;

  constructor(amount, tickets) {
    this.amount = amount;
    this.ticekts = tickets;
  }

  public getTicket() {
    return this.ticekts[0];
  }

  minusAmount(amount) {
    this.amount -= amount;
  }

  plustAmount(amount) {
    this.amount += amount;
  }

  sellTicketTo(audience: Audience) {
    this.plustAmount(audience.buy(this.getTicket()));
  }
}
