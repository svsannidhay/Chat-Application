import React, { useCallback, useMemo, memo } from 'react';
import PropTypes from 'prop-types';

// Lodash
import _noop from 'lodash/noop';

// Constants
import { AVATAR_ALT, DEFAULT_AVATAR_SRC, EMPTY_OBJECT } from '../../../../constants/chatApp.general';

// Helpers
import { getDisplayName, getSelectedClassName, getStyles } from './helpers/userList.general';

// Styles
import style from './userList.module.css';

const UserList = (props) => {
  const { userMetadata, selectedUserId, setSelectedUserId, height, currentUserInfo } = props;

  const renderUser = useCallback(
    (userId) => {
      const userData = userMetadata[userId] || EMPTY_OBJECT;
      const selectedClassName = getSelectedClassName(userId, selectedUserId);
      const displayName = getDisplayName(userData, currentUserInfo);
      const { avatar = DEFAULT_AVATAR_SRC } = userData;
      return (
        <div
          className={`${style.user} ${selectedClassName}`}
          onClick={() => setSelectedUserId(userId)}
        >
          <img className={style.avatar} src={avatar} alt={AVATAR_ALT}/>
          <div className={style.userName}>{displayName}</div>
        </div>
      );
    },
    [userMetadata, selectedUserId, setSelectedUserId, currentUserInfo]
  );

  const userListContainerStyles = useMemo(() => getStyles(height), [height]);

  return (
    <div className={style.userListContainer} style={userListContainerStyles}>
      <div className={style.userList}>
        {Object.keys(userMetadata).map(renderUser)}
      </div>
    </div>
  );
};

UserList.propTypes = {
  userMetadata: PropTypes.object,
  currentUserInfo: PropTypes.object,
  selectedUserId: PropTypes.string,
  setSelectedUserId: PropTypes.func,
  height: PropTypes.number,
};

UserList.defaultProps = {
  userMetadata: EMPTY_OBJECT,
  currentUserInfo: EMPTY_OBJECT,
  selectedUserId: '',
  setSelectedUserId: _noop,
  height: 0,
};

export default memo(UserList);
