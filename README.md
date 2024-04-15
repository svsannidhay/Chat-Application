# Chat-Application

Application Overview
1. User List Toggle on the Left sidebar to select the user we want to chat with.
2. Chat Window to view the conversation history.
    1. Each Chat Window have a main conversation thread running. 
    2. Each message can have its own reply thread like slack. 

Contracts / Modal 
1. User List Users:
   ```
     [ 
       userId: {
         name: String,
         conversationId: String 
       }          
     ]
   ```
2. ConversationIds Map (hardcoding on UI because of no BE, ideally conversation should be fetched from BE)  
   ```
   Conversations: {    
     conversationId: [       
       { 
          message: String, 
          id: String,              
          senderId: String              
          thread: ConversationId,       
        }    
      ] 
   }
   ```
3. Message should be an object with the following structure.  
   ```   
    Message : {     
      message: String,
      id: String,     
      senderId: String     
      thread: ConversationId, 
    }
   ```
Code Architecture 
1. API Assumptions  
    1. User listing API to list all the users the current user is communicating with. 
    2. Assuming we have an API which return a list of messages for a particular user conversation selected, which each message structure like I have mentioned in the contracts below.
    3. Assuming we have an API to pull the conversation thread and again sends the same array of message like above call.
    4. Edit message API. 
    5. Send Conversation Message API. 
    6. Send Thread Message API. 
2. Since we are going to use Backend for this application we are going to have few hacks to replicate some flows.
    1. To replicate the thread flow, ideal case should be to fetch the message for a thread. But since we are short on BE, we will maintain a conversationId Mapping and generate the conversationIds on the UI (lets keep Current time Epoch as a conversationId, this will obviously fail incase of a large number of users because 2 users can initiate a chat at the same time so ideally conversationIds must be maintained from BE)


UI State management 
For the Chat History I am follwing a nested sructure which recursively renders the chat to have infinite level of nesting in threads. 
```
[
    {
        "message": "Hey",
        "id": "1",
        "senderId": "01",
        "thread": "2",
        "threadMessages": [
            {
                "message": "Hey, Nested 1 level",
                "id": "5",
                "senderId": "01",
                "threadMessages": [],
                "path": [
                    "1"
                ],
                "parentThread": "2"
            },
            {
                "message": "What's Up, Nested 1 level",
                "id": "6",
                "senderId": "02",
                "thread": "3",
                "threadMessages": [
                    {
                        "message": "Hey, Nested 2 level",
                        "id": "7",
                        "senderId": "01",
                        "threadMessages": [],
                        "path": [
                            "1",
                            "6"
                        ],
                        "parentThread": "3"
                    }
                ],
                "path": [
                    "1"
                ],
                "parentThread": "2"
            }
        ],
        "path": [],
        "parentThread": "1"
    },
    {
        "message": "What's Up",
        "id": "2",
        "senderId": "02",
        "threadMessages": [],
        "path": [],
        "parentThread": "1"
    },
    {
        "message": "Nothing Man, how about you ?",
        "id": "3",
        "senderId": "01",
        "threadMessages": [],
        "path": [],
        "parentThread": "1"
    },
    {
        "message": "Nothing much just solving problems!",
        "id": "4",
        "senderId": "02",
        "threadMessages": [],
        "path": [],
        "parentThread": "1"
    }
]
```

parentThread is being used to update the Modal, since we don't have any DB.
