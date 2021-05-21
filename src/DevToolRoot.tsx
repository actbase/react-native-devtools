import React from 'react';

import { AxiosContextProvider } from './context/axios/AxiosContext';
import { ToolContextProvider } from './context/toolManager/ToolContext';
import ToolView from './ToolView';

const DevToolRoot = () => {
  return (
    <ToolContextProvider>
      <AxiosContextProvider>
        <ToolView />
      </AxiosContextProvider>
    </ToolContextProvider>
  );
};

export default DevToolRoot;
