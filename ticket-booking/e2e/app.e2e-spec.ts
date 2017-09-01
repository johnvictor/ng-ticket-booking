import { TicketBookingPage } from './app.po';

describe('ticket-booking App', () => {
  let page: TicketBookingPage;

  beforeEach(() => {
    page = new TicketBookingPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
