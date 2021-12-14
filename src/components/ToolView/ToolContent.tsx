import React from 'react';
import {
  View,
  Text,
  Linking,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ToolContext } from '../../context/toolManager/ToolContext';
import { setEnableDevTool } from '../../context/devToolEmitter/devToolEmitter';
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
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    // textAlign: 'center',
    letterSpacing: -0.6,
  },
  company: {
    fontSize: 8,
    color: '#999',
    letterSpacing: -0.4,
  },

  copyright: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#ffffffaa',
  },
  actbase: {
    flex: 1,
    fontSize: 8,
    letterSpacing: -0.6,
    color: '#999',
  },
  contact: {
    fontSize: 8,
    letterSpacing: -0.4,
    color: '#333',
  },
  contactUnderline: { position: 'absolute', left: 0, right: 0, bottom: 1.5, height: 2.5, backgroundColor: 'rgb(143,205,175)', zIndex: -1 }
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
        <Text style={styles.company}>ACTBASE</Text>
        <Text allowFontScaling={false} style={styles.title}>DEVTOOLS <Text style={{ fontSize: 8, color: '#999' }}>v0.1.0</Text></Text>
      </TouchableOpacity>

      <ScrollView style={{ flex: 1 }}>
        <DeviceInfoView even />

        <ToolButton onPress={() => RNRestart.Restart()}>
          RESTART
        </ToolButton>

        <ToolButton onPress={() => { setShowAxiosLog(!isShowAxiosLog); toggleTool() }} even>
          {isShowAxiosLog ? 'HIDE' : 'SHOW'} AXIOS LOG
        </ToolButton>

        <ToolButton onPress={() => { setShowAsyncStorage(!isShowAsyncStorage); toggleTool() }}>
          {isShowAsyncStorage ? 'HIDE' : 'SHOW'} ASYNC STORAGE
        </ToolButton>

        <ToolButton onPress={() => { setShowLog(!isShowLog); toggleTool() }} even>
          {isShowLog ? 'HIDE' : 'SHOW'} LOG
        </ToolButton>

        <ToolButton onPress={() => { setEnableDevTool(false) }}>
          DISABLE DEVTOOL
        </ToolButton>

        {extensions.length > 0 && (
          <ToolSection title={'EXTENSIONS'} />
        )}

        {extensions?.map(({ label, action, render }, index) => {
          return (
            [
              label && (
                <ToolButton
                  key={`tool-button-${index}`}
                  onPress={() => action()}
                  even={(index + 2) % 2 !== 0}>
                  {label}
                </ToolButton>
              ),
              render && (
                <View key={`tool-render-${index}`} style={{ paddingHorizontal: 10, alignSelf: 'stretch', paddingVertical: 5 }}>
                  {render?.()}
                </View>
              )
            ].filter(e => e)
          )
        })}
      </ScrollView>
      <View style={[{ paddingBottom: inset.bottom }, styles.copyright]}>
        <Text allowFontScaling={false} style={styles.actbase}>
          POWERED BY ACTBASE.LLC.
        </Text>
        <View style={{}}>
          <Text style={styles.contact} onPress={() => {
            Linking.openURL('mailto:project@actbase.io')
          }}>
            CONTACT
          </Text>
          <View style={styles.contactUnderline} />
        </View>
      </View>
    </View>
  );
};

export default ToolContent;