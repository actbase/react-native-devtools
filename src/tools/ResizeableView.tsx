import React from 'react';
import { View, StyleSheet, GestureResponderEvent, TouchableOpacity, ViewStyle } from 'react-native';

import { ToolContext } from './../context/toolManager/ToolContext';

interface Props {
  contentContainerStyle?:ViewStyle,
  children?:JSX.Element | React.Component;
  nowMove?: boolean;
  move?: { x: number; y: number };
  size?: { bottom: number; right: number };
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    position: 'absolute',
    left: 0,
    top: 0,
    minWidth: 200,
    minHeight: 200,
    backgroundColor: '#00000099',
    justifyContent: 'space-between',
  },
  topView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#000000',
  },
  resizeView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#00000033',
    height: 30,
    width: 30,
  },
  button: {
    height: 25,
    borderRadius: 5,
    borderColor: '#ffffff',
    borderWidth: 1,
    color: '#ffffff',
  },
  buttonClose: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonCloseCross1: {
    position: 'absolute',
    width: 20,
    height: 2,
    borderRadius: 2,
    backgroundColor: 'white',
    transform: [{ rotate: '45deg' }]
  },
  buttonCloseCross2: {
    position: 'absolute',
    width: 20,
    height: 2,
    borderRadius: 2,
    backgroundColor: 'white',
    transform: [{ rotate: '-45deg' }]
  },
  resizeTab: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: 0,
    right: 0
  }
});


const ResizeableView = ({ contentContainerStyle, children }: Props): JSX.Element => {
  const { setToolType } = React.useContext(ToolContext);

  const [moveOffset, setMoveOffset] = React.useState<{ x: number; y: number }>();
  const [moveStart, setMoveStart] = React.useState<{ x: number; y: number }>();
  const [translate, setTranslate] = React.useState<{ x: number; y: number }>();

  const [resizeOffset, setResizeOffset] = React.useState<{ x: number; y: number }>();
  const [resizeStart, setResizeStart] = React.useState<{ x: number; y: number }>();
  const [bottom, setBottom] = React.useState<number>(250);
  const [right, setRight] = React.useState<number>(100);

  const onClose = () => {
    setToolType(undefined);
  };

  const onMoveStart = React.useCallback(
    (event: GestureResponderEvent) => {
      setMoveOffset({ x: event.nativeEvent.pageX, y: event.nativeEvent.pageY });
      translate && setMoveStart({ x: translate.x, y: translate.y });
    },
    [moveOffset, moveStart],
  );

  const onMove = React.useCallback(
    (event: GestureResponderEvent) => {
      if (moveOffset) {
        const X = moveStart ? moveStart.x : 0;
        const Y = moveStart ? moveStart.y : 0;
        const translateX = X + event.nativeEvent.pageX - moveOffset.x;
        const translateY = Y + event.nativeEvent.pageY - moveOffset.y;

        setTranslate({ x: translateX < 0 ? 0 : translateX, y: translateY < 0 ? 0 : translateY });
      }
    },
    [moveOffset, moveStart, translate],
  );

  const onMoveEnd = React.useCallback(
    (event: GestureResponderEvent) => {
      onMove(event);
      setMoveOffset(undefined);
      setMoveStart(undefined);
    },
    [moveOffset, moveStart],
  );

  const onResizeStart = React.useCallback(
    (event: GestureResponderEvent) => {
      setResizeOffset({ x: event.nativeEvent.pageX, y: event.nativeEvent.pageY });
      setResizeStart({ x: right, y: bottom });
    },
    [resizeOffset, resizeStart],
  );

  const onResizeMove = React.useCallback(
    (event: GestureResponderEvent) => {
      if (resizeOffset) {
        const X = resizeStart ? resizeStart.x : 0;
        const Y = resizeStart ? resizeStart.y : 0;
        const resizeX = resizeOffset.x - (event.nativeEvent.pageX - X);
        const resizeY = resizeOffset.y - (event.nativeEvent.pageY - Y);

        setRight(resizeX);
        setBottom(resizeY);
      }
    },
    [resizeOffset, resizeStart],
  );

  const onResizeEnd = React.useCallback(
    () => {
      setResizeOffset(undefined);
      setResizeStart(undefined);
    },
    [resizeOffset, resizeStart],
  );

  const TopView = React.useMemo(() => {
    return (
      <View
        style={styles.topView}
        onStartShouldSetResponder={() => true}
        onResponderGrant={onMoveStart}
        onResponderMove={onMove}
        onResponderRelease={onMoveEnd}>
        <TouchableOpacity style={styles.buttonClose} onPress={onClose}>
          <View style={styles.buttonCloseCross1} />
          <View style={styles.buttonCloseCross2} />
        </TouchableOpacity>
      </View>
    );
  }, [moveOffset, moveStart, translate]);

  const ResizeTab = React.useMemo(() => {
    return (
      <View style={styles.resizeTab}>
        <View
          style={styles.resizeView}
          onStartShouldSetResponder={() => true}
          onResponderGrant={onResizeStart}
          onResponderMove={onResizeMove}
          onResponderRelease={onResizeEnd}></View>
      </View>
    );
  }, [resizeOffset, resizeStart]);

  return (
    <View
      style={[
        styles.container,
        {
          transform: [
            { translateX: translate ? translate.x : 0 },
            { translateY: translate ? translate.y : 0 }],
        },
        { bottom, right },
      ]}>
      {TopView}
      <View style={[{ flex: 1 }, contentContainerStyle]}>{children}</View>
      {ResizeTab}
    </View>
  );
};


export default ResizeableView;
