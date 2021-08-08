/// <reference types="react" />
import { GestureResponderEvent } from 'react-native';
interface IToolButtonProps {
    children?: any;
    onPress: (event: GestureResponderEvent) => void;
    isLast?: boolean;
    renderBeforeChildren?: () => JSX.Element;
    renderAfterChildren?: () => JSX.Element;
}
declare const ToolButton: ({ children, onPress, isLast, renderBeforeChildren, renderAfterChildren }: IToolButtonProps) => JSX.Element;
export default ToolButton;
