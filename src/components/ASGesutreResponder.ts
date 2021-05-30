import React from 'react';
import { GestureResponderEvent, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface Value {
  x: number;
  y: number;
}
const ASGesutreResponder = ({
  key,
  initialValue,
  onPress,
  touchDelayMS = 200,
}: {
  key: string;
  initialValue?: Value;
  onPress?: Function;
  touchDelayMS?: number;
}) => {
  const [isLoad, setIsLoad] = React.useState<boolean>(false);
  const ref = React.useRef<{
    start: {
      offset: Value;
      move: Value;
    };
    current: Value | undefined;
    pan: Animated.ValueXY;
  }>({
    start: {
      offset: { x: 0, y: 0 },
      move: { x: 0, y: 0 },
    },
    current: initialValue,
    pan: new Animated.ValueXY(initialValue || { x: 0, y: 0 }),
  }).current;

  React.useEffect(() => {
    if (!key) return;
    AsyncStorage.getItem(key).then(v => {
      setIsLoad(true);
      if (!v) {
        return;
      }
      const data = JSON.parse(v);
      ref.pan.setValue((ref.current = { x: data.x, y: data.y }));
    });
  }, [key]);

  const handleTouchTime = React.useRef<number>(0);

  return {
    isLoad,
    pan: ref.pan,
    responder: {
      onStartShouldSetResponder: () => true,
      onResponderGrant: ({ nativeEvent: { pageX, pageY } }: GestureResponderEvent) => {
        ref.start.offset = { x: pageX, y: pageY };
        ref.start.move = ref.current || { x: 0, y: 0 };
        if (onPress) handleTouchTime.current = Date.now();
      },
      onResponderMove: ({ nativeEvent: { pageX, pageY } }: GestureResponderEvent) => {
        ref.pan.setValue(
          (ref.current = {
            x: ref.start.move.x + pageX - (ref.start.offset.x || 0),
            y: ref.start.move.y + pageY - (ref.start.offset.y || 0),
          }),
        );
      },
      onResponderRelease: ({ nativeEvent: { pageX, pageY } }: GestureResponderEvent) => {
        if (onPress && Date.now() - handleTouchTime.current < touchDelayMS) {
          onPress();
        }
        ref.pan.setValue(
          (ref.current = {
            x: ref.start.move.x + pageX - (ref.start.offset.x || 0),
            y: ref.start.move.y + pageY - (ref.start.offset.y || 0),
          }),
        );
        AsyncStorage.setItem(key, JSON.stringify(ref.current));
      },
    },
  };
};

export default ASGesutreResponder;
