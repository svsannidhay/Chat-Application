import { useState, useEffect } from 'react';

// Services
import { fetchUserMetadata } from '../services/chatApp.userMetadata';

const useFetchUserMetadata = () => {
  const [userMetadata, setUserMetadata] = useState({});
  const [currentUserInfo, setCurrentUserInfo] = useState({});

  useEffect(() => {
    fetchUserMetadata(setUserMetadata, setCurrentUserInfo)
  }, []);

  return {
    userMetadata,
    currentUserInfo,
    setUserMetadata,
  }
};

export default useFetchUserMetadata;