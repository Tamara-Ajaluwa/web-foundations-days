# Assumptions
- Registered Users: 10 million
- Daily Active Users (DAU): 1 million (10% of registered users)

# Uploads Per Second
- 1 million uploads / 100,000 seconds = 10 uploads per second

# Feed Views Per Second
- Average: 500 views per second (50 million views / 100,000 seconds)
- Peak: 2,500 views per second (500 x 5)

# Annual Storage Requirements
- Photos: 730 TB per year (2 TB/day x 365 days)
- Thumbnails: 18 TB per year (50 MB/day x 365 days)
- Total: 748 TB per year

# System Type
- Read-heavy: The system experiences a much higher volume of feed views compared to the number of photo uploads.

# Photo Storage Strategy
- Photos should be stored in object storage because databases are optimized for text and metadata, not large binary files. Using object storage improves performance and significantly reduces costs.

# Architecture Diagram
[Client/App] -> CDN -> Load Balancer -> App Servers -> [Database, Object Storage, Message Queue]

# Component Explanations
- CDN: Serves static assets to users from geographically distributed servers to reduce latency.
- Load Balancer: Distributes incoming network traffic across multiple servers to ensure high availability.
- App Servers: Process application logic, handle user requests, and manage data flow.
- Database: Stores user profiles, metadata, and handles transactional queries.
- Object Storage: Stores large files like photos and thumbnails securely and cost-effectively.
- Message Queue: Manages asynchronous processing tasks, such as triggering background jobs.

# Photo Upload Flow
1. User uploads a photo through the client application.
2. The load balancer directs the request to an available app server.
3. The app server saves the original photo into object storage.
4. The app server writes photo metadata, including the storage URL, to the database.
5. The app server places a job in the message queue for thumbnail creation.
6. A worker server processes the queue job, generates the thumbnail, and saves it to object storage.

# Trade-Offs
- Consistency vs. Availability: By using read replicas to handle high query volume, there may be a slight delay before new photos appear on all feeds, prioritizing availability over immediate consistency.
- Cost of Storage vs. System Performance: Storing all photos and thumbnails in object storage requires higher infrastructure costs, but ensures fast system performance and quick image delivery to users.