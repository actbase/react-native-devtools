import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';

import Button from '../components/Button';
import ResizeableView from './ResizeableView';
import { ToolContext } from '../context/toolManager/ToolContext';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
const DevTreeView = require('react-native-dev-treeview').default;
import { generateUnique } from '../utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    width: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  headerExtra: {
    flexDirection: 'row',
  }
});


const AsyncStorageToolView = ({ }) => {
  const [data, setData] = React.useState<any>();
  React.useEffect(() => {
    AsyncStorage.getAllKeys()
      .then((keys) => AsyncStorage.multiGet(keys))
      .then((data) => {
        setData(data.reduce((p, [k, v]) => {
          if (!v) return { ...p, [k]: v };
          return { ...p, [k]: JSON.parse(v) };
          // console.log( k, v, JSON.parse( v ));
          // try {
          //   return ({ ...p, [k]: JSON.parse(v) });
          // }
          // catch (e) {
          //   return ({ ...p, [k]: v })
          // }
          // finally {
          //   return ({ ...p, [k]: v })
          // }
        }, {}));
      })
  }, []);
  if (!data) return null;
  return (
    <ScrollView style={{ flex: 1 }}>
      <ScrollView horizontal>
        <DevTreeView
          fontSize={14}
          autoExtendRoot
          data={data}
        />
      </ScrollView>
    </ScrollView>

  )
}

const AsyncStorageTool = (): JSX.Element | null => {
  const { asyncStorage: [isShow, setShow] = [] } = useContext(ToolContext);
  const [uid, setUid] = React.useState<string>(generateUnique());

  if (!isShow) return null;

  const refresh = () => {
    setUid(generateUnique())
  }

  const removeAll = async () => {
    const keys = await AsyncStorage.getAllKeys();
    await AsyncStorage.multiRemove(keys);
    refresh();
  }

  return (
    <ResizeableView
      title={'AsyncStorage'}
      onClose={() => setShow(false)}
      renderHeaderExtra={() => {
        return (
          <View style={styles.headerExtra}>
            <Button onPress={refresh}>R</Button>
            <Button onPress={removeAll}>C</Button>
          </View>
        )
      }}
    >
      <AsyncStorageToolView key={uid} />
    </ResizeableView>
  );
};

export default AsyncStorageTool;
