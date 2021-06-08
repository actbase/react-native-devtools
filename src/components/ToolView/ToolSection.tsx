import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  tool: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  toolSection: {
    fontSize:16,
    fontWeight:'bold',
    color: 'white',
    textDecorationColor:'white',
    textDecorationLine:'underline',
    textDecorationStyle:'solid',
  },
});

interface IToolSectionProps {
  title:string, 
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