import React from 'react';
declare const ToolContext: React.Context<IDevTool>;
interface IProps {
    children: JSX.Element | Array<JSX.Element>;
}
declare const ToolContextProvider: ({ children }: IProps) => JSX.Element;
declare const setNavigationContainer: (navigationContainer: any) => void;
export { ToolContext, ToolContextProvider, setNavigationContainer };
