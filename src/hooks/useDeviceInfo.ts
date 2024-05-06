import {useEffect, useState} from 'react';
import DeviceInfo from 'react-native-device-info';

// Custom hook for retrieving device information
const useDeviceInfo = () => {
  const [deviceInfo, setDeviceInfo] = useState({
    deviceId: '',
    deviceModel: '',
    deviceBrand: '',
    systemName: '',
    systemVersion: '',
    appVersion: '',
    bundleId: '',
  });

  useEffect(() => {
    const fetchDeviceInfo = async () => {
      try {
        const id = await DeviceInfo.getUniqueId();
        const model = await DeviceInfo.getModel();
        const brand = await DeviceInfo.getBrand();
        const systemName = await DeviceInfo.getSystemName();
        const systemVersion = await DeviceInfo.getSystemVersion();
        const appVersion = await DeviceInfo.getVersion();
        const bundleId = await DeviceInfo.getBundleId();

        setDeviceInfo({
          deviceId: id,
          deviceModel: model,
          deviceBrand: brand,
          systemName: systemName,
          systemVersion: systemVersion,
          appVersion: appVersion,
          bundleId: bundleId,
        });
      } catch (error) {
        console.error('Error fetching device information:', error);
      }
    };

    fetchDeviceInfo();
  }, []);

  return deviceInfo;
};

export default useDeviceInfo;
