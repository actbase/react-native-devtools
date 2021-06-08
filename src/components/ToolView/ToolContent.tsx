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
import ToolButton from './ToolButton';
import ToolSection from './ToolSection';
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
    backgroundColor: '#ffffffaa',
  },
  actbase: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 20,
  }
});


const ToolContent = ({ position, setPosition, backgroundColor, toggleTool, extensions }: IToolContent) => {
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
        <Text allowFontScaling={false} style={styles.title}>DevTools <Text style={{ fontSize: 10 }}>v0.0.1</Text></Text>
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

        {extensions.length > 0 && (
          <ToolSection title={'Extensions'} />
        )}

        {extensions?.map(({ label, action }, index) => {
          return (
            <ToolButton
              key={index}
              onPress={() => action()}
              isLast={extensions.length - 1 === index}>
              {label}
            </ToolButton>
          )
        })}
      </ScrollView>
      <View style={[{ paddingBottom: inset.bottom }, styles.poweredBy]}>
        <Image style={styles.actbase} source={assets.Actbase} />
        <Text allowFontScaling={false} style={{ fontSize: 14 }}>
          Powered By{'\n'}
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Actbase</Text>
        </Text>
      </View>
    </View>
  );
};

export default ToolContent;