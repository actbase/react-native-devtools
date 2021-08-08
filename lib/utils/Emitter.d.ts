export interface IEmitter {
    add: (event: string, callback: Function) => Function;
    emit: (event: string, ...args: any[]) => void;
}
declare const Emitter: IEmitter;
export default Emitter;
