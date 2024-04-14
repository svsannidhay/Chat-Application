// Constants
import USER_LIST from '../../modal/userMapping';

// Replicating the User Fetching API
export const fetchUserMetadata = (setUserMetadata, setCurrentUserInfo) => {
  setUserMetadata(USER_LIST);
  setCurrentUserInfo(USER_LIST["01"]);
}