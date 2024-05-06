import NetInfo from '@react-native-community/netinfo';
import {useEffect, useState} from 'react';

const useInternetConnection = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const retry = () => {
    NetInfo.fetch().then((state: any) => {
      setIsConnected(state.isConnected);
    });
  };

  return {isConnected: isConnected ?? false, retry};
};

export default useInternetConnection;
