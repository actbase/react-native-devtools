import { __spreadArrays } from "tslib";
import React from 'react';
import Emitter from '../../utils/Emitter';
import { useASStoredState } from '../../utils/ASStore';
import { dateToTimeString, generateUnique } from '../../utils/utils';
var EVENT_LOG = '__log';
var defaultLogContext = {
  logs: [],
  clearLogs: function () {},
  logCount: 100,
  isStealingLog: false,
  setLogCount: function () {},
  stealConsoleLog: function () {},
  recoverConsoleLog: function () {}
};
var _logContainer = {
  logs: [],
  consoleLog: function () {},
  consoleWarn: function () {},
  consoleError: function () {},
  isStealing: false
};
_logContainer.consoleLog = console.log;
_logContainer.consoleWarn = console.warn;
_logContainer.consoleError = console.error;

var _stealConsoleLog = function () {
  // backup for recover
  if (_logContainer.isStealing) return; // console.log('From now console log not appear this console. See your application DevTools Log');

  console.log = function (message) {
    var _a;

    var optionalParams = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      optionalParams[_i - 1] = arguments[_i];
    }

    (_a = _logContainer.consoleLog) === null || _a === void 0 ? void 0 : _a.call.apply(_a, __spreadArrays([_logContainer, message], optionalParams));
    Emitter.emit.apply(Emitter, __spreadArrays([EVENT_LOG, 'log', message], optionalParams));
  };

  console.warn = function (message) {
    var _a;

    var optionalParams = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      optionalParams[_i - 1] = arguments[_i];
    }

    (_a = _logContainer.consoleWarn) === null || _a === void 0 ? void 0 : _a.call.apply(_a, __spreadArrays([_logContainer, message], optionalParams));
    Emitter.emit.apply(Emitter, __spreadArrays([EVENT_LOG, 'warn', message], optionalParams));
  };

  console.error = function (message) {
    var _a;

    var optionalParams = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      optionalParams[_i - 1] = arguments[_i];
    }

    (_a = _logContainer.consoleError) === null || _a === void 0 ? void 0 : _a.call.apply(_a, __spreadArrays([_logContainer, message], optionalParams));
    Emitter.emit.apply(Emitter, __spreadArrays([EVENT_LOG, 'error', message], optionalParams));
  };
};

var _recoverConsoleLog = function () {
  if (!_logContainer.isStealing) return;
  console.log('From now console log not appear this console. See your Metro bundler or Chrome Debuger.');
  console.log = _logContainer.consoleLog;
  console.warn = _logContainer.consoleWarn;
  console.error = _logContainer.consoleError;
};

var createLog = function (type, contents) {
  var date = new Date();
  var log = {
    id: generateUnique(),
    time: dateToTimeString(date),
    type: type,
    date: date,
    contents: contents
  };
  return log;
};

var LogContext = React.createContext(defaultLogContext);

var LogContextProvider = function (_a) {
  var children = _a.children;

  var _b = React.useState(_logContainer.logs),
      logs = _b[0],
      setLogs = _b[1];

  var _c = useASStoredState('log_count', 100),
      logCount = _c[0],
      setLogCount = _c[1];

  var _d = useASStoredState('steal_log', false),
      isStealingLog = _d[0],
      setIsStealingLog = _d[1];

  var handleStealLog = React.useCallback(function (type, contents) {
    _logContainer.logs = __spreadArrays([createLog(type, contents)], _logContainer.logs);

    if (_logContainer.logs.length > logCount) {
      _logContainer.logs.splice(logCount, _logContainer.logs.length - logCount);
    }

    setLogs(_logContainer.logs);
  }, [logCount]);
  React.useEffect(function () {
    var resolver = Emitter.add(EVENT_LOG, function (type) {
      var contents = [];

      for (var _i = 1; _i < arguments.length; _i++) {
        contents[_i - 1] = arguments[_i];
      }

      handleStealLog(type, contents);
    });
    return function () {
      var r = resolver();

      _logContainer.consoleLog('resolver run', r);
    };
  }, [logCount]);
  React.useEffect(function () {
    if (isStealingLog) _stealConsoleLog();
  }, [isStealingLog]);
  return React.createElement(LogContext.Provider, {
    value: {
      logs: logs,
      logCount: logCount,
      setLogCount: setLogCount,
      clearLogs: function () {
        _logContainer.logs = [];
        setLogs(_logContainer.logs);
      },
      isStealingLog: isStealingLog,
      stealConsoleLog: function () {
        _stealConsoleLog();

        setIsStealingLog(true);
      },
      recoverConsoleLog: function () {
        _recoverConsoleLog();

        setIsStealingLog(false);
      }
    }
  }, children);
};

export { LogContext, LogContextProvider };