import { produce } from 'immer';
import moment from 'moment';

// Constants
import { EMPTY_ARRAY, EMPTY_OBJECT } from '../../../../../constants/chatApp.general';
import { CONVERSATION_PAGE_MESSAGE_INPUT_HEIGHT } from '../constants/conversationPage.general';
import CONVERSATION_MAPPING from '../../../../../../modal/conversationMapping';

export const getChatListContainerStyle = (height) => ({
  height: height - CONVERSATION_PAGE_MESSAGE_INPUT_HEIGHT,
});

const handleUpdateConversationMap = ({ updatedConversationId, messageInfo }) => {
  const newWritableMessage = {};
  Object.defineProperties(newWritableMessage, {
    message: {
      value: messageInfo.message,
      enumerable: true,
    },
    id: {
      value: messageInfo.id,
      enumerable: true,
    },
    senderId: { value: messageInfo.senderId, enumerable: true },
    thread: { value: undefined, writable: true, enumerable: true },
  });

  const conversationMap = CONVERSATION_MAPPING[updatedConversationId]

  if (conversationMap) conversationMap.push(newWritableMessage)
  else CONVERSATION_MAPPING[updatedConversationId] = [newWritableMessage];
}

export const handleMessageSubmit = ({
  selectedUserId,
  userMetadata = EMPTY_OBJECT,
  currentUserInfo = EMPTY_OBJECT,
  chatHistory = EMPTY_ARRAY,
  setChatHistory,
  message,
  setUserMetadata,
}) => {

  const selectedUserInfo = userMetadata[selectedUserId] || EMPTY_OBJECT;
  const { conversationId } = selectedUserInfo;

  const updatedConversationId = conversationId || moment().valueOf();
  
  const updatedUserMetadata = produce(userMetadata, (draftUserMetadata) => {
    const selectedUserInfo = draftUserMetadata[selectedUserId] || EMPTY_OBJECT;
    selectedUserInfo.conversationId = updatedConversationId;
  });

  setUserMetadata(updatedUserMetadata);

  const messageInfo = {
    message,
    id: moment().valueOf(),
    senderId:  currentUserInfo.id,
    thread: undefined,
    path: [],
    threadMessages: [],
    parentThread:updatedConversationId,
  }

  const updatedChatHistory = produce(chatHistory, (draftChatHistory) => {
    draftChatHistory.push(messageInfo);
  });

  handleUpdateConversationMap({ updatedConversationId, messageInfo });
  setChatHistory(updatedChatHistory);
};
