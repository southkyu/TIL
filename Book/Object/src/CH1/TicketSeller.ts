import { Audience } from "./Audience";
import { TicketOffce } from "./TicketOffice";

export class TicketSeller {
  private ticketOffice: TicketOffce;

  constructor(ticketOffice: TicketOffce) {
    this.ticketOffice = ticketOffice;
  }

  sellTo(audience: Audience) {
    this.ticketOffice.sellTicketTo(audience);
  }
}
