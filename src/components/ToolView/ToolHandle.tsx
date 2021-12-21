import React from 'react';
import {
  View,
  Animated,
  StyleSheet,
} from 'react-native';

import ASGesutreResponder from '../useASGesutreResponder';

// const HandleWidth = 20;
const HandleOuterHeight = 55;
const HandleHeight = 35;

const styles = StyleSheet.create({
  handle: {
    position: 'absolute',
    top: '50%',
    marginTop: -HandleOuterHeight / 2,
    width: 35,
    height: HandleOuterHeight,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-end',
    zIndex: Number.MAX_SAFE_INTEGER - 1,
    overflow: 'hidden',

  },
  handleRight: {
    right: 0,
    // borderRadius: HandleHeight / 2,
    // borderTopLeftRadius: HandleHeight / 2,
    // borderBottomLeftRadius: HandleHeight / 2,
  },
  handleLeft: {
    left: 0,
    // borderRadius: HandleHeight / 2,
    // borderTopRightRadius: HandleHeight / 2,
    // borderBottomRightRadius: HandleHeight / 2,
  },
  handleInner: {
    width: HandleHeight,
    height: HandleHeight,
    marginRight: -20,
    borderRadius: HandleHeight / 2,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    shadowOffset: {
      width: -2, height: 0
    },
    shadowColor: 'black',
    shadowRadius: 5,
    shadowOpacity: 0.2,
    elevation: 10,
  },
  handleInnerRight: {
    paddingRight: 21.5,
    paddingLeft: 7
  },
  handleInnerLeft: {
    paddingLeft: 21.5,
    paddingRight: 7,
  },
  handleBar: {
    height: 13,
    width: 2,
    borderRadius: 1,
    backgroundColor: '#eaeaea',
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
      ]}

    >
      <View style={[styles.handleInner, isRight ? styles.handleInnerRight : styles.handleInnerLeft, { backgroundColor }, { backgroundColor: 'white' }]} {...handle.responder}>
        <View style={styles.handleBar} />
        <View style={styles.handleBar} />
      </View>
    </Animated.View >
  )
}


export default ToolHandle;