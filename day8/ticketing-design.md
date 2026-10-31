### Functional and Non-Functional Requirements
**Functional:** The system must allow users to browse events, view the seat map, hold specific seats, process payments, and view purchased tickets.
**Non-Functional:** The system must process transactions correctly to ensure fairness, support concurrent seat bookings during peak sales, load pages quickly, and handle high traffic without double-booking.

### Traffic Estimates
* **Normal Traffic:** 50,000 daily visitors viewing 10 pages each generates 500,000 daily requests. Distributed across 24 hours, this averages approximately 6 Requests Per Second (RPS).
* **Peak Traffic (Big Sale):** 200,000 users making 5 requests each during a 10-minute (600 seconds) peak window generates 1,000,000 requests. This peaks at roughly 1,667 RPS.

### API Design
1. **Browse Events**
   * **Endpoint:** `GET /api/events`
   * **Description:** Retrieves a list of all upcoming events.
2. **View Seat Map**
   * **Endpoint:** `GET /api/events/{eventId}/seats`
   * **Description:** Retrieves the layout and current availability of seats for a specific event.
3. **Hold Seats**
   * **Endpoint:** `POST /api/tickets/hold`
   * **Payload:** `{ "eventId": "123", "seatIds": ["A1", "A2"] }`
   * **Description:** Temporarily reserves selected seats while the user completes checkout.
4. **Process Payment**
   * **Endpoint:** `POST /api/payments`
   * **Payload:** `{ "holdId": "abc-456", "paymentToken": "tok_123" }`
   * **Description:** Processes the transaction and finalizes the ticket order.
5. **View Purchased Tickets**
   * **Endpoint:** `GET /api/users/{userId}/tickets`
   * **Description:** Retrieves all confirmed ticket orders and booking details for a specific user.

### Database Schemas
* **Users:** `id` (Primary Key), `name`, `email`, `password_hash`
* **Events:** `id` (Primary Key), `title`, `date`, `total_seats`
* **Seats:** `id` (Primary Key), `event_id` (Foreign Key -> Events.id), `seat_number`, `status` (available, held, booked), `version`
* **Orders:** `id` (Primary Key), `user_id` (Foreign Key -> Users.id), `event_id` (Foreign Key -> Events.id), `total_amount`, `status`, `created_at`

### Preventing Double-Booking
Double-booking is prevented using database transactions with optimistic locking. The `Seats` table includes a `version` column. When a user attempts to hold or book a seat, the system checks if the version matches the initially read version. If another transaction has modified it, the version changes, and the subsequent booking attempt fails. Unique constraints on `(event_id, seat_number)` also ensure a seat cannot be duplicated.

### System Architecture & Isolation
* **Load Balancer:** Distributes incoming traffic across multiple application servers.
* **Web/App Servers:** Auto-scaling instances to handle normal traffic and scale up instantly during the big sale.
* **Cache (Redis) & Queue (RabbitMQ):** A Redis cache serves the seat map for high throughput, while a message queue buffers checkout requests asynchronously to prevent database connection exhaustion during the 10-minute rush.
* **Database (PostgreSQL):** Handles strict transactional data. The database utilizes the Serializable isolation level alongside optimistic locking to safely handle concurrent row modifications.

### System Trade-offs
1. **Consistency vs. Performance:** Using strict database locks and serializable isolation to prevent double-booking guarantees correctness but slows down overall system response times during massive traffic spikes.
2. **Cost vs. Availability:** Over-provisioning servers to guarantee uptime during the 10-minute peak sale incurs high infrastructure costs, even though those resources sit idle during normal traffic.