import { Ticket } from "./Ticket";
import { Bag } from "./Bag";

export class Audience {
  private bag: Bag;

  constructor(bag: Bag) {
    this.bag = bag;
  }

  buy(ticket: Ticket) {
    return this.bag.hold(ticket);
  }
}
