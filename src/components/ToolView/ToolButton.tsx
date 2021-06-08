import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';

const styles = StyleSheet.create({
  tool: {
    height: 44,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  toolNoLine: {
    borderBottomWidth: 0,
  },
  toolCaption: {
    color: 'white',
  },
});

interface IToolButtonProps {
  children?: any;
  onPress: (event: GestureResponderEvent) => void;
  isLast?: boolean;
  renderBeforeChildren?: () => JSX.Element;
  renderAfterChildren?: () => JSX.Element;
}

const ToolButton = ({ children, onPress, isLast, renderBeforeChildren, renderAfterChildren }: IToolButtonProps) => {
  return (
    <TouchableOpacity style={isLast ? [styles.tool, styles.toolNoLine] : styles.tool} onPress={onPress}>
      {renderBeforeChildren?.()}
      {!!children && (
        <Text allowFontScaling={false} style={styles.toolCaption}>{children}</Text>
      )}
      {renderAfterChildren?.()}
    </TouchableOpacity>
  )
}

export default ToolButton;