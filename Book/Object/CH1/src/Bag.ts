import { Invitation } from "./Invitation";
import { Ticket } from "./Ticket";

export class Bag {
  private amount: number;
  private invitation: Invitation | null;
  private ticket: Ticket | null;

  constructor(invitation: Invitation | null, amount: number) {
    this.invitation = invitation;
    this.amount = amount;
    this.ticket = null;
  }

  hold(ticket: Ticket) {
    if (this.hasInvitation()) {
      this.setTicket(ticket);
      return 0;
    }
    this.setTicket(ticket);
    this.minusAmount(ticket.getFee());
    return ticket.getFee();
  }

  private hasInvitation() {
    return this.invitation !== null;
  }

  private setTicket(ticket) {
    this.ticket = ticket;
  }

  private minusAmount(amount) {
    this.amount -= amount;
  }
}
