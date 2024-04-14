// Constants
import { CONVERSATION_PAGE_MESSAGE_INPUT_HEIGHT } from '../constants/conversationPage.general';

export const getChatListContainerStyle = (height) => ({
  height: height - CONVERSATION_PAGE_MESSAGE_INPUT_HEIGHT,
})