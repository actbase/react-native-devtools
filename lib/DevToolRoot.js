import React from 'react';
import AxoisLog from './tools/AxiosLog';
import { AxiosContextProvider } from './context/axios/AxiosContext';
import { ToolContextProvider } from './context/toolManager/ToolContext';
import ToolView from './components/ToolView';
import Emitter from './utils/Emitter';
import AsyncStorageTool from './tools/AsyncStorageTool';
import { EventShowDevTool } from './context/devToolEmitter/devToolEmitter';
import { LogContextProvider } from './context/log/LogContext';
import LogView from './tools/LogView';
var DevTools = React.forwardRef(function (_a, ref) {
  var _b = _a.axiosInstances,
      axiosInstances = _b === void 0 ? [] : _b,
      _c = _a.enabled,
      initialEnabled = _c === void 0 ? __DEV__ : _c,
      _d = _a.extensions,
      extensions = _d === void 0 ? [] : _d; // handle emitter;

  React.useEffect(function () {
    var resolver = Emitter.add(EventShowDevTool, function (isShow) {
      return setIsEnabled(isShow);
    });
    return function () {
      return resolver === null || resolver === void 0 ? void 0 : resolver();
    };
  }, []);

  var _e = React.useState(initialEnabled),
      isEnabled = _e[0],
      setIsEnabled = _e[1];

  var _f = React.useState(false),
      isOpen = _f[0],
      setIsOpen = _f[1];

  if (ref) {
    ref.current = {
      show: function () {
        return setIsOpen(true);
      },
      hide: function () {
        return setIsOpen(false);
      }
    };
  }

  if (!isEnabled) return null;
  return React.createElement(ToolContextProvider, null, React.createElement(ToolView, {
    extensions: extensions,
    isOpen: isOpen,
    onChangeOpen: setIsOpen
  }), React.createElement(AxiosContextProvider, {
    axiosInstances: axiosInstances
  }, React.createElement(AxoisLog, null)), React.createElement(LogContextProvider, null, React.createElement(LogView, null)), React.createElement(AsyncStorageTool, null));
});
export default DevTools;