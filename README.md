# 🦷 SmileCare Dental AI Voice Assistant

An AI-powered voice calling system built using n8n, Twilio, Groq LLM, and Google Sheets.

This project allows users to:

- Call a phone number
- Talk with an AI receptionist
- Book dental appointments using voice
- Store booking data automatically in Google Sheets
- Ask general AI questions

---

# 🚀 Features

## 📞 IVR Menu System

When a user calls:

- Press 1 → General AI Assistant
- Press 2 → Dental Appointment Booking

---

## 🤖 General AI Assistant

Users can:

- Ask any question
- Have voice conversations with AI
- Get spoken AI responses in real-time

Powered by:

- Groq Llama 3.1 8B
- Twilio Voice
- n8n AI Agent

---

## 🦷 Dental Booking Assistant

AI collects:

- Full Name
- Email
- Dental Service
- Appointment Date
- Appointment Time

After collecting all information:

- Booking is confirmed
- Data is saved to Google Sheets
- User receives voice confirmation

---

# 🛠 Tech Stack

| Technology | Usage |
|---|---|
| n8n | Workflow Automation |
| Twilio | Voice Calling |
| Groq API | AI Responses |
| Google Sheets | Database |
| Ngrok | Public Webhook URL |

---

# 📂 Workflow Structure

## Main Call Flow

```text
Incoming Call
      ↓
Webhook (Twilio)
      ↓
Switch Node
 ├── Press 1 → General AI
 └── Press 2 → Booking Assistant
```

---

## General AI Flow

```text
Twilio Voice Input
      ↓
Webhook
      ↓
AI Agent
      ↓
Groq LLM
      ↓
Voice Response
```

---

## Booking Flow

```text
Collect Name
      ↓
Collect Email
      ↓
Collect Service
      ↓
Collect Date
      ↓
Collect Time
      ↓
Generate JSON
      ↓
Save to Google Sheets
      ↓
Booking Confirmation
```

---

# 🔧 Setup Instructions

## 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/smilecare-ai-assistant.git
cd smilecare-ai-assistant
```

---

## 2️⃣ Install n8n

```bash
npm install -g n8n
```

Start n8n:

```bash
n8n
```

---

## 3️⃣ Setup Ngrok

Install ngrok and expose n8n:

```bash
ngrok http 5678
```

Copy generated HTTPS URL.

Example:

```text
https://abc123.ngrok-free.app
```

---

## 4️⃣ Configure Twilio

In Twilio Phone Number settings:

### Voice Webhook URL

```text
https://YOUR_NGROK_URL/webhook/twilio-call
```

Method:

```text
POST
```

---

## 5️⃣ Configure Groq API

Create Groq API Key:

https://console.groq.com/

Add credentials inside n8n.

Model used:

```text
llama-3.1-8b-instant
```

---

## 6️⃣ Configure Google Sheets

Create a Google Sheet with columns:

| Booking ID | Name | Phone | Email | Service | Date | Time | Message | Status | Created At |
|---|---|---|---|---|---|---|---|---|---|

Connect Google Sheets OAuth inside n8n.

---

# 📌 Required n8n Nodes

## Core Nodes

- Webhook
- Respond to Webhook
- Switch
- IF
- Set
- Code

## AI Nodes

- AI Agent
- Groq Chat Model
- Memory Buffer Window

## Integration Nodes

- Google Sheets

---

# 🧠 AI Prompt Logic

The booking assistant:

- Asks only ONE question at a time
- Keeps responses under 15 words
- Remembers previous answers
- Generates structured booking JSON

Example:

```json
{
  "status": "BOOKING_COMPLETE",
  "name": "John Doe",
  "email": "john@gmail.com",
  "service": "Teeth Cleaning",
  "date": "25 May",
  "time": "4 PM",
  "booking_id": "AUTO",
  "message": "booking completed successfully"
}
```

---

# 📊 Google Sheets Storage

After booking completion:

- Customer data is appended automatically
- Timestamp is generated
- Booking status is stored

---

# 🔐 Environment Variables

Recommended:

```env
GROQ_API_KEY=your_api_key
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
```

---

# 📞 Twilio Voice Flow Example

```text
Welcome to SmileCare Dental Clinic

Press 1 for AI Assistant
Press 2 for Appointment Booking
```

---

# 🎯 Future Improvements

- WhatsApp Integration
- Multi-language Support
- Calendar Integration
- SMS Confirmations
- ElevenLabs Voice
- CRM Integration

---

# 👨‍💻 Author

Krishna Tyagi

Built using:

- n8n
- Twilio
- Groq AI
- Google Sheets

---

# ⭐ Support

If you like this project:

- Star the repository
- Fork the project
- Share with others

---
