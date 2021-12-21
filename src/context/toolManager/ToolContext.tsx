import React, { createContext } from 'react';

const defaultToolContext: IDevTool = {
  theme: 'white',
  setTheme: () => { },
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
  const [theme, setTheme] = React.useState('white');

  return (
    <ToolContext.Provider
      value={{
        theme, 
        setTheme,
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
