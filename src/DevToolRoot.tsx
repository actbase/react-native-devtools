import React from 'react';
import { AxiosInstance } from 'axios';

import AxoisLog from './tools/AxoisLog';
import { AxiosContextProvider } from './context/axios/AxiosContext';
import { ToolContextProvider } from './context/toolManager/ToolContext';
import ToolView from './components/ToolView';
import Emitter from './Emitter';
import AsyncStorageTool from './tools/AsyncStorageTool';
import { EventShowDevTool } from './context/devToolEmitter/devToolEmitter';
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
      <AsyncStorageTool />
    </ToolContextProvider>
  );
};


export default DevTools;
