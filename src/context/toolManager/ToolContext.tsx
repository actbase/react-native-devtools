import React, { createContext } from 'react';

const defaultToolContext: IDevTool = {
  axiosLog: undefined,
  asyncStorage: undefined,
  log: undefined,
  navigationContainer: [],
  setNavigationContainer: () => { }
};

const ToolContext = createContext(defaultToolContext);

interface IProps {
  children: JSX.Element | Array<JSX.Element>;
}

const ToolContextProvider = ({ children }: IProps) => {
  const axiosLog = React.useState<boolean>(false);
  const asyncStorage = React.useState<boolean>(false);
  const log = React.useState<boolean>(false);
  const [navigationContainer, setNavigationContainer] = React.useState([]);

  return (
    <ToolContext.Provider
      value={{
        axiosLog,
        asyncStorage,
        log,
        navigationContainer,
        setNavigationContainer
      }}>
      {children}
    </ToolContext.Provider>
  );
};

const setNavigationContainer = (navigationContainer: any) => {
  const { setNavigationContainer } = React.useContext(ToolContext);
  setNavigationContainer(navigationContainer);
}

export { ToolContext, ToolContextProvider, setNavigationContainer };
