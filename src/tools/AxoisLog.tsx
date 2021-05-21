import React, { useContext, useEffect, useMemo } from 'react';
import { View, ActivityIndicator, StyleSheet, Text, FlatList } from 'react-native';

import { AxiosContext } from '../context/axios/AxiosContext';
import Button from '../components/Button';
import ResizeableView from './ResizeableView';

const AxoisLog = (): JSX.Element => {
  const { reqLog, resLog, useInterceptor, ejectInterceptor, clearLogList } = useContext(AxiosContext);
  useEffect(() => {
    useInterceptor();
    return ejectInterceptor();
  }, []);

  const logItem = (log: IAxiosLog) => {
    return (
      <View style={styles.logItem}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          {<Text style={styles.log}>{log.type}</Text>}
          {log.method && <Text style={styles.log}>{log.method}</Text>}
          {log.status && (
            <Text
              style={[
                styles.log,
                {
                  color:
                    log.status >= 200 && log.status < 400
                      ? '#ffffff'
                      : log.status >= 400 && log.status < 400
                        ? '#c82'
                        : '#C00',
                },
              ]}>
              {log.status}
            </Text>
          )}
        </View>
        <View style={{ justifyContent: 'center' }}>{<Text style={styles.log}>{log.time}</Text>}</View>
        {
          <Text style={[styles.log, { flex: 1, color: log.isError ? '#C00' : '#ffffff' }]} selectable={true}>
            {log.log}
          </Text>
        }
      </View>
    );
  };

  const logList = useMemo(() => {
    return reqLog.map((log: IAxiosLog, index: number) => {
      return (
        <View style={{ borderBottomWidth: 1, borderBottomColor: '#a1a1a1' }}>
          {logItem(log)}
          {resLog[index] ? logItem(resLog[index]) : <ActivityIndicator size="small" color={'#ffffff'} />}
        </View>
      );
    });
  }, [reqLog, resLog]);

  return (
    <ResizeableView>
      <View style={styles.container}>
        <Button onPress={clearLogList} >Clear</Button>
        <FlatList 
          data={logList} 
          keyExtractor={(_, index) => index.toString()} 
          renderItem={({ item }) => item} 
        />
      </View>
    </ResizeableView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  log: {
    color: '#ffffff',
    marginHorizontal: 5,
    fontSize: 8,
  },
  logItem: {
    flexDirection: 'row',
    marginHorizontal: 3,
    marginVertical: 5,
  },
});

export default AxoisLog;
