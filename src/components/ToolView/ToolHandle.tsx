import React from 'react';
import {
  View,
  Animated,
  StyleSheet,
} from 'react-native';

import ASGesutreResponder from '../useASGesutreResponder';

const HandleWidth = 20;
const HandleHeight = 40;

const styles = StyleSheet.create({
  handle: {
    position: 'absolute',
    top: '50%',
    marginTop: -HandleHeight / 2,
    height: HandleHeight,
    width: HandleWidth,
    zIndex: 2,
    paddingHorizontal: 2,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  handleRight: {
    right: 0,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  handleLeft: {
    left: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  handleBar: {
    height: HandleHeight - 20,
    width: 3,
    borderRadius: 3 / 2,
    backgroundColor: '#000',
  },
});

const ToolHandle = ({
  isRight,
  onPress,
  backgroundColor,
  translateX,
}: {
  isRight: boolean,
  onPress: Function,
  backgroundColor: string,
  translateX?: Animated.AnimatedInterpolation
}) => {
  const handle = ASGesutreResponder({
    key: 'Handle',
    initialValue: { x: 0, y: 0 },
    onPress
  });

  return (
    <Animated.View
      style={[
        styles.handle,
        isRight ? styles.handleRight : styles.handleLeft,
        { transform: [{ translateY: handle.pan.y }, { translateX }] },
        { backgroundColor },
      ]}
      {...handle.responder}
    >
      <View style={styles.handleBar} />
      <View style={styles.handleBar} />
    </Animated.View >
  )
}


export default ToolHandle;