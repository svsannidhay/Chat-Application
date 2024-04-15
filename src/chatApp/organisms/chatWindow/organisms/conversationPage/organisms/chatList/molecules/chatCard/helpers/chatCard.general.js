import { produce } from 'immer';
import moment from 'moment';

// Lodash
import _size from 'lodash/size';
import _reduce from 'lodash/reduce';
import _find from 'lodash/find';

// Constants
import { INDENTATION } from '../constants/chatCard.general';
import {
  EMPTY_ARRAY,
  EMPTY_OBJECT,
} from '../../../../../../../../../constants/chatApp.general';
import CONVERSATION_MAPPING from '../../../../../../../../../../modal/conversationMapping';

export const getNestedMessageListStyle = (chat) => {
  const { path } = chat;
  return {
    marginLeft: (_size(path) + 1) * INDENTATION,
  };
};

const isSearchedMessage = (messageId) => (message) => message?.id === messageId;

const searchThreadMessage = (currentNode, messageId) => {
  const pathMessageNode =
    _find(currentNode, isSearchedMessage(messageId)) || EMPTY_OBJECT;
  return pathMessageNode.threadMessages;
};

const linkThreadToMessageInConversationMappingModal = (
  finalMessage = EMPTY_OBJECT,
  newThread
) => {
  const { parentThread } = finalMessage;
  const thread = CONVERSATION_MAPPING[parentThread];
  const messageToLinkThreadTo = _find(
    thread,
    isSearchedMessage(finalMessage.id)
  );
  messageToLinkThreadTo.thread = newThread;
};

const updateConversationMappingModal = ({
  finalMessage = EMPTY_OBJECT,
  newMessageInfo = EMPTY_OBJECT,
  thread: newThread,
  oldThread,
}) => {
  const newWritableMessage = {};
  Object.defineProperties(newWritableMessage, {
    message: {
      value: newMessageInfo.message,
      enumerable: true,
    },
    id: {
      value: newMessageInfo.id,
      enumerable: true,
    },
    senderId: { value: newMessageInfo.senderId, enumerable: true },
    thread: { value: undefined, writable: true, enumerable: true },
  });
  if (oldThread) {
    CONVERSATION_MAPPING[oldThread].push(newWritableMessage);
  } else {
    CONVERSATION_MAPPING[newThread] = [newWritableMessage];
    linkThreadToMessageInConversationMappingModal(finalMessage, newThread);
  }
};

export const handleMessageReply = ({
  currentUserInfo = EMPTY_OBJECT,
  setChatHistory,
  chat = EMPTY_OBJECT,
  chatHistory,
  newMessage,
}) => {
  const { path = EMPTY_ARRAY, id } = chat;
  const newMessageId = moment().valueOf();

  const updatedChatHistory = produce(chatHistory, (draftChatHistory) => {
    const finalThread = _reduce(path, searchThreadMessage, draftChatHistory);
    const finalMessage =
      _find(finalThread, isSearchedMessage(id)) || EMPTY_OBJECT;
    const oldThread = finalMessage.thread;
    const thread = finalMessage.thread ? finalMessage.thread : moment().valueOf();
    const newMessageInfo = {
      message: newMessage,
      id: newMessageId,
      threadMessages: [],
      path: [...path, id],
      senderId: currentUserInfo.id,
      thread: undefined,
      parentThread: thread,
    };
    finalMessage.threadMessages.push(newMessageInfo);
    finalMessage.thread = thread;
    updateConversationMappingModal({ finalMessage, newMessageInfo, thread, oldThread });
  });
  setChatHistory(updatedChatHistory);
};
