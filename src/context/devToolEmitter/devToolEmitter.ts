import Emitter from '../../utils/Emitter';
export const EventShowDevTool: string = 'showDevTool';

export const addDevToolEnableListener = (callback: (arg0: boolean)=>void )=>Emitter.add(EventShowDevTool, (isShow: boolean) => callback(isShow));
export const setEnableDevTool = (isEnabled: boolean) => Emitter.emit(EventShowDevTool, isEnabled);