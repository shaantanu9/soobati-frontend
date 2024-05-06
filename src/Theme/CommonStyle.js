import {StyleSheet} from 'react-native';
import {deviceHeight, deviceWidth, moderateScale} from '../utils/constant';
import {Colors} from './Colors';
import flex from './flex';

export default StyleSheet.create({
  mainContainerWhite: {
    backgroundColor: Colors.White,
    ...flex.flex,
  },
  mainContainerSurface: {
    backgroundColor: Colors.Primary,
    ...flex.flex,
    width: deviceWidth,
    height: deviceHeight,
  },
  mainContainerWithRadius: {
    ...flex.flex,
    backgroundColor: Colors.White,
    borderTopLeftRadius: moderateScale(30),
    borderTopRightRadius: moderateScale(30),
    height: moderateScale(614),
  },
});
