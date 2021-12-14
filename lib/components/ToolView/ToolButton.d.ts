/// <reference types="react" />
import { GestureResponderEvent } from 'react-native';
interface IToolButtonProps {
    children?: any;
    onPress: (event: GestureResponderEvent) => void;
    renderBeforeChildren?: () => JSX.Element;
    renderAfterChildren?: () => JSX.Element;
    even?: boolean;
}
declare const ToolButton: ({ children, even, onPress, renderBeforeChildren, renderAfterChildren }: IToolButtonProps) => JSX.Element;
export default ToolButton;
