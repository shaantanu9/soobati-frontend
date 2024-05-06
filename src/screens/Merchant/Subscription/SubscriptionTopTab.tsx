import {ScrollView} from 'react-native';
import {DynamicTabView} from '../../TabComponent';
// import SubscriptionCalender from './SubscriptionCalender';
import Gifted from '../../../components/new/Gifted';
import styles from '../../../styles';

const tabs = [
  {
    title: 'Subscription List',
    content: <Gifted bgColor={styles.white} textColor={styles.black} />,
    // icon: <ChartPieIcon size={20} color={styles.darkPrimaryColor} />,
  },
  // {
  //   title: 'Subscription Calender',
  //   content: <SubscriptionCalender />,
  //   icon: <CalendarIcon size={20} color={styles.darkPrimaryColor} />,
  // },
];

const SubscriptionTab = () => {
  return (
    <ScrollView>
      <DynamicTabView tabs={[...tabs]} />
    </ScrollView>
  );
};

export default SubscriptionTab;

const shadowStyle = {
  shadowColor: '#DDDDDD',
  shadowOffset: {
    width: 0,
    height: 10,
  },
  shadowOpacity: 1,
  shadowRadius: 20,

  // Android shadow
  elevation: 20,
};
