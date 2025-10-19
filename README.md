# AWSProject
Serverless Campus Events Registration Web Application

# A serverless web app that allows students and staff to:

View upcoming campus events (football games, workshops, volunteering, etc.)

Register for events

Manage their registrations

(Admin) Create, update, or delete events.

# AWS-based serverless architecture:

[Frontend] → [API Gateway] → [Lambda Functions] → [DynamoDB]
        ↓
   [Authentication via Cognito]
        ↓
   [Static Hosting in S3 + CloudFront]

| Component                    | AWS Service     | Purpose                                                            |
| ---------------------------- | --------------- | ------------------------------------------------------------------ |
| **Frontend**                 | S3 + CloudFront | Host static web app (HTML, CSS, JS, React, or Angular)             |
| **Authentication**           | Cognito         | User sign-up, sign-in, and role-based access (Student vs. Staff)   |
| **Backend Logic**            | Lambda          | Serverless functions for CRUD operations on events & registrations |
| **API Management**           | API Gateway     | REST endpoints to communicate between frontend and backend         |
| **Database**                 | DynamoDB        | Store users, events, and registration data                         |
| **Notifications (optional)** | SNS or SES      | Send confirmation or reminder emails                               |
| **Monitoring**               | CloudWatch      | Logs and metrics for Lambda & API usage                            |
