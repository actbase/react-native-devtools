type TLogType = 'log' | 'warn' | 'error';
interface ILog {
  id: string;
  time : string;
  type: TLogType;
  date: Date;
  contents: any[];
}

interface ILogContenxtProviderProps {
  children: JSX.Element | Array<JSX.Element>;
}

interface ILogContext {
  logs: ILog[];
  clearLogs: () => void;
  logCount: number;
  setLogCount: React.Dispatch<React.SetStateAction<number>>;
  isStealingLog: boolean;
  stealConsoleLog: () => void;
  recoverConsoleLog: () => void;
}
