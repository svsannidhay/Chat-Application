import React, { memo } from 'react';

// Styles
import style from './conversationListHeader.module.css';

// This should be internationalized
const CONVERSATION_LIST_HEADER_TEXT = 'Chat';

const ConversationListHeader = () => {
  return (
    <div className={style.conversationListHeader}>
      <div className={style.conversationListHeaderText}>
        {CONVERSATION_LIST_HEADER_TEXT}
      </div>
    </div>
  );
};

export default memo(ConversationListHeader);
