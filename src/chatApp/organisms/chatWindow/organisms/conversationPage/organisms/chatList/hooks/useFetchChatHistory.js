import { useState, useEffect } from 'react';

// Constants
import CONVERSATION_MAPPING from '../../../../../../../../modal/conversationMapping';
import { EMPTY_ARRAY } from '../../../../../../../constants/chatApp.general';

const useFetchChatHistory = (selectedUserId) => {
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    const updatedChatHistory = CONVERSATION_MAPPING[selectedUserId] || EMPTY_ARRAY
    setChatHistory(updatedChatHistory);
  }, [selectedUserId]);
  
  return {
    chatHistory,
    setChatHistory,
  }
};

export default useFetchChatHistory;
