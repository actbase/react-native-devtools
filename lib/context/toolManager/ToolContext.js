import React, { createContext } from 'react';
var defaultToolContext = {
  theme: 'white',
  setTheme: function () {},
  axiosLog: undefined,
  asyncStorage: undefined,
  log: undefined,
  navigationContainer: [],
  setNavigationContainer: function () {}
};
var ToolContext = createContext(defaultToolContext);

var ToolContextProvider = function (_a) {
  var children = _a.children;
  var axiosLog = React.useState(false);
  var asyncStorage = React.useState(false);
  var log = React.useState(false);

  var _b = React.useState([]),
      navigationContainer = _b[0],
      setNavigationContainer = _b[1];

  var _c = React.useState('white'),
      theme = _c[0],
      setTheme = _c[1];

  return React.createElement(ToolContext.Provider, {
    value: {
      theme: theme,
      setTheme: setTheme,
      axiosLog: axiosLog,
      asyncStorage: asyncStorage,
      log: log,
      navigationContainer: navigationContainer,
      setNavigationContainer: setNavigationContainer
    }
  }, children);
};

var setNavigationContainer = function (navigationContainer) {
  var setNavigationContainer = React.useContext(ToolContext).setNavigationContainer;
  setNavigationContainer(navigationContainer);
};

export { ToolContext, ToolContextProvider, setNavigationContainer };