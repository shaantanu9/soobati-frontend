import {Card, Modal, Text} from '@ui-kitten/components';
import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
interface ModalWithBackdropShowcaseProps {
  title?: string;
  setVisible: any;
  visible?: boolean;
}

export const ModalToast = ({
  title = 'Success Message',
  setVisible,
  visible = false,
}: ModalWithBackdropShowcaseProps): React.ReactElement => {
  
    let timmer: any;
  
  useEffect(() => {
    if (visible) {
      timmer = setTimeout(() => {
        setVisible(false);
      }, 2000);
    } else {
      clearTimeout(timmer);
    }
  }, [setVisible]);

  return (
    <View
      style={{
        width: wp('40%'),
      }}>
      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}>
        <Card disabled={true}>
          <Text>{title}</Text>
        </Card>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 192,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
