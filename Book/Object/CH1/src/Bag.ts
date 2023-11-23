import { Ticket } from "./Ticket";

export class Bag {
  private amount;
  private invitation;
  private ticket;

  constructor(amount) {
    this.amount = amount;
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

  public Bag(invitation, amount) {
    this.invitation = invitation;
    this.amount = amount;
  }
  private hasInvitation() {
    return this.invitation !== null;
  }

  private hasTicket() {
    return this.ticket !== null;
  }

  private setTicket(ticket) {
    this.ticket = ticket;
  }

  private minusAmount(amount) {
    this.amount -= amount;
  }

  private plusAmount(amount) {
    this.amount += amount;
  }
}
