import React from 'react';
import PropTypes from 'prop-types';

// Lodash
import _noop from 'lodash/noop';

// Components
import ConversationListHeader from './molecules/conversationListHeader';

// Constants
import { EMPTY_OBJECT } from '../../constants/chatApp.general';

// Styles
import style from './conversations.module.css';
import UserList from './molecules/userList';

const ConversationList = (props) => {
  const { userMetadata, selectedUserId, setSelectedUserId, height, currentUserInfo } = props;

  return (
    <div className={style.conversationsContainer}>
      <ConversationListHeader />
      <UserList 
        userMetadata={userMetadata} 
        selectedUserId={selectedUserId} 
        setSelectedUserId={setSelectedUserId} 
        height={height} 
        currentUserInfo={currentUserInfo}
      />
    </div>
  );
};

ConversationList.propTypes = {
  userMetadata: PropTypes.object,
  selectedUserId: PropTypes.string,
  setSelectedUserId: PropTypes.func,
  currentUserInfo: PropTypes.object,
  height: PropTypes.number,
};

ConversationList.defaultProps = {
  userMetadata: EMPTY_OBJECT,
  currentUserInfo: EMPTY_OBJECT,
  selectedUserId: '',
  setSelectedUserId: _noop,
  height:0,
};

export default ConversationList;
