{
  "nodes": [
    {
      "parameters": {
        "respondWith": "text",
        "responseBody": "<Response>\n  <Gather input=\"speech\"\n          action=\"https://<YOUR_DOMAIN>/webhook/twilio-general-ai\"\n          method=\"POST\"\n          speechTimeout=\"auto\">\n\n    <Say voice=\"Google.en-US-Neural2-F\">\n      you want to query anything ask me question\n    </Say>\n\n  </Gather>\n</Response>",
        "options": {
          "responseHeaders": {
            "entries": [
              {
                "name": "content-type",
                "value": "text/xml"
              }
            ]
          }
        }
      },
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1.5,
      "position": [
        560,
        -160
      ],
      "name": "Respond to Webhook"
    },
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "twilio-general-ai",
        "responseMode": "responseNode",
        "options": {}
      },
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 2.1,
      "position": [
        864,
        -160
      ],
      "name": "Webhook1",
      "webhookId": "<YOUR_WEBHOOK_ID_1>"
    },
    {
      "parameters": {
        "promptType": "define",
        "text": "={{$json.message}}",
        "options": {}
      },
      "type": "@n8n/n8n-nodes-langchain.agent",
      "typeVersion": 3.1,
      "position": [
        1344,
        -160
      ],
      "name": "AI Agent"
    },
    {
      "parameters": {
        "model": "llama-3.1-8b-instant",
        "options": {}
      },
      "type": "@n8n/n8n-nodes-langchain.lmChatGroq",
      "typeVersion": 1,
      "position": [
        1328,
        48
      ],
      "name": "Groq Chat Model",
      "credentials": {
        "groqApi": {
          "id": "<YOUR_GROQ_CREDENTIAL_ID>",
          "name": "Groq account"
        }
      }
    },
    {
      "parameters": {},
      "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
      "typeVersion": 1.3,
      "position": [
        1488,
        48
      ],
      "name": "Simple Memory"
    },
    {
      "parameters": {
        "mode": "raw",
        "jsonOutput": "={\n  \"message\": \"={{$json.body.SpeechResult || 'hello'}}\",\n  \"sessionId\": \"={{$json.body.CallSid}}\"\n}",
        "options": {}
      },
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        1072,
        -160
      ],
      "name": "Edit Fields"
    },
    {
      "parameters": {
        "rules": {
          "values": [
            {
              "conditions": {
                "options": {
                  "caseSensitive": true,
                  "leftValue": "",
                  "typeValidation": "strict",
                  "version": 3
                },
                "conditions": [
                  {
                    "leftValue": "={{ $json.body.Digits }}",
                    "rightValue": "1",
                    "operator": {
                      "type": "string",
                      "operation": "equals"
                    }
                  }
                ],
                "combinator": "and"
              }
            },
            {
              "conditions": {
                "options": {
                  "caseSensitive": true,
                  "leftValue": "",
                  "typeValidation": "strict",
                  "version": 3
                },
                "conditions": [
                  {
                    "leftValue": "={{ $json.body.Digits }}",
                    "rightValue": "2",
                    "operator": {
                      "type": "string",
                      "operation": "equals",
                      "name": "filter.operator.equals"
                    }
                  }
                ],
                "combinator": "and"
              }
            }
          ]
        },
        "options": {
          "fallbackOutput": "extra"
        }
      },
      "type": "n8n-nodes-base.switch",
      "typeVersion": 3.4,
      "position": [
        -96,
        304
      ],
      "name": "Switch"
    },
    {
      "parameters": {
        "respondWith": "text",
        "responseBody": "<Response>\n  <Gather numDigits=\"1\" action=\"https://<YOUR_DOMAIN>/webhook/twilio-call\" method=\"POST\">\n    <Say voice=\"Google.en-US-Neural2-F\">\n      Hello and welcome to SmileCare Dental Clinic.\n      Press 1 to hear clinic information.\n      Press 2 to book an appointment with our smart assistant.\n      Please press your choice now.\n    </Say>\n  </Gather>\n  <Say voice=\"Google.en-US-Neural2-F\">\n    We did not receive any input. Goodbye.\n  </Say>\n</Response>",
        "options": {
          "responseHeaders": {
            "entries": [
              {
                "name": "content-type",
                "value": "text/xml"
              }
            ]
          }
        }
      },
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1.5,
      "position": [
        528,
        672
      ],
      "name": "Respond to Webhook4"
    },
    {
      "parameters": {
        "respondWith": "text",
        "responseBody": "=<Response>\n  <Gather input=\"speech\"\n          action=\"https://<YOUR_DOMAIN>/webhook/twilio-general-ai\"\n          method=\"POST\"\n          speechTimeout=\"auto\"\n          timeout=\"6\"\n          language=\"en-IN\">\n\n    <Say voice=\"Google.en-US-Neural2-F\">\n      {{ $json.output || \"Hello, how can I help you?\" }}\n    </Say>\n\n  </Gather>\n\n  <Redirect method=\"POST\">\n    https://<YOUR_DOMAIN>/webhook/twilio-general-ai\n  </Redirect>\n</Response>",
        "options": {}
      },
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1.5,
      "position": [
        1808,
        -160
      ],
      "name": "Respond to Webhook1"
    },
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "twilio-call",
        "responseMode": "responseNode",
        "options": {}
      },
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 2.1,
      "position": [
        -400,
        336
      ],
      "name": "Webhook3",
      "webhookId": "<YOUR_WEBHOOK_ID_3>"
    },
    {
      "parameters": {
        "respondWith": "text",
        "responseBody": "<Response>\n  <Gather input=\"speech\"\n          action=\"https://<YOUR_DOMAIN>/webhook/twilio-ai-chat\"\n          method=\"POST\"\n          speechTimeout=\"auto\"\n          timeout=\"6\"\n          language=\"en-IN\">\n\n    <Say voice=\"Google.en-US-Neural2-F\">\n      Welcome to SmileCare Dental Clinic booking assistant.\n      Please tell me your full name.\n    </Say>\n\n  </Gather>\n\n  <Redirect method=\"POST\">\n    https://<YOUR_DOMAIN>/webhook/twilio-ai-chat\n  </Redirect>\n</Response>",
        "options": {
          "responseHeaders": {
            "entries": [
              {
                "name": "content-type",
                "value": "text/xml"
              }
            ]
          }
        }
      },
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1.5,
      "position": [
        656,
        288
      ],
      "name": "Respond to Webhook6"
    },
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "twilio-ai-chat",
        "responseMode": "responseNode",
        "options": {}
      },
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 2.1,
      "position": [
        960,
        304
      ],
      "name": "Webhook4",
      "webhookId": "<YOUR_WEBHOOK_ID_4>"
    },
    {
      "parameters": {
        "promptType": "define",
        "text": "={{ $json.message }}",
        "options": {
          "systemMessage": "=You are SmileCare Dental Clinic's voice booking assistant answering phone calls.\nYour only job is to help callers book appointments.\n\nCURRENT DATE AND TIME: {{new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}} IST.\nClinic Hours: Monday to Saturday, 9:00 AM to 8:00 PM. Closed Sundays.\n\nSpeak in short, natural, friendly sentences suitable for phone calls. Ask only ONE question at a time.\n\nCollect booking details one at a time in this exact order:\n1. Full Name\n2. Email Address\n3. Required Treatment / Service\n4. Preferred Date\n5. Preferred Time\n\nRules:\n* DO NOT ask for the caller's phone number. Our system captures this automatically.\n* Keep replies under 20 words when possible.\n* If all details are collected, respond ONLY with the exact JSON format below. Do not add any conversational text outside the JSON.\n\nExpected Output Format at the end of call:\n{\n  \"status\": \"BOOKING_COMPLETE\",\n  \"name\": \"customer name\",\n  \"email\": \"email\",\n  \"service\": \"service name\",\n  \"date\": \"friendly date (e.g., May 16th)\",\n  \"time\": \"friendly time (e.g., 4:00 PM)\",\n  \"booking_id\": \"{{ $json.body.CallSid || Math.floor(100000 + Math.random() * 900000) }}\",\n  \"message\": \"booking completed successfully\"\n}"
        }
      },
      "type": "@n8n/n8n-nodes-langchain.agent",
      "typeVersion": 3.1,
      "position": [
        1600,
        304
      ],
      "name": "AI Agent2"
    },
    {
      "parameters": {
        "options": {}
      },
      "type": "@n8n/n8n-nodes-langchain.lmChatGroq",
      "typeVersion": 1,
      "position": [
        1552,
        496
      ],
      "name": "Groq Chat Model2",
      "credentials": {
        "groqApi": {
          "id": "<YOUR_GROQ_CREDENTIAL_ID>",
          "name": "Groq account"
        }
      }
    },
    {
      "parameters": {
        "sessionIdType": "customKey",
        "sessionKey": "={{ $json.sessionId }}",
        "contextWindowLength": 10
      },
      "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
      "typeVersion": 1.3,
      "position": [
        1696,
        496
      ],
      "name": "Simple Memory2"
    },
    {
      "parameters": {
        "mode": "raw",
        "jsonOutput": "={\n  \"message\": \"={{ $json.body.SpeechResult || '' }}\",\n  \"sessionId\": \"={{ $json.body.CallSid || '' }}\"\n}",
        "options": {}
      },
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        1248,
        304
      ],
      "name": "Edit Fields2"
    },
    {
      "parameters": {
        "jsCode": "let txt = $json.output || \"\";\n\nconst jsonMatch = txt.match(/\\{[\\s\\S]*\\}/);\n\nif (!jsonMatch) {\n  return [{\n    json: {\n      reply: txt,\n      isComplete: false\n    }\n  }];\n}\n\nconst data = JSON.parse(jsonMatch[0]);\n\nconst webhookNode = $('Webhook4').first().json;\n\nconst userPhone =\n  webhookNode.body?.From ||\n  webhookNode.From ||\n  '';\n\nreturn [{\n  json: {\n    booking_id: data.booking_id,\n    name: data.name,\n    phone: userPhone,\n    email: data.email,\n    service: data.service,\n    date: data.date,\n    time: data.time,\n    message: data.message,\n    status: data.status || 'BOOKED',\n    created_at: new Date().toISOString(),\n    isComplete: true\n  }\n}];"
      },
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        2192,
        192
      ],
      "name": "Code in JavaScript1"
    },
    {
      "parameters": {
        "operation": "append",
        "documentId": {
          "__rl": true,
          "value": "<YOUR_GOOGLE_SHEET_ID>",
          "mode": "list",
          "cachedResultName": "Calling Agent",
          "cachedResultUrl": "https://docs.google.com/spreadsheets/d/<YOUR_GOOGLE_SHEET_ID>/edit?usp=drivesdk"
        },
        "sheetName": {
          "__rl": true,
          "value": "gid=0",
          "mode": "list",
          "cachedResultName": "Agent_Lead",
          "cachedResultUrl": "https://docs.google.com/spreadsheets/d/<YOUR_GOOGLE_SHEET_ID>/edit#gid=0"
        },
        "columns": {
          "mappingMode": "defineBelow",
          "value": {
            "Booking ID": "={{$json[\"booking_id\"]}}",
            "Name": "={{$json[\"name\"]}}",
            "Phone": "={{$json[\"phone\"]}}",
            "Email": "={{$json[\"email\"]}}",
            "Service": "={{$json[\"service\"]}}",
            "Date": "={{$json[\"date\"]}}",
            "Time": "={{$json[\"time\"]}}",
            "Message": "={{$json[\"message\"]}}",
            "Status": "={{$json[\"status\"]}}",
            "Created At": "={{$json[\"created_at\"]}}"
          },
          "matchingColumns": [],
          "schema": [
            {
              "id": "Booking ID",
              "displayName": "Booking ID",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true,
              "removed": false
            },
            {
              "id": "Name",
              "displayName": "Name",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true,
              "removed": false
            },
            {
              "id": "Phone",
              "displayName": "Phone",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true,
              "removed": false
            },
            {
              "id": "Email",
              "displayName": "Email",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true,
              "removed": false
            },
            {
              "id": "Service",
              "displayName": "Service",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true,
              "removed": false
            },
            {
              "id": "Date",
              "displayName": "Date",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true,
              "removed": false
            },
            {
              "id": "Time",
              "displayName": "Time",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true,
              "removed": false
            },
            {
              "id": "Message",
              "displayName": "Message",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true,
              "removed": false
            },
            {
              "id": "Status",
              "displayName": "Status",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true,
              "removed": false
            },
            {
              "id": "Created At",
              "displayName": "Created At",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true,
              "removed": false
            }
          ],
          "attemptToConvertTypes": false,
          "convertFieldsToString": false
        },
        "options": {}
      },
      "type": "n8n-nodes-base.googleSheets",
      "typeVersion": 4.7,
      "position": [
        2448,
        192
      ],
      "name": "Append row in sheet1",
      "credentials": {
        "googleSheetsOAuth2Api": {
          "id": "<YOUR_GOOGLE_SHEETS_CREDENTIAL_ID>",
          "name": "Google Sheets account"
        }
      }
    },
    {
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": true,
            "leftValue": "",
            "typeValidation": "strict",
            "version": 3
          },
          "conditions": [
            {
              "leftValue": "={{ $json.output }}",
              "rightValue": "BOOKING_COMPLETE",
              "operator": {
                "type": "string",
                "operation": "contains"
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      },
      "type": "n8n-nodes-base.if",
      "typeVersion": 2.3,
      "position": [
        1920,
        304
      ],
      "name": "If1"
    },
    {
      "parameters": {
        "respondWith": "text",
        "responseBody": "<Response>\n  <Gather input=\"speech\"\n          action=\"https://<YOUR_DOMAIN>/webhook/twilio-ai-chat\"\n          method=\"POST\"\n          speechTimeout=\"auto\"\n          timeout=\"8\">\n\n    <Say voice=\"Google.en-US-Neural2-F\">\n      Thank you {{ $json[\"name\"] }}. Your dental appointment booking has been completed successfully and your details are saved. Is there anything else I can help you with?\n    </Say>\n\n  </Gather>\n\n  <Say voice=\"Google.en-US-Neural2-F\">\n    Thank you for calling SmileCare. Goodbye.\n  </Say>\n\n  <Hangup/>\n</Response>",
        "options": {}
      },
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1.5,
      "position": [
        3056,
        192
      ],
      "name": "Respond to Webhook8"
    },
    {
      "parameters": {
        "respondWith": "text",
        "responseBody": "=<Response>\n <Gather input=\"speech\"\n        language=\"en-IN\"\n          action=\"https://<YOUR_DOMAIN>/webhook/twilio-ai-chat\"\n          method=\"POST\"\n          speechTimeout=\"auto\"\n          timeout=\"8\">\n\n    <Say voice=\"Google.en-US-Neural2-F\">\n      {{ $json.reply || $json.output }}\n    </Say>\n\n  </Gather>\n\n  <Say voice=\"Google.en-US-Neural2-F\">\n    I did not hear anything.\n    Goodbye.\n  </Say>\n\n  <Hangup/>\n</Response>",
        "options": {}
      },
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1.5,
      "position": [
        2736,
        320
      ],
      "name": "Respond to Webhook7"
    }
  ],
  "connections": {
    "Webhook1": {
      "main": [
        [
          {
            "node": "Edit Fields",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "AI Agent": {
      "main": [
        [
          {
            "node": "Respond to Webhook1",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Groq Chat Model": {
      "ai_languageModel": [
        [
          {
            "node": "AI Agent",
            "type": "ai_languageModel",
            "index": 0
          }
        ]
      ]
    },
    "Simple Memory": {
      "ai_memory": [
        [
          {
            "node": "AI Agent",
            "type": "ai_memory",
            "index": 0
          }
        ]
      ]
    },
    "Edit Fields": {
      "main": [
        [
          {
            "node": "AI Agent",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Switch": {
      "main": [
        [
          {
            "node": "Respond to Webhook",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Respond to Webhook6",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Respond to Webhook4",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Webhook3": {
      "main": [
        [
          {
            "node": "Switch",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Webhook4": {
      "main": [
        [
          {
            "node": "Edit Fields2",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "AI Agent2": {
      "main": [
        [
          {
            "node": "If1",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Groq Chat Model2": {
      "ai_languageModel": [
        [
          {
            "node": "AI Agent2",
            "type": "ai_languageModel",
            "index": 0
          }
        ]
      ]
    },
    "Simple Memory2": {
      "ai_memory": [
        [
          {
            "node": "AI Agent2",
            "type": "ai_memory",
            "index": 0
          }
        ]
      ]
    },
    "Edit Fields2": {
      "main": [
        [
          {
            "node": "AI Agent2",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Code in JavaScript1": {
      "main": [
        [
          {
            "node": "Append row in sheet1",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Append row in sheet1": {
      "main": [
        [
          {
            "node": "Respond to Webhook8",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "If1": {
      "main": [
        [
          {
            "node": "Code in JavaScript1",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Respond to Webhook7",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "pinData": {},
  "meta": {
    "templateCredsSetupCompleted": true,
    "instanceId": "<YOUR_INSTANCE_ID>"
  }
}
```</PLACEHOLDER>
