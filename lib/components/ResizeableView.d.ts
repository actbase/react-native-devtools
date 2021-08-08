import React from 'react';
import { ViewStyle } from 'react-native';
interface Props {
    title: string;
    onClose?: Function;
    isClose?: boolean;
    contentContainerStyle?: ViewStyle;
    children?: JSX.Element | React.Component;
    nowMove?: boolean;
    renderHeaderExtra?: Function;
    renderFooter?: Function;
}
declare const ResizeableView: ({ title, contentContainerStyle, children, onClose, renderHeaderExtra, renderFooter, isClose, }: Props) => JSX.Element | null;
export default ResizeableView;
