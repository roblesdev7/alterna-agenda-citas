# API Endpoints Documentation

This document describes the API endpoints needed for the frontend to work properly. Share this with your backend partner.

## Base URL
```
http://localhost:3000/api
```

## Authentication
- Token-based authentication using Bearer tokens in the Authorization header

## Endpoints

### 1. Services

#### Get All Services
```http
GET /services
```

**Response:**
```json
[
  {
    "id": "string",
    "name": "string",
    "description": "string",
    "duration": number, // in minutes
    "price": number,
    "image": "string (URL)",
    "active": boolean
  }
]
```

#### Get Service by ID
```http
GET /services/:id
```

---

### 2. Resources (Staff/Professionals)

#### Get All Resources
```http
GET /resources
```

**Response:**
```json
[
  {
    "id": "string",
    "name": "string",
    "specialty": "string",
    "email": "string",
    "phone": "string",
    "active": boolean
  }
]
```

#### Get Available Resources by Service
```http
GET /resources?serviceId={serviceId}
```

---

### 3. Availability

#### Check Availability
```http
POST /availability/check
```

**Request Body:**
```json
{
  "serviceId": "string",
  "resourceId": "string",
  "date": "YYYY-MM-DD",
  "time": "HH:MM"
}
```

**Response:**
```json
{
  "available": boolean,
  "conflicts": []
}
```

#### Get Available Time Slots
```http
GET /availability/slots?date={YYYY-MM-DD}&serviceId={id}&resourceId={id}
```

**Response:**
```json
{
  "date": "YYYY-MM-DD",
  "slots": [
    {
      "time": "HH:MM",
      "available": boolean
    }
  ]
}
```

---

### 4. Appointments

#### Create Appointment
```http
POST /appointments
```

**Request Body:**
```json
{
  "serviceId": "string",
  "resourceId": "string",
  "date": "YYYY-MM-DD",
  "time": "HH:MM",
  "customer": {
    "name": "string",
    "email": "string",
    "phone": "string"
  }
}
```

**Response:**
```json
{
  "id": "string",
  "reference": "string", // e.g., "APT-ABC123"
  "serviceId": "string",
  "resourceId": "string",
  "date": "YYYY-MM-DD",
  "time": "HH:MM",
  "customer": {
    "name": "string",
    "email": "string",
    "phone": "string"
  },
  "status": "confirmed",
  "createdAt": "ISO 8601 timestamp"
}
```

#### Get Appointment by Reference
```http
GET /appointments/reference/:reference
```

**Response:**
```json
{
  "id": "string",
  "reference": "string",
  "service": {
    "id": "string",
    "name": "string",
    "duration": number,
    "price": number
  },
  "resource": {
    "id": "string",
    "name": "string",
    "specialty": "string"
  },
  "date": "YYYY-MM-DD",
  "time": "HH:MM",
  "customer": {
    "name": "string",
    "email": "string",
    "phone": "string"
  },
  "status": "confirmed" | "pending" | "cancelled" | "completed",
  "createdAt": "ISO 8601 timestamp"
}
```

#### Cancel Appointment
```http
POST /appointments/:id/cancel
```

**Request Body:**
```json
{
  "reason": "string"
}
```

**Response:**
```json
{
  "id": "string",
  "status": "cancelled",
  "cancelledAt": "ISO 8601 timestamp"
}
```

#### Reschedule Appointment
```http
PUT /appointments/:id/reschedule
```

**Request Body:**
```json
{
  "newDateTime": {
    "date": "YYYY-MM-DD",
    "time": "HH:MM"
  }
}
```

---

### 5. Blocks (Optional - for admin features)

#### Get Blocks for Resource
```http
GET /blocks?resourceId={id}&date={YYYY-MM-DD}
```

**Response:**
```json
[
  {
    "id": "string",
    "resourceId": "string",
    "startDateTime": "ISO 8601 timestamp",
    "endDateTime": "ISO 8601 timestamp",
    "type": "lunch" | "vacation" | "meeting",
    "reason": "string"
  }
]
```

---

## Error Responses

All endpoints should return consistent error responses:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": {} // Optional additional details
  }
}
```

### Common Error Codes:
- `400` - Bad Request (validation error)
- `401` - Unauthorized
- `404` - Not Found
- `409` - Conflict (e.g., time slot already booked)
- `500` - Internal Server Error

---

## Business Rules to Consider

1. **Appointment Creation**
   - Cannot book appointments in the past
   - Must check for conflicts with existing appointments
   - Must check for blocks (lunch, vacation, etc.)
   - Duration must consider service duration

2. **Cancellation Policy**
   - Must cancel at least 2 hours before appointment time
   - Send notification to customer upon cancellation

3. **Availability**
   - Business hours: 9:00 - 18:00 (configurable)
   - Default time slot interval: 30 minutes
   - Consider service duration when showing slots

4. **Notifications** (Simulated)
   - Send confirmation email upon booking
   - Send reminder 24 hours before appointment
   - Send cancellation confirmation

---

## CORS Configuration

The backend should allow requests from:
```
http://localhost:5173  (development)
https://your-production-domain.com (production)
```

## Sample Request Headers

```http
Content-Type: application/json
Authorization: Bearer {token}
```
