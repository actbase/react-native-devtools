/// <reference types="react" />
import { Animated } from 'react-native';
declare const ToolHandle: ({ isRight, onPress, backgroundColor, translateX, }: {
    isRight: boolean;
    onPress: Function;
    backgroundColor: string;
    translateX?: Animated.AnimatedInterpolation | undefined;
}) => JSX.Element;
export default ToolHandle;
