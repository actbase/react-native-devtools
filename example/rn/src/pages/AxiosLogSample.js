import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

import common_styles from '../commons/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const restApi = axios.create({
  baseURL: 'https://60a8b0ad20a6410017306171.mockapi.io/api/v1',
});

const AxiosLogSample = () => {
  const callGetAPI = async () => {
    await restApi.get('test/test', {
      params: {
        a: 'a',
        b: 'b',
      },
    });
  };
  const callPostAPI = async () => {
    await restApi.post('test/test', {
      param1: 'param1',
    });
  };
  const callPutAPI = async () => {
    await restApi.put('test/test', {
      param1: 'param1',
    });
  };
  const callErrorAPI = async () => {
    try {
      await restApi.put('test1/test', {
        param1: 'param1',
      });
    } catch (e) {
      console.warn('handing error', e);
    }
  };
  const callAndCancelAPI = async () => {
    try {
      const source = axios.CancelToken.source();
      const t = setTimeout(() => {
        clearTimeout(t);
        source.cancel();
      }, 100);
      const r = await restApi.get('test/test', { cancelToken: source.token });
      console.log(r);
    } catch (e) {
      console.warn(e, e.response);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={common_styles.button} onPress={callGetAPI}>
        <Text>call get API</Text>
      </TouchableOpacity>
      <TouchableOpacity style={common_styles.button} onPress={callPostAPI}>
        <Text>call post API</Text>
      </TouchableOpacity>

      <TouchableOpacity style={common_styles.button} onPress={callPutAPI}>
        <Text>call put API</Text>
      </TouchableOpacity>

      <TouchableOpacity style={common_styles.button} onPress={callErrorAPI}>
        <Text>call API on Error</Text>
      </TouchableOpacity>

      <TouchableOpacity style={common_styles.button} onPress={callAndCancelAPI}>
        <Text>call and cancel API</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AxiosLogSample;
