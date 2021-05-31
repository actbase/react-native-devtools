import React from 'react';
import Emitter from '../../utils/Emitter';
import { useASStoredState } from '../../utils/ASStore';
import { generateUnique } from '../../utils/utils';
const EVENT_LOG = '__log';
const defaultLogContext: ILogContext = {
  logs: [],
  clearLogs: () => { },
  logCount: 100,
  isStealingLog: false,
  setLogCount: () => { },
  stealConsoleLog: () => { },
  recoverConsoleLog: () => { },
};

const _logContainer: {
  logs: ILog[];
  consoleLog: (message?: any, ...optionalParams: any[]) => void;
  consoleWarn: (message?: any, ...optionalParams: any[]) => void;
  consoleError: (message?: any, ...optionalParams: any[]) => void;
  isStealing: boolean
} = {
  logs: [],
  consoleLog: () => { },
  consoleWarn: () => { },
  consoleError: () => { },
  isStealing: false,
};

_logContainer.consoleLog = console.log;
_logContainer.consoleWarn = console.warn;
_logContainer.consoleError = console.error;

const _stealConsoleLog = () => {
  // backup for recover
  if (_logContainer.isStealing) return;
  console.log('From now console log not appear this console. See your application DevTools Log');

  console.log = (message?: any, ...optionalParams: any[]) => {
    Emitter.emit(EVENT_LOG, 'log', message, ...optionalParams);
  }
  console.warn = (message?: any, ...optionalParams: any[]) => {
    Emitter.emit(EVENT_LOG, 'warn', message, ...optionalParams);
  }
  console.error = (message?: any, ...optionalParams: any[]) => {
    Emitter.emit(EVENT_LOG, 'error', message, ...optionalParams);
  }
}

const _recoverConsoleLog = () => {
  if (!_logContainer.isStealing) return;
  console.log('From now console log not appear this console. See your Metro bundler or Chrome Debuger.');

  console.log = _logContainer.consoleLog;
  console.warn = _logContainer.consoleWarn;
  console.error = _logContainer.consoleError;
}

const createLog: (type: TLogType, contents: any[]) => ILog = (type, contents) => {
  const log: ILog = {
    id: generateUnique(),
    type,
    date: new Date(),
    contents,
  }
  return log;
}

const LogContext = React.createContext(defaultLogContext);
const LogContextProvider = ({ children }: ILogContenxtProviderProps) => {
  const [logs, setLogs] = React.useState<ILog[]>(_logContainer.logs);
  const [logCount, setLogCount] = useASStoredState<number>('log_count', 100);
  const [isStealingLog, setIsStealingLog] = useASStoredState<boolean>('steal_log', false);

  // const handleStealLog = ()=>{}
  React.useEffect(() => {
    const resolver = Emitter.add(EVENT_LOG, (type: TLogType, ...contents: any[]) => {
      _logContainer.logs = [createLog(type, contents), ..._logContainer.logs];
      if (_logContainer.logs.length > logCount) {
        _logContainer.logs.splice(logCount, _logContainer.logs.length - logCount);
      }
      setLogs(_logContainer.logs);
    });
    return () => {
      _logContainer.consoleLog('resolver run');
      resolver();
    }
  }, [logCount]);

  React.useEffect(() => {
    if (isStealingLog) _stealConsoleLog();
  }, [isStealingLog]);
  return (
    <LogContext.Provider value={{
      logs,
      logCount,
      setLogCount,
      clearLogs: () => {
        _logContainer.logs = [];
        setLogs(_logContainer.logs);
      },
      isStealingLog,
      stealConsoleLog: () => {
        _stealConsoleLog();
        setIsStealingLog(true);
      },
      recoverConsoleLog: () => {
        _recoverConsoleLog();
        setIsStealingLog(false);
      },
    }}>
      {children}
    </LogContext.Provider>
  )
}

export {
  LogContext,
  LogContextProvider,
}