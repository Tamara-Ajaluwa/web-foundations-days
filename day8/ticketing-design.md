### API Design

**1. Browse Events**
* **Endpoint:** `GET /api/events`
* **Description:** Retrieves a list of all upcoming events.

**2. View Seat Map**
* **Endpoint:** `GET /api/events/{eventId}/seats`
* **Description:** Retrieves the layout and current availability of seats for a specific event.

**3. Hold Seats**
* **Endpoint:** `POST /api/tickets/hold`
* **Payload:** `{ "eventId": "123", "seatIds": ["A1", "A2"] }`
* **Description:** Temporarily reserves the selected seats (e.g., for 10 minutes) while the user completes checkout to prevent double-booking.

**4. Process Payment**
* **Endpoint:** `POST /api/payments`
* **Payload:** `{ "holdId": "abc-456", "paymentToken": "tok_123" }`
* **Description:** Processes the transaction and finalizes the ticket order.