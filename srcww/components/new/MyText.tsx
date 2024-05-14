import React, {useEffect} from 'react';
import {Text, TextInput, View} from 'react-native';

interface MyTextProps {
  placeholder: string;
  text: string;
  setText: (text: string) => void;
  keyboardTypeInput?: any;
  required?: boolean;
  textClassName?: string;
  viewClassName?: string;
}

function MyText({
  placeholder,
  text,
  setText,
  keyboardTypeInput = 0,
  required = true,
  textClassName = "",
  viewClassName = "",
}: MyTextProps) {
  const [showText, setShowText] = React.useState(false);

  const keyBoardTypeList = [
    'default',
    'number-pad',
    'decimal-pad',
    'numeric',
    'email-address',
    'phone-pad',
  ];

  const [clickSecondTime, setClickSecondTime] = React.useState(false);
  const [showError, setShowError] = React.useState(false);
  useEffect(() => {
    if (clickSecondTime) {
      if (required && text === '') {
        setShowError(true);
      } else {
        setShowError(false);
      }
    }
  }, [clickSecondTime, text, required]);

  const keyBoardType: any = keyBoardTypeList[keyboardTypeInput];
  const [showPlaceholder, setShowPlaceholder] = React.useState(true);
  return (
    <>
      <View className={"relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 "+ viewClassName }>
        {/* <BottomSheetTextInput */}
        <TextInput
          className={"peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 text-black pl-2 "+textClassName}
          // id="Username"
          value={text}
          placeholder={showPlaceholder ? placeholder : ''}
          onChangeText={text => setText(text)}
          onFocus={e => {
            setShowText(true);
            setShowPlaceholder(false);
          }}
          // number input
          keyboardType={keyBoardType}
          onBlur={e => {
            if (text === '') {
              setShowPlaceholder(true);
              setShowText(false);
            } else {
              setShowText(true);
            }
            setClickSecondTime(true);
          }}
        />
        {showText && (
          <Text className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
            {placeholder}
          </Text>
        )}
      </View>
      {showError && (
        <Text className="text-red-500 bg-white text-xs my-2">
          {placeholder} is required *
        </Text>
      )}
    </>
  );
}

export default MyText;
