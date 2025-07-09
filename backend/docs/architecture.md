# Authentication

- Authentication is done with auth0 and jwt used.

- Also the server has a session based authencation system, cuz jwt is pain to work with in development. (will be removed later).

# Modules

1. User
2. Workspace
3. WorkspaceMembership
4. Project
5. Task
6. Comment

Each of these documents are seperated for scalability, referred with ObjectId and nothing else.

# Push Notifications

Exponent tokens or FCM tokens are stored in Redis. (not on the primary database)

# CI / CD

Docker, and Expo Application Service for the mobile application.
