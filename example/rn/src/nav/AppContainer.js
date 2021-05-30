import React from 'react';

import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';
import {
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import Main from '../pages/Main';
import AxiosLogSample from '../pages/AxiosLogSample';

const AppContainer = () => {
  const Stack = React.useMemo(() => createStackNavigator(), []);
  const navRef = React.useRef();

  console.log(navRef);

  return (
    <NavigationContainer
      ref={navRef}
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          header: 'transparent',
          background: '#fff',
        },
      }}>
      <Stack.Navigator>
        <Stack.Screen name={'Main'} component={Main} options={{title: 'DevTools Example'}} />
        <Stack.Screen name={'AxiosLogSample'} component={AxiosLogSample} options={{title: 'Axios Log Sample'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppContainer;
