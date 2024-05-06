import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import React, {forwardRef, useMemo} from 'react';
import {Text} from 'react-native';

interface CustomBottomSheetProps {
  children: React.ReactNode;
  title: string;
  memoArray?: any[];
}

type Ref = BottomSheet;

const BottomSheetComp = forwardRef<Ref, CustomBottomSheetProps>(
  (props, ref) => {
    const snapPoints = useMemo(
      () => [...(props.memoArray || ['25%', '50%', '90%'])],
      [],
    );
    console.log('snapPoints', [...(props.memoArray || ['25%', '50%', '90%'])]);
    ref = ref as React.MutableRefObject<BottomSheet>;

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}>
        <Text className="text-2xl font-extrabold px-3">{props.title}</Text>
        <BottomSheetScrollView
          contentContainerStyle={style.contentContainerStyle}
          style={style.style}
          className="bg-red-500">
          {props.children}
        </BottomSheetScrollView>
      </BottomSheet>
    );
  },
);

export default BottomSheetComp;

const style = {
  contentContainerStyle: {
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  style: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginBottom: 50,
  },
};
