import { Audience } from "./Audience";
import { Ticket } from "./Ticket";

export class TicketOffce {
  private amount: number;
  private ticekts: Ticket[];

  constructor(amount: number, tickets: Ticket[]) {
    this.amount = amount;
    this.ticekts = tickets;
  }

  public getTicket(): Ticket {
    const ticket = this.ticekts.shift();
    if (!ticket) {
      throw new Error("티켓 매진");
    }
    return ticket;
  }

  plustAmount(amount) {
    this.amount += amount;
  }

  sellTicketTo(audience: Audience) {
    this.plustAmount(audience.buy(this.getTicket()));
  }
}
