import { GestureResponderEvent, Animated } from 'react-native';
interface Value {
    x: number;
    y: number;
}
interface IASGesutreResponder {
    key?: string;
    initialValue?: Value;
    onPress?: Function;
    touchDelayMS?: number;
    min?: Value;
    max?: Value;
}
declare const ASGesutreResponder: ({ key, initialValue, onPress, touchDelayMS, min, max, }: IASGesutreResponder) => {
    pan: Animated.ValueXY;
    responder: {
        onStartShouldSetResponder: () => boolean;
        onResponderGrant: ({ nativeEvent: { pageX, pageY } }: GestureResponderEvent) => void;
        onResponderMove: ({ nativeEvent: { pageX, pageY } }: GestureResponderEvent) => void;
        onResponderRelease: ({ nativeEvent: { pageX, pageY } }: GestureResponderEvent) => void;
    };
};
export default ASGesutreResponder;
