const _listeners: { [index: string]: Array<Function> } = {};
export interface IEmitter {
  add: (event: string, callback: Function) => Function;
  emit: (event: string, ...args: Array<any>) => void;
}
const Emitter: IEmitter = {
  add: (event: string, callback: Function): Function => {
    if (!_listeners[event]) _listeners[event] = [];
    const container: Array<Function> = _listeners[event];
    container.push(callback);
    return () => {
      const index = container.findIndex(c => c === callback);
      if (index) container.splice(index, 1);
    };
  },
  emit: (event: string, ...args: Array<any>): void => (_listeners[event] || []).forEach(callback => callback(...args)),
};
export default Emitter;
