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
    backgroundColor: '#ffffff',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  toolEven: {
    backgroundColor: '#fafafa',
  },
  toolCaption: {
    flex: 1,
    fontSize: 10,
    letterSpacing: - 0.4,
    color: '#666',
  },
});

interface IToolButtonProps {
  children?: any;
  onPress: (event: GestureResponderEvent) => void;
  renderBeforeChildren?: () => JSX.Element;
  renderAfterChildren?: () => JSX.Element;
  even?: boolean;
}

const ToolButton = ({ children, even, onPress, renderBeforeChildren, renderAfterChildren }: IToolButtonProps) => {
  return (
    <TouchableOpacity style={[styles.tool, even && styles.toolEven]} onPress={onPress}>
      {renderBeforeChildren?.()}
      {!!children && (
        <Text allowFontScaling={false} style={styles.toolCaption}>{children}</Text>
      )}
      {renderAfterChildren?.()}
    </TouchableOpacity>
  )
}

export default ToolButton;