import React, { useContext } from 'react';
import { View, ActivityIndicator, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';

import Button from '../components/Button';
import { AxiosContext } from '../context/axios/AxiosContext';
import ResizeableView from '../components/ResizeableView';
import { IAxiosLog } from '../context/@types/axios';
import { ToolContext } from '../context/toolManager/ToolContext';
import { ScrollView } from 'react-native-gesture-handler';
const Scenes = require('react-native-scenes').default;
const DevTreeView = require('react-native-dev-treeview').default;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'white',
  },
  logItem: {
    flexDirection: 'row',
    marginHorizontal: 3,
    marginVertical: 5,
  },
  log: {
    color: '#ffffff',
    marginHorizontal: 5,
    fontSize: 8,
    backgroundColor: 'transparent'
  },
  query: {

    color: '#ffffff',
    marginHorizontal: 5,
    fontSize: 8,
    backgroundColor: 'transparent'
  },
  logStatus: {
    margin: 5,
    height: 30,
    width: 35,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  headerExtra: {
    flexDirection: 'row',
  },

});

const AxiosLogDetail = ({ log, ...etc }: { log: IAxiosLog, pop: Function }) => {
  const { } = etc;
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <Text> - Request</Text>
        <ScrollView style={{ width: '100%' }} horizontal >
          <DevTreeView autoExtendRoot={true} fontSize={14} data={{ ...log.config }} />
        </ScrollView>
        <Text> - Response</Text>
        <ScrollView style={{ width: '100%' }} horizontal >
          <DevTreeView autoExtendRoot={true} fontSize={14} data={{ ...log.response }} />
        </ScrollView>
        <Text> - All</Text>
        <ScrollView style={{ width: '100%' }} horizontal >
          <DevTreeView autoExtendRoot={true} fontSize={14} data={{ ...log }} />
        </ScrollView>
      </ScrollView>
    </View>
  )
}

const colorForStatus = (status: number | undefined): string | undefined => {
  if (typeof status === 'undefined') return;
  else if (status >= 200 && status < 400) return '#228822';
  else if (status >= 400 && status < 500) return '#c82';
  else if (status >= 500) return '#C00';
  return;
}

const AxiosLogItem = ({ log, push }: { log: IAxiosLog, push: Function }) => {
  return (
    <TouchableOpacity style={styles.logItem} onPress={() => {
      push({
        component: AxiosLogDetail,
        barHidden: true,
        passProps: {
          log
        }
      })
    }}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        {log.response ? (
          <View style={[styles.logStatus, { backgroundColor: colorForStatus(log.status) }]}>
            {<Text style={styles.log} allowFontScaling={false} >{log?.method?.toUpperCase?.()}</Text>}
            <Text style={styles.log} allowFontScaling={false}>{log.status}</Text>
          </View>
        ) : (
          <View style={styles.logStatus}>
            {<Text style={styles.log} allowFontScaling={false}>{log?.method?.toUpperCase?.()}</Text>}
            <ActivityIndicator size="small" color="white" />
          </View>
        )}
      </View>
      <View style={{ justifyContent: 'center' }}>

        <Text style={styles.log} selectable={true}>
          {log.config.url}
        </Text>
        <Text style={styles.log} selectable={true}>
          {log.elapse}ms
        </Text>
        <Text style={[styles.query,]} selectable={true}>
          {JSON.stringify(log?.config?.params)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const AxiosLogList = (props: any) => {
  const { push } = props;
  const { logs } = useContext(AxiosContext);
  return (
    <FlatList
      style={{ flex: 1 }}
      data={logs}
      keyExtractor={(item: IAxiosLog, _: number) => item.uid as string}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={({ item }) => (
        <AxiosLogItem log={item} push={push} />
      )}
    />
  )
};

const AxoisLog = (): JSX.Element | null => {
  const { clearLogList } = useContext(AxiosContext);
  const { axiosLog: [isShow, setShow] = [] } = useContext(ToolContext);
  const scenesRef = React.useRef<any>();
  const [routeIndex, setRouteIndex] = React.useState<number>(0);

  if (!isShow) return null;

  return (
    <ResizeableView
      title={'AxiosLog'}
      onClose={() => {
        if (routeIndex == 0) setShow(false);
        scenesRef.current?.pop?.();
      }}
      isClose={routeIndex == 0}
      renderHeaderExtra={() => {
        return (
          <View style={styles.headerExtra}>
            <Button onPress={clearLogList}>C</Button>
          </View>
        )
      }}
    >
      <Scenes
        ref={scenesRef}
        style={styles.container}
        route={{ component: AxiosLogList, barHidden: true }}
        routeWillChange={(index: number) => setRouteIndex(index)}
      />
    </ResizeableView>
  );
};

export default AxoisLog;
