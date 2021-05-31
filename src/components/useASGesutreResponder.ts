import React from 'react';
import { GestureResponderEvent, Animated } from 'react-native';
import ASStore from '../utils/ASStore';
interface Value {
  x: number;
  y: number;
}

interface ManageValues {
  start: {
    offset: Value;
    move: Value;
  };
  current: Value | undefined;
  pan: Animated.ValueXY;
}

interface IASGesutreResponder {
  key?: string;
  initialValue?: Value;
  onPress?: Function;
  touchDelayMS?: number;
  min?: Value;
  max?: Value;
}

const ASGesutreResponder = ({
  key,
  initialValue,
  onPress,
  touchDelayMS = 200,
  min = { x: Number.MIN_SAFE_INTEGER, y: Number.MIN_SAFE_INTEGER },
  max = { x: Number.MAX_SAFE_INTEGER, y: Number.MAX_SAFE_INTEGER },
}: IASGesutreResponder) => {
  const ref = React.useRef<ManageValues>({
    start: {
      offset: { x: 0, y: 0 },
      move: { x: 0, y: 0 },
    },
    current: initialValue,
    pan: new Animated.ValueXY(initialValue || { x: 0, y: 0 }),
  }).current;

  React.useEffect(() => {
    if (!key) return;
    const v = ASStore.get(key);
    if (!v || !v.x || !v.y) return;
    ref.pan.setValue((ref.current = v));
  }, [key]);

  const handleTouchTime = React.useRef<number>(0);

  return {
    pan: ref.pan,
    responder: {
      onStartShouldSetResponder: () => true,
      onResponderGrant: ({ nativeEvent: { pageX, pageY } }: GestureResponderEvent) => {
        ref.start.offset = { x: pageX, y: pageY };
        ref.start.move = ref.current || { x: 0, y: 0 };
        if (onPress) handleTouchTime.current = Date.now();
      },
      onResponderMove: ({ nativeEvent: { pageX, pageY } }: GestureResponderEvent) => {
        const x = Math.max(min.x, Math.min(ref.start.move.x + pageX - (ref.start.offset.x || 0), max.x));
        const y = Math.max(min.y, Math.min(ref.start.move.y + pageY - (ref.start.offset.y || 0), max.y));
        ref.pan.setValue((ref.current = { x, y }));
      },
      onResponderRelease: ({ nativeEvent: { pageX, pageY } }: GestureResponderEvent) => {
        if (onPress && Date.now() - handleTouchTime.current < touchDelayMS) onPress();
        const x = Math.max(min.x, Math.min(ref.start.move.x + pageX - (ref.start.offset.x || 0), max.x));
        const y = Math.max(min.y, Math.min(ref.start.move.y + pageY - (ref.start.offset.y || 0), max.y));
        ref.pan.setValue((ref.current = { x, y }));
        if (key) ASStore.set(key, ref.current);
      },
    },
  };
};

export default ASGesutreResponder;
