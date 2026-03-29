# 🚀 Scalable Notification Service

A lightweight **event-driven notification microservice** built with **Node.js, BullMQ, and Redis**.

## Features

* Queue-based async processing
* Separate worker for background jobs
* Retry & backoff support
* Multi-channel ready (Email, SMS, Push)

## Architecture

API (Producer) → Queue → Worker (Consumer)

## ▶️ Run

```bash
npm install
npm run dev        # start API
node worker.js     # start worker
```

## API

**POST** `/api/v1/notifications/send`

```json
{
  "_id": {
    "$oid": "69c98073e6a92fc4078ac9b7"
  },
  "client": "96ef8568-0f36-43b0-b32b-ae30d66e6839",
  "recipient": {
    "email": "aditya########@gmail.com",
    "phone": "9999999999"
  },
  "type": "Sign-up",
  "message": "This is Testing",
  "channel": "EMAIL",
  "status": "SENT",
  "metaData": {
    "title": "New Mail"
  },
  "attempts": 3,
  "error": "I Will Send Email Later",
  "notifyId": "82cee8df-202b-4f39-ac2c-f29a284accce",
  "createdAt": {
    "$date": "2026-03-29T19:41:39.095Z"
  },
  "updatedAt": {
    "$date": "2026-03-29T19:42:07.182Z"
  },
  "__v": 0,
  "jobId": "8",
  "sentAt": {
    "$date": "2026-03-29T19:42:07.182Z"
  }
}
```

## Use Case

* User signup emails
* Order confirmation
* Alerts & notifications

---

Decoupled, scalable, and production-ready notification system.
