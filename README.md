# Autonomous-Voice-AI-Booking-Agent-n8n-Twilio-Groq-Google-Sheets-
This n8n workflow deploys an autonomous AI voice assistant using Twilio, LangChain, and Groq. Acting as a smart receptionist, it answers inbound calls, converses naturally to gather appointment details, extracts caller info, and automatically logs the structured booking records directly into Google Sheets


# Autonomous Voice AI Booking Agent

An automated, AI-powered voice assistant built with n8n that answers phone calls, schedules clinic appointments, and logs booking data directly into Google Sheets. 

## 🚀 Features
* **Twilio Voice Integration:** Handles inbound calls using Twilio's `<Gather>` and `<Say>` TwiML verbs.
* **Conversational AI:** Utilizes LangChain nodes and Groq (Llama-3.1-8b) to dynamically converse with callers and collect booking requirements.
* **Structured Data Extraction:** The LLM is instructed to output a strict JSON payload once all appointment details (Name, Email, Service, Date, Time) are finalized.
* **Automated Lead Logging:** Parses the LLM output and the caller's phone number, appending the complete record to a Google Sheet.
* **Smart Routing:** Includes a standard keypad IVR (Press 1 for Info, Press 2 to Book) to route calls efficiently.

## 🛠 Prerequisites
To run this workflow, you will need:
1. **n8n Instance:** Self-hosted or Cloud.
2. **Twilio Account:** An active phone number configured to accept inbound voice calls.
3. **Groq API Key:** For accessing the Llama 3.1 model.
4. **Google Cloud Console:** An active project with the Google Sheets API enabled.

## ⚙️ Setup Instructions

### 1. Import the Workflow
1. Open your n8n workspace.
2. Go to **Workflows** -> **Add Workflow** -> **Import from File** (or paste the sanitized JSON directly).

### 2. Configure Credentials
You will need to set up three sets of credentials in n8n:
* **Groq API:** Add your Groq API key to the `Groq Chat Model` and `Groq Chat Model2` nodes.
* **Google Sheets API:** Authenticate your Google account via OAuth2 on the `Append row in sheet1` node.

### 3. Update Placeholders
Search the imported workflow for the following placeholders and replace them with your actual data:
* `<YOUR_DOMAIN>`: Replace this in all **Respond to Webhook** nodes with your n8n instance domain (e.g., your ngrok URL or production domain). Make sure no trailing slashes break the URL path.
* `<YOUR_GOOGLE_SHEET_ID>`: Update the Document ID in the Google Sheets node to point to your specific spreadsheet.

### 4. Configure Twilio
1. Log in to your Twilio console and navigate to your active phone number.
2. Under the **Voice & Fax** configuration, find the "A Call Comes In" section.
3. Set it to **Webhook** and paste the production URL of `Webhook3` (the `twilio-call` endpoint).
4. Ensure the HTTP method is set to **POST**.

## 📝 Google Sheets Schema Requirements
Ensure your target Google Sheet has the following column headers in the first row:
* Booking ID
* Name
* Phone
* Email
* Service
* Date
* Time
* Message
* Status
* Created At

## 🧠 System Prompt Modification
If you wish to adapt this agent for a different business (e.g., a salon, consulting firm, or restaurant), open the **AI Agent2** node and update the `System Message`. Ensure you keep the strict JSON output rules intact so the downstream JavaScript node functions correctly.
