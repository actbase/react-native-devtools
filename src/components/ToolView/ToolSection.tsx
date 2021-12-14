import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  tool: {
    borderLeftColor: '#eee',
    borderLeftWidth: 5,
    paddingLeft: 11,
    height: 44,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fafafa'
  },
  toolSection: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
    textDecorationColor: 'white',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
});

interface IToolSectionProps {
  title: string,
  renderBeforeChildren?: () => JSX.Element;
  renderAfterChildren?: () => JSX.Element;
}

const ToolButton = ({ title, renderBeforeChildren, renderAfterChildren }: IToolSectionProps) => {
  return (
    <View style={styles.tool}>
      {renderBeforeChildren?.()}
      {!!title && (
        <Text allowFontScaling={false} style={styles.toolSection}>{title}</Text>
      )}
      {renderAfterChildren?.()}
    </View>
  )
}

export default ToolButton;