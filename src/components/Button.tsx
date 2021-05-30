import React from 'react';
import { StyleSheet, GestureResponderEvent, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native'

interface Props {
  style?: ViewStyle,
  textStyle?: TextStyle,
  children?: JSX.Element | React.Component | String;
  onPress: (event: GestureResponderEvent) => void;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#666',
    borderRadius: 3,
    minHeight: 25,
    minWidth: 25,
    margin:2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textStyle: {
    fontSize: 12,
    color: 'white',
  }
})

const Button = ({ style, children, textStyle, onPress, ...etcProps }: Props): JSX.Element => {
  const content = React.useMemo((): any => {
    if (typeof children === 'string') {
      return (
        <Text style={textStyle ? [styles.textStyle, textStyle] : styles.textStyle}>{children}</Text>
      )
    }
    else { }
  }, [children])
  return (
    <TouchableOpacity style={style ? [styles.container, style] : styles.container} onPress={onPress} {...etcProps}>
      {content}
    </TouchableOpacity>
  )
}

export default Button;