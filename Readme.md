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
    "$oid": "69c8e873c6c1c332c5ae788a"
  },
  "userId": "e239560a-d369-4086-a01f-a916a0d8089e",
  "type": "USER_SIGNUP",
  "message": "Welcome Aditya to our notification system",
  "channel": "EMAIL",
  "status": "SENT",
  "metaData": {
    "name": "Aditya",
    "email": "aditya#######@gmail.com",
    "title": "Welcome Mail"
  },
  "notifyId": "cf47e02d-b6cc-4c81-b460-fb3dd3d10e31",
  "createdAt": {
    "$date": "2026-03-29T08:53:07.288Z"
  },
  "updatedAt": {
    "$date": "2026-03-29T08:53:19.893Z"
  },
  "__v": 0,
  "sentAt": {
    "$date": "2026-03-29T08:53:19.893Z"
  }
}
```

## Use Case

* User signup emails
* Order confirmation
* Alerts & notifications

---

Decoupled, scalable, and production-ready notification system.
