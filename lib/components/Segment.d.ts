/// <reference types="react" />
interface ISegmentItem {
    label: string;
    value: any;
}
interface ISgementProps {
    items: ISegmentItem[];
    onPress: (item: ISegmentItem) => void;
    value: any;
}
declare const Segment: ({ items, onPress, value }: ISgementProps) => JSX.Element;
export default Segment;
