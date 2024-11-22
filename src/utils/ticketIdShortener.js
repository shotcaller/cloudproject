export const trimTicketId = (ticketid) => {
    return ticketid.length>6?ticketid.substring(0,6):ticketid;
}