import LocalizedStrings from 'react-native-localization';

import {ILocalizations} from '@utils/interface';
import enI18n from './en'; // Import English localizations

// Define the type of the object passed to new LocalizedStrings
const strings = new LocalizedStrings<ILocalizations>({
  en: enI18n,
});

export default strings;
