const CONVERSATION_MAPPING = {
  "1": [
    {
      message: "Hey",
      id: '1',
      senderId: '01',
      thread: "2",
    },
    {
      message: "What's Up",
      id: '2',
      senderId: '02',
      thread: undefined,
    },
    {
      message: "Nothing Man, how about you ?",
      id: '3',
      senderId: '01',
      thread: undefined,
    },
    {
      message: "Nothing much just solving problems!",
      id: '4',
      senderId: '02',
      thread: undefined,
    },
  ],
  "2": [
    {
      message: "Hey, Nested 1 level",
      id: '5',
      senderId: '01',
      thread: undefined,
    },
    {
      message: "What's Up, Nested 1 level",
      id: '6',
      senderId: '02',
      thread: "3",
    },
  ],
  "3": [
    {
      message: "Hey, Nested 2 level",
      id: '7',
      senderId: '01',
      thread: undefined,
    },
  ]
};

export default CONVERSATION_MAPPING;
