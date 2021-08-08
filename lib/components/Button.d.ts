import React from 'react';
import { GestureResponderEvent, TextStyle, ViewStyle } from 'react-native';
interface Props {
    style?: ViewStyle;
    textStyle?: TextStyle;
    children?: JSX.Element | React.Component | String;
    onPress: (event: GestureResponderEvent) => void;
}
declare const Button: ({ style, children, textStyle, onPress, ...etcProps }: Props) => JSX.Element;
export default Button;
