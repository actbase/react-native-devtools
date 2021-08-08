import Emitter from '../../utils/Emitter';
export var EventShowDevTool = 'showDevTool';
export var addDevToolEnableListener = function (callback) {
  return Emitter.add(EventShowDevTool, function (isShow) {
    return callback(isShow);
  });
};
export var setEnableDevTool = function (isEnabled) {
  return Emitter.emit(EventShowDevTool, isEnabled);
};