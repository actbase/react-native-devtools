const _listeners: { [index: string]: Function[] } = {};
export interface IEmitter {
  add: (event: string, callback: Function) => Function;
  emit: (event: string, ...args: any[]) => void;
}
const Emitter: IEmitter = {
  add: (event: string, callback: Function): Function => {
    if (!_listeners[event]) _listeners[event] = [];
    const container: Function[] = _listeners[event];
    container.push(callback);
    return () => {
      const index = container.findIndex(c => c === callback);
      if (index > -1) {
        container.splice(index, 1);
        return true;
      }
      return false;
    };
  },
  emit: (event: string, ...args: any[]): void => (_listeners[event] || []).forEach(callback => callback(...args)),
};
export default Emitter;
