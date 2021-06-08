import React from 'react';
import { AxiosInstance } from 'axios';

import AxoisLog from './tools/AxiosLog';
import { AxiosContextProvider } from './context/axios/AxiosContext';
import { ToolContextProvider } from './context/toolManager/ToolContext';
import ToolView from './components/ToolView';
import Emitter from './utils/Emitter';
import AsyncStorageTool from './tools/AsyncStorageTool';
import { EventShowDevTool } from './context/devToolEmitter/devToolEmitter';
import { LogContextProvider } from './context/log/LogContext';
import LogView from './tools/LogView';
interface IDevToolsProps {
  enabled?: boolean;
  axiosInstances: Array<AxiosInstance>;
}

const DevTools = ({ axiosInstances, enabled: initialEnabled = __DEV__ }: IDevToolsProps) => {
  // handle emitter;
  React.useEffect(() => {
    const resolver: Function = Emitter.add(EventShowDevTool, (isShow: boolean) => setIsEnabled(isShow));
    return () => resolver?.();
  }, []);

  const [isEnabled, setIsEnabled] = React.useState(initialEnabled);
  if (!isEnabled) return null;

  return (
    <ToolContextProvider>
      <ToolView />
      
      <AxiosContextProvider axiosInstances={axiosInstances}>
        <AxoisLog />
      </AxiosContextProvider>

      <LogContextProvider>
        <LogView />
      </LogContextProvider>

      <AsyncStorageTool />
    </ToolContextProvider>
  );
};


export default DevTools;
