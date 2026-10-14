const extensionInitiatorDomain = new URL(extApi.runtime.getURL("")).hostname;

const rules=[
    {
      "id": 1,
      "priority": 1,
      "action": {
        "type": "modifyHeaders",
        "requestHeaders": [
          { "header": "origin", "operation": "set", "value": "https://www.icloud.com" },
          { "header": "Referer", "operation": "set", "value": "https://www.icloud.com/applications/mail/current/ko-kr/index.html?" }
        ]
      },
      "condition": { "initiatorDomains": [extensionInitiatorDomain],  
        "regexFilter": "^http.?://.+?\\.icloud\\.com/(setup|mailws2)/.*", "resourceTypes": ["xmlhttprequest"] }
    },
    {
        "id": 2,
        "priority": 1,
        "action": {
          "type": "modifyHeaders",
          "requestHeaders": [
            { "header": "origin", "operation": "set", "value": "https://mail.daum.net" },
            { "header": "Referer", "operation": "set", "value": "https://mail.daum.net" }
          ]
        },
        "condition": { "initiatorDomains": [extensionInitiatorDomain], 
          "urlFilter": "*://cmail.daum.net/*", "resourceTypes": ["xmlhttprequest"] }
    },
    {
        "id": 3,
        "priority": 1,
        "action": {
          "type": "modifyHeaders",
          "requestHeaders": [
            { "header": "origin", "operation": "set", "value": "https://mail.naver.com" }
          ] 
        },
        "condition": { "initiatorDomains": [extensionInitiatorDomain], 
          "urlFilter": "*://mail.naver.com/*", "resourceTypes": ["xmlhttprequest"] }
    },
    {
        "id": 4,
        "priority": 1,
        "action": {
          "type": "modifyHeaders",
          "requestHeaders": [
            { "header": "origin", "operation": "set", "value": "https://mail.aol.com" }
          ]
        },
        "condition": { "initiatorDomains": [extensionInitiatorDomain], 
          "urlFilter": "*://mail.aol.com/*", "resourceTypes": ["xmlhttprequest"] }
    },
    {
        "id": 5,
        "priority": 1,
        "action": {
          "type": "modifyHeaders",
          "requestHeaders": [
            { "header": "origin", "operation": "set", "value": "https://mail.yahoo.com" },
            { "header": "Referer", "operation": "set", "value": "https://mail.yahoo.com/" }
          ]
        },
        "condition": { "initiatorDomains": [extensionInitiatorDomain],
          "urlFilter": "*://mail.yahoo.com/ws/v3/*", "resourceTypes": ["xmlhttprequest"] }
    },
    {
        "id": 6,
        "priority": 1,
        "action": {
          "type": "modifyHeaders",
          "requestHeaders": [
            { "header": "origin", "operation": "set", "value": "https://outlook.live.com" },
            { "header": "Referer", "operation": "set", "value": "https://outlook.live.com/" }
          ]
        },
        "condition": { "initiatorDomains": [extensionInitiatorDomain],
          "urlFilter": "*://outlook.live.com/owa/*", "resourceTypes": ["xmlhttprequest"] }
    },
    {
        "id": 7,
        "priority": 1,
        "action": {
          "type": "modifyHeaders",
          "requestHeaders": [
            { "header": "origin", "operation": "set", "value": "https://mail.google.com" },
            { "header": "Referer", "operation": "set", "value": "https://mail.google.com/" }
          ]
        },
        "condition": { "initiatorDomains": [extensionInitiatorDomain],
          "urlFilter": "*://mail.google.com/mail/u/*/s/*", "resourceTypes": ["xmlhttprequest"] }
    }
  ]