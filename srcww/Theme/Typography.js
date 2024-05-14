import {moderateScale} from '../utils/constant';

// App Font-Family
const fontWeights = {
  Regular: {
    fontFamily: 'PlusJakartaSans-Regular',
  },
  Medium: {
    fontFamily: 'PlusJakartaSans-Medium',
  },
  Bold: {
    fontFamily: 'PlusJakartaSans-Bold',
  },
  SemiBold: {
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
 ItalicBold : {
  fontFamily : 'PlusJakartaSans-BoldItalic'
 }

};

const fontSize = {
  f10: {
    fontSize: moderateScale(10),
  },
  f12: {
    fontSize: moderateScale(12),
  },
  f14: {
    fontSize: moderateScale(14),
  },
  f16: {
    fontSize: moderateScale(16),
  },
  f18: {
    fontSize: moderateScale(18),
  },
  f20: {
    fontSize: moderateScale(20),
  },
  f22: {
    fontSize: moderateScale(22),
  },
  f24: {
    fontSize: moderateScale(24),
  },
  f26: {
    fontSize: moderateScale(26),
  },
  f28: {
    fontSize: moderateScale(28),
  },
  f30: {
    fontSize: moderateScale(30),
  },
  f32: {
    fontSize: moderateScale(32),
  },
  f34: {
    fontSize: moderateScale(34),
  },
  f36: {
    fontSize: moderateScale(36),
  },
  f38: {
    fontSize: moderateScale(38),
  },
  f40: {
    fontSize: moderateScale(40),
  },
  f48: {
    fontSize: moderateScale(48),
  },
  f80: {
    fontSize: moderateScale(80),
  },
};
const typography = {fontWeights, fontSize};
export default typography;
