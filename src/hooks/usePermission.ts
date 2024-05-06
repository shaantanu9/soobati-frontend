import {getItem, setItem} from '@utils/index'; // Adjust the import path
import {useEffect, useState} from 'react';
import {check, request} from 'react-native-permissions';

const usePermission = (permissionType: any) => {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const checkPermission = async () => {
      try {
        const storedStatus: any = await getItem(permissionType);
        if (storedStatus) {
          setStatus(storedStatus);
        } else {
          const freshStatus: any = await check(permissionType);
          setStatus(freshStatus);
          await setItem(permissionType, freshStatus);
        }
      } catch (error) {
        console.error(`Error checking ${permissionType} permission:`, error);
      }
    };

    checkPermission();
  }, [permissionType]);

  const requestPermission = async () => {
    try {
      const result: any = await request(permissionType);
      setStatus(result);
      await setItem(permissionType, result);
    } catch (error) {
      console.error(`Error requesting ${permissionType} permission:`, error);
    }
  };

  return {
    status,
    requestPermission,
  };
};

export default usePermission;
