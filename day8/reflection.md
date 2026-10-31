# Day 8 Assignment Reflection

**What I Learned and Challenges**
Designing the TicketHub system taught me how to balance functional requirements with critical non-functional metrics like speed, correctness, and fairness. I learned that handling high-concurrency events requires specific strategies to prevent double-booking, such as implementing temporary seat holds, message queues to prevent database connection exhaustion, and strict transaction isolation levels. 

The most challenging part was understanding the trade-offs between system performance and strict transactional consistency. Ensuring that two users do not book the same seat simultaneously without severely slowing down overall system responsiveness required careful thought about database constraints and architectural layers.

**Capstone Revisions and Next Steps**
Following previous feedback on my capstone, I will revise my database schemas to explicitly define primary and foreign key relationships, ensuring better data integrity across my models. I will also fully map out my API request and response payloads before writing backend logic to ensure all user workflows are comprehensively covered. Moving forward, the next technical subjects I will study are message brokers (like RabbitMQ) and advanced database locking strategies, as these are critical for building scalable systems that survive massive traffic spikes.