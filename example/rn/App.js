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
const UnicodeAstralRange = /\ud83c[\udffb-\udfff](?=\ud83c[\udffb-\udfff])|(?:[^\ud800-\udfff][\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]?|[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]|\ud83c[\udffb-\udfff])?(?:\u200d(?:[^\ud800-\udfff]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]|\ud83c[\udffb-\udfff])?)*/g;
!String.prototype.trunc &&
  Object.defineProperty(String.prototype, 'trunc', {
    value: function(n: number, e = '…') {
      if (this.length === 0) return '';
      let arr = this.match(UnicodeAstralRange);
      if (!arr) return '';
      return arr.slice(0, n).join('') + (arr.length > n ? e : '');
    },
    enumerable: false,
  });



  
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

  const devToolRef = React.useRef();
  console.log(devToolRef);
  return (
    <>
      <View style={{ flex: 1, backgroundColor: '#ccc' }}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <AppContainer />
        <DevTools
          ref={devToolRef}
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
