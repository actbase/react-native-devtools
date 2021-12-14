import React from 'react';
import {
  View,
  Animated,
  StyleSheet,
} from 'react-native';

import ASGesutreResponder from '../useASGesutreResponder';

// const HandleWidth = 20;
const HandleHeight = 35;

const styles = StyleSheet.create({
  handle: {
    position: 'absolute',
    top: '50%',
    marginTop: -HandleHeight / 2,
    height: HandleHeight,
    width: 15,
    zIndex: Number.MAX_SAFE_INTEGER - 1,
    overflow: 'hidden',
    // shadowOffset: {
    //   width: -2, height: -2
    // },
    // shadowColor: 'black',
    // shadowRadius: 5,
    // shadowOpacity: 0.2,
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
    borderRadius: HandleHeight / 2,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
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
        ,
      ]}
      {...handle.responder}
    >
      <View style={[styles.handleInner, isRight ? styles.handleInnerRight : styles.handleInnerLeft, { backgroundColor }, { backgroundColor: 'white' }]}>
        <View style={styles.handleBar} />
        <View style={styles.handleBar} />
      </View>
    </Animated.View >
  )
}


export default ToolHandle;