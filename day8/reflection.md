# Day 8 Assignment Reflection

**What I Learned:**
Designing the TicketHub system taught me how to balance functional requirements (like holding seats and processing payments) with critical non-functional requirements like speed, correctness, and fairness. I learned that handling high-concurrency events (the "big sale" peak) requires specific strategies to prevent double-booking, such as implementing temporary seat holds and database locks.

**Challenges:**
The most challenging part was understanding the trade-offs between system performance and strict transactional consistency. Ensuring that two users do not book the same seat at the exact same time without severely slowing down the system required careful thought about database transactions and constraints.

**Key Takeaway:**
System design is about making informed compromises. Building a system for normal traffic is straightforward, but architecting one that survives sudden, massive spikes in user traffic requires a deeply scalable and resilient approach.