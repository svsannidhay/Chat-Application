import { useState, useEffect } from 'react';

// Lodash
import _map from 'lodash/map';

// Constants
import CONVERSATION_MAPPING from '../../../../../../modal/conversationMapping';
import { EMPTY_ARRAY, EMPTY_OBJECT } from '../../../../../constants/chatApp.general';

const addNestedChatHistoryNode = (path, parentThread) => (messageInfo) => {
  const { thread: threadConversationId, id } = messageInfo;

  const flatThreadChatHistory = CONVERSATION_MAPPING[threadConversationId] || EMPTY_ARRAY;



  const updatedPath = [...path, id];

  return {
    ...messageInfo,
    threadMessages:  _map(flatThreadChatHistory, addNestedChatHistoryNode(updatedPath, threadConversationId)),
    path,
    parentThread,
  };
}

const createNestedChatHistoryTree = (flatChatHistory, conversationId) => {
  const path = [];
  const parentThread = conversationId;
  return _map(flatChatHistory, addNestedChatHistoryNode(path, parentThread));
};

const useFetchChatHistory = (selectedUserId, userMetadata) => {
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    const selectedUserInfo = userMetadata[selectedUserId] || EMPTY_OBJECT;
    const { conversationId } = selectedUserInfo;
    const flatChatHistory = CONVERSATION_MAPPING[conversationId] || EMPTY_ARRAY;
    const nestedChatHistory = createNestedChatHistoryTree(flatChatHistory, conversationId);
    setChatHistory(nestedChatHistory);
  }, [selectedUserId, userMetadata]);
  
  return {
    chatHistory,
    setChatHistory,
  }
};

export default useFetchChatHistory;
