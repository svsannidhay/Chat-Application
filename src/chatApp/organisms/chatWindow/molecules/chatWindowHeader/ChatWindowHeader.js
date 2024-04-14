import React, { useMemo, memo } from 'react';
import PropTypes from 'prop-types';

// Constants
import {
  AVATAR_ALT,
  EMPTY_OBJECT,
  NO_CONVERSATION_SELECTED,
} from '../../../../constants/chatApp.general';

// Helpers
import { getUserInfoToRender } from './helpers/chatWindowHeader.general';

// Styles
import style from './chatWindowHeader.module.css';

const ChatWindowHeader = (props) => {
  const { selectedUserId, userMetadata, currentUserInfo } = props;

  const { name, avatar } = useMemo(
    () => getUserInfoToRender(userMetadata[selectedUserId], currentUserInfo),
    [userMetadata, selectedUserId, currentUserInfo]
  );

  return (
    <div className={style.chatWindowHeader}>
      <div className={style.userInfo}>
        <img className={style.avatar} src={avatar} alt={AVATAR_ALT} />
        <div className={style.userName}>{name || NO_CONVERSATION_SELECTED}</div>
      </div>
    </div>
  );
};

ChatWindowHeader.propTypes = {
  selectedUserId: PropTypes.string,
  userMetadata: PropTypes.object,
  currentUserInfo: PropTypes.object,
};

ChatWindowHeader.defaultProps = {
  selectedUserId: undefined,
  userMetadata: EMPTY_OBJECT,
  currentUserInfo: EMPTY_OBJECT,
};

export default memo(ChatWindowHeader);
