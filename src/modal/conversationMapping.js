const CONVERSATION_MAPPING = {
  "1": [
    {
      message: "These are UI hardcoded for my user.",
      id: '1',
      senderId: '01',
      thread: "2",
    },
    {
      message: "I have put these for your reference.",
      id: '2',
      senderId: '02',
      thread: undefined,
    },
    {
      message: "This was a great project to work on",
      id: '3',
      senderId: '01',
      thread: undefined,
    },
    {
      message: "Learned how complicated the slack and teams actually are",
      id: '4',
      senderId: '02',
      thread: undefined,
    },
  ],
  "2": [
    {
      message: "Nesting example",
      id: '5',
      senderId: '01',
      thread: undefined,
    },
    {
      message: "Level 1 Nesting",
      id: '6',
      senderId: '02',
      thread: "3",
    },
  ],
  "3": [
    {
      message: "Level 2 Nesting",
      id: '7',
      senderId: '01',
      thread: undefined,
    },
  ]
};

export default CONVERSATION_MAPPING;
