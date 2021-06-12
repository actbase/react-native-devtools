/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import DevTools, { Segment, useASStoredState } from '@actbase/react-native-devtools';
import { restApi } from './src/pages/AxiosLogSample';

import AppContainer from './src/nav/AppContainer';

const DeploymentItems = [
  { label: 'Production', value: 'productionion' },
  { label: 'Staging', value: 'staging' },
];
const APIServerItems = [
  { label: 'Product', value: 'production' },
  { label: 'Staging', value: 'staging' },
  { label: 'Develop', value: 'dev' },
];
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [deployment, setDeployment] = useASStoredState('code-push-deployment', 'staging');
  const [apiServer, setAPIServer] = useASStoredState('api-server', 'production');
  return (
    <>
      <View style={{ flex: 1 }}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <AppContainer />
        <DevTools
          axiosInstances={[restApi]}
          extensions={[
            {
              label: 'CodePush',
              action: () => {},
              render: () => {
                return (
                  <Segment
                    items={DeploymentItems}
                    value={deployment}
                    onPress={item => {
                      setDeployment(item.value);
                    }}
                  />
                );
              },
            },
            {
              label: 'API Server',
              action: () => {},
              render: () => {
                return (
                  <Segment
                    items={APIServerItems}
                    value={apiServer}
                    onPress={item => {
                      setAPIServer(item.value);
                    }}
                  />
                );
              },
            },
          ]}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
