import React, { createContext } from 'react';

const defaultToolContext: IDevTool = {
  axiosLog:undefined,
  asyncStorage:undefined,
  log:undefined,
};

const ToolContext = createContext(defaultToolContext);

interface IProps {
  children: JSX.Element | Array<JSX.Element>;
}

const ToolContextProvider = ({ children }: IProps) => {
  const axiosLog = React.useState<boolean>(false);
  const asyncStorage = React.useState<boolean>(false);
  const log = React.useState<boolean>(false);

  return (
    <ToolContext.Provider
      value={{
        axiosLog,
        asyncStorage,
        log,
      }}>
      {children}
    </ToolContext.Provider>
  );
};

export { ToolContext, ToolContextProvider };
