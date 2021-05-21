import React from 'react';
import { GestureResponderEvent, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native'

interface Props {
  style?: ViewStyle,
  textStyle?: TextStyle,
  children?: JSX.Element | React.Component | String;
  onPress: (event: GestureResponderEvent) => void;
}

const Button = ({ style, children, textStyle, onPress, ...etcProps }: Props): JSX.Element => {
  const content = React.useMemo((): any => {
    if (typeof children === 'string') {
      return (
        <Text style={textStyle}>{children}</Text>
      )
    }
    else { }
  }, [children])
  return (
    <TouchableOpacity style={[style]} onPress={onPress} {...etcProps}>
      {content}
    </TouchableOpacity>
  )
}

export default Button;