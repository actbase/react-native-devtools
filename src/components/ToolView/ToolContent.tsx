import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ToolContext } from '../../context/toolManager/ToolContext';
import { setEnableDevTool } from '../../context/devToolEmitter/devToolEmitter';
import assets from '../../assets';
import ToolButton from '../ToolButton';
import DeviceInfoView from '../../tools/DeviceInfoView';
import { PositionLeft, PositionRight } from '../../commons/defines';
const RNRestart = require('react-native-restart').default;

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  header: {
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },

  poweredBy: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  actbase: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 20,
  }
});
interface Props {
  backgroundColor?: string;
  position: string;
  setPosition: Function,
  toggleTool: Function
}

const ToolContent = ({ position, setPosition, backgroundColor, toggleTool }: Props) => {
  const inset = useSafeAreaInsets();
  const {
    axiosLog: [isShowAxiosLog, setShowAxiosLog] = [],
    asyncStorage: [isShowAsyncStorage, setShowAsyncStorage] = [],
    log: [isShowLog, setShowLog] = [],
  } = React.useContext(ToolContext);

  const isRight = position === PositionRight;

  return (
    <View style={[styles.body, { backgroundColor }]}>
      <TouchableOpacity
        activeOpacity={1}
        style={[
          styles.header,
          {
            height: inset.top + 44,
            paddingTop: inset.top,
          },
        ]}
        onPress={() => {
          setPosition(isRight ? PositionLeft : PositionRight);
        }}>
        <Text allowFontScaling={false} style={styles.title}>DevTools</Text>
      </TouchableOpacity>

      <ScrollView style={{ flex: 1 }}>
        <DeviceInfoView />

        <ToolButton onPress={() => RNRestart.Restart()}>
          Restart
        </ToolButton>

        <ToolButton onPress={() => { setShowAxiosLog(!isShowAxiosLog); toggleTool() }}>
          {isShowAxiosLog ? 'Hide' : 'Show'} Axios Log
        </ToolButton>

        <ToolButton onPress={() => { setShowAsyncStorage(!isShowAsyncStorage); toggleTool() }}>
          {isShowAsyncStorage ? 'Hide' : 'Show'} AsyncStorage
        </ToolButton>

        <ToolButton onPress={() => { setShowLog(!isShowLog); toggleTool() }}>
          {isShowLog ? 'Hide' : 'Show'} Log
        </ToolButton>

        <ToolButton onPress={() => { setEnableDevTool(false) }} isLast>
          Disable DevTool
        </ToolButton>
      </ScrollView>
      <View style={[{ paddingBottom: inset.bottom }, styles.poweredBy]}>
        <Image style={styles.actbase} source={assets.Actbase} />
        <Text style={{}}>
          Powered By{'\n'}
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Actbase</Text>
        </Text>
      </View>
    </View>
  );
};

export default ToolContent;