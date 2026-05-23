{
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "twilio-call",
        "responseMode": "responseNode"
      },
      "id": "1",
      "name": "Webhook Main",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 2,
      "position": [
        -1000,
        300
      ],
      "webhookId": "twilio-call"
    },
    {
      "parameters": {
        "rules": {
          "values": [
            {
              "conditions": {
                "conditions": [
                  {
                    "leftValue": "={{ String($json.body.Digits || '') }}",
                    "rightValue": "1",
                    "operator": {
                      "type": "string",
                      "operation": "equals"
                    }
                  }
                ]
              }
            },
            {
              "conditions": {
                "conditions": [
                  {
                    "leftValue": "={{ String($json.body.Digits || '') }}",
                    "rightValue": "2",
                    "operator": {
                      "type": "string",
                      "operation": "equals"
                    }
                  }
                ]
              }
            }
          ]
        },
        "options": {
          "fallbackOutput": "extra"
        }
      },
      "id": "2",
      "name": "Switch",
      "type": "n8n-nodes-base.switch",
      "typeVersion": 3,
      "position": [
        -760,
        300
      ]
    },
    {
      "parameters": {
        "respondWith": "text",
        "responseBody": "<Response>\n<Gather input=\"speech\" action=\"https://YOUR-NGROK/webhook/twilio-general-ai\" method=\"POST\" speechTimeout=\"auto\" timeout=\"6\" language=\"en-IN\">\n<Say voice=\"alice\">Ask me anything.</Say>\n</Gather>\n</Response>",
        "options": {
          "responseHeaders": {
            "entries": [
              {
                "name": "Content-Type",
                "value": "text/xml"
              }
            ]
          }
        }
      },
      "id": "3",
      "name": "General AI Start",
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1,
      "position": [
        -420,
        120
      ]
    },
    {
      "parameters": {
        "respondWith": "text",
        "responseBody": "<Response>\n<Gather input=\"speech\" action=\"https://YOUR-NGROK/webhook/twilio-ai-chat\" method=\"POST\" speechTimeout=\"auto\" timeout=\"8\" language=\"en-IN\">\n<Say voice=\"alice\">Welcome to SmileCare. Please tell me your full name.</Say>\n</Gather>\n</Response>",
        "options": {
          "responseHeaders": {
            "entries": [
              {
                "name": "Content-Type",
                "value": "text/xml"
              }
            ]
          }
        }
      },
      "id": "4",
      "name": "Booking Start",
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1,
      "position": [
        -420,
        320
      ]
    },
    {
      "parameters": {
        "respondWith": "text",
        "responseBody": "<Response>\n<Gather numDigits=\"1\" action=\"https://YOUR-NGROK/webhook/twilio-call\" method=\"POST\">\n<Say voice=\"alice\">\nWelcome to SmileCare Dental Clinic.\nPress 1 for AI Assistant.\nPress 2 for Appointment Booking.\n</Say>\n</Gather>\n<Say>No input received. Goodbye.</Say>\n</Response>",
        "options": {
          "responseHeaders": {
            "entries": [
              {
                "name": "Content-Type",
                "value": "text/xml"
              }
            ]
          }
        }
      },
      "id": "5",
      "name": "Main Menu",
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1,
      "position": [
        -420,
        520
      ]
    },
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "twilio-general-ai",
        "responseMode": "responseNode"
      },
      "id": "6",
      "name": "Webhook General AI",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 2,
      "position": [
        -60,
        120
      ],
      "webhookId": "twilio-general-ai"
    },
    {
      "parameters": {
        "mode": "raw",
        "jsonOutput": "={\n\"message\":\"={{$json.body.SpeechResult || 'hello'}}\",\n\"sessionId\":\"={{$json.body.CallSid}}\"\n}"
      },
      "id": "7",
      "name": "Set General AI",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3,
      "position": [
        180,
        120
      ]
    },
    {
      "parameters": {
        "promptType": "define",
        "text": "={{$json.message}}"
      },
      "id": "8",
      "name": "AI Agent",
      "type": "@n8n/n8n-nodes-langchain.agent",
      "typeVersion": 3,
      "position": [
        420,
        120
      ]
    },
    {
      "parameters": {
        "model": "llama-3.1-8b-instant"
      },
      "id": "9",
      "name": "Groq Model",
      "type": "@n8n/n8n-nodes-langchain.lmChatGroq",
      "typeVersion": 1,
      "position": [
        420,
        300
      ],
      "credentials": {
        "groqApi": {
          "id": "YOUR_ID",
          "name": "Groq"
        }
      }
    },
    {
      "parameters": {
        "sessionIdType": "customKey",
        "sessionKey": "={{$json.sessionId}}"
      },
      "id": "10",
      "name": "Memory",
      "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
      "typeVersion": 1,
      "position": [
        620,
        300
      ]
    },
    {
      "parameters": {
        "respondWith": "text",
        "responseBody": "=<Response>\n<Gather input=\"speech\" action=\"https://YOUR-NGROK/webhook/twilio-general-ai\" method=\"POST\" speechTimeout=\"auto\" timeout=\"6\">\n<Say voice=\"alice\">{{$json.output}}</Say>\n</Gather>\n</Response>",
        "options": {
          "responseHeaders": {
            "entries": [
              {
                "name": "Content-Type",
                "value": "text/xml"
              }
            ]
          }
        }
      },
      "id": "11",
      "name": "General AI Reply",
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1,
      "position": [
        860,
        120
      ]
    },
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "twilio-ai-chat",
        "responseMode": "responseNode"
      },
      "id": "12",
      "name": "Webhook Booking",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 2,
      "position": [
        -60,
        520
      ],
      "webhookId": "twilio-ai-chat"
    },
    {
      "parameters": {
        "mode": "raw",
        "jsonOutput": "={\n\"message\":\"={{$json.body.SpeechResult || ''}}\",\n\"sessionId\":\"={{$json.body.CallSid}}\"\n}"
      },
      "id": "13",
      "name": "Set Booking",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3,
      "position": [
        180,
        520
      ]
    },
    {
      "parameters": {
        "promptType": "define",
        "text": "={{$json.message}}",
        "options": {
          "systemMessage": "You are SmileCare Dental Assistant.\nAsk one question at a time.\nCollect:\n1 Name\n2 Email\n3 Service\n4 Date\n5 Time\n\nWhen complete return ONLY JSON:\n{\n\"status\":\"BOOKING_COMPLETE\",\n\"name\":\"\",\n\"email\":\"\",\n\"service\":\"\",\n\"date\":\"\",\n\"time\":\"\",\n\"booking_id\":\"AUTO\",\n\"message\":\"booking completed\"\n}"
        }
      },
      "id": "14",
      "name": "Booking AI",
      "type": "@n8n/n8n-nodes-langchain.agent",
      "typeVersion": 3,
      "position": [
        420,
        520
      ]
    },
    {
      "parameters": {
        "model": "llama-3.1-8b-instant"
      },
      "id": "15",
      "name": "Booking Model",
      "type": "@n8n/n8n-nodes-langchain.lmChatGroq",
      "typeVersion": 1,
      "position": [
        420,
        720
      ],
      "credentials": {
        "groqApi": {
          "id": "YOUR_ID",
          "name": "Groq"
        }
      }
    },
    {
      "parameters": {
        "sessionIdType": "customKey",
        "sessionKey": "={{$json.sessionId}}"
      },
      "id": "16",
      "name": "Booking Memory",
      "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
      "typeVersion": 1,
      "position": [
        620,
        720
      ]
    },
    {
      "parameters": {
        "jsCode": "let txt = $json.output || '';\nconst match = txt.match(/\\{[\\s\\S]*\\}/);\n\nif(!match){\nreturn [{json:{reply:txt,isComplete:false}}];\n}\n\nlet data = JSON.parse(match[0]);\n\nreturn [{\njson:{\nstatus:data.status,\nname:data.name,\nemail:data.email,\nservice:data.service,\ndate:data.date,\ntime:data.time,\nbooking_id:data.booking_id,\nmessage:data.message,\nisComplete:true\n}\n}];"
      },
      "id": "17",
      "name": "Parse JSON",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        700,
        520
      ]
    },
    {
      "parameters": {
        "conditions": {
          "conditions": [
            {
              "leftValue": "={{$json.status}}",
              "rightValue": "BOOKING_COMPLETE",
              "operator": {
                "type": "string",
                "operation": "equals"
              }
            }
          ]
        }
      },
      "id": "18",
      "name": "IF Complete",
      "type": "n8n-nodes-base.if",
      "typeVersion": 2,
      "position": [
        920,
        520
      ]
    },
    {
      "parameters": {
        "operation": "append",
        "documentId": "YOUR_SHEET_ID",
        "sheetName": "Sheet1",
        "columns": {
          "mappingMode": "defineBelow",
          "value": {
            "Name": "={{$json.name}}",
            "Email": "={{$json.email}}",
            "Service": "={{$json.service}}",
            "Date": "={{$json.date}}",
            "Time": "={{$json.time}}"
          }
        }
      },
      "id": "19",
      "name": "Google Sheets",
      "type": "n8n-nodes-base.googleSheets",
      "typeVersion": 4,
      "position": [
        1160,
        420
      ]
    },
    {
      "parameters": {
        "respondWith": "text",
        "responseBody": "=<Response>\n<Say voice=\"alice\">Thank you {{$json.name}}. Your appointment is booked successfully.</Say>\n<Hangup/>\n</Response>",
        "options": {
          "responseHeaders": {
            "entries": [
              {
                "name": "Content-Type",
                "value": "text/xml"
              }
            ]
          }
        }
      },
      "id": "20",
      "name": "Booking Success",
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1,
      "position": [
        1400,
        420
      ]
    },
    {
      "parameters": {
        "respondWith": "text",
        "responseBody": "=<Response>\n<Gather input=\"speech\" action=\"https://YOUR-NGROK/webhook/twilio-ai-chat\" method=\"POST\" speechTimeout=\"auto\" timeout=\"8\">\n<Say voice=\"alice\">{{$json.reply}}</Say>\n</Gather>\n</Response>",
        "options": {
          "responseHeaders": {
            "entries": [
              {
                "name": "Content-Type",
                "value": "text/xml"
              }
            ]
          }
        }
      },
      "id": "21",
      "name": "Booking Continue",
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1,
      "position": [
        1160,
        660
      ]
    }
  ],
  "connections": {
    "Webhook Main": {
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
    "Switch": {
      "main": [
        [
          {
            "node": "General AI Start",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Booking Start",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Main Menu",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Webhook General AI": {
      "main": [
        [
          {
            "node": "Set General AI",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Set General AI": {
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
    "Groq Model": {
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
    "Memory": {
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
    "AI Agent": {
      "main": [
        [
          {
            "node": "General AI Reply",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Webhook Booking": {
      "main": [
        [
          {
            "node": "Set Booking",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Set Booking": {
      "main": [
        [
          {
            "node": "Booking AI",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Booking Model": {
      "ai_languageModel": [
        [
          {
            "node": "Booking AI",
            "type": "ai_languageModel",
            "index": 0
          }
        ]
      ]
    },
    "Booking Memory": {
      "ai_memory": [
        [
          {
            "node": "Booking AI",
            "type": "ai_memory",
            "index": 0
          }
        ]
      ]
    },
    "Booking AI": {
      "main": [
        [
          {
            "node": "Parse JSON",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Parse JSON": {
      "main": [
        [
          {
            "node": "IF Complete",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "IF Complete": {
      "main": [
        [
          {
            "node": "Google Sheets",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Booking Continue",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Google Sheets": {
      "main": [
        [
          {
            "node": "Booking Success",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  }
}
