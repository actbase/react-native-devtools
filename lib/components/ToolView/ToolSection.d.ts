/// <reference types="react" />
interface IToolSectionProps {
    title: string;
    renderBeforeChildren?: () => JSX.Element;
    renderAfterChildren?: () => JSX.Element;
}
declare const ToolButton: ({ title, renderBeforeChildren, renderAfterChildren }: IToolSectionProps) => JSX.Element;
export default ToolButton;
