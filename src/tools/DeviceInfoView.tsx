import React from 'react';
import {
  View,
  Text,
  Animated,
  // Easing,
  StyleSheet,
  ScrollView,
} from 'react-native';

import DeviceInfo from 'react-native-device-info';
import { getByteSizeAdjust } from '../utils/utils';
import ToolButton from '../components/ToolView/ToolButton';
// const DevTreeView = require('react-native-dev-treeview').default;
const InfoRowHeight = 20;

const styles = StyleSheet.create({
  infoContainer: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'column',
    backgroundColor: '#ddddddaa',
  },
  infoRow: {
    padding: 4,
    height: InfoRowHeight,
    flexDirection: 'row',
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderBottomColor: '#ddd'
    alignItems: 'center',

    // justifyContent: 'center',
  },
  infoName: {
    color: '#999',
    fontSize: 8,
    letterSpacing: -0.4,
    width: 80,
  },
  infoValue: {
    color: '#333',
    letterSpacing: -0.4,
    fontSize: 8,
  },
  infoShowIndicatorWrapper: {
    height: 12,
    width: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6
  },
  infoShowIndicator: {
    position: 'absolute',
    height: 0.5,
    width: 10,
    backgroundColor: 'black'
  },

});

const DeviceInfoView = ({ even }: any) => {
  const [isShowInfo, setShowInfo] = React.useState(false);
  const [displayInfo, setDisplayInfo] = React.useState(false);
  const animate = React.useRef(new Animated.Value(0)).current;
  const [info, setInfo] = React.useState<{ name: string, value: any }[]>([]);
  React.useEffect(() => {
    const loadInfo = async () => {
      const info = await [
        { name: 'VERSION', getter: () => Promise.resolve(DeviceInfo.getVersion()) },
        { name: 'BUILD NUMBER', getter: () => Promise.resolve(DeviceInfo.getBuildNumber()) },
        { name: 'BUNDLE ID', getter: () => Promise.resolve(DeviceInfo.getBundleId()) },
        { name: 'DEVICE ID', getter: () => Promise.resolve(DeviceInfo.getDeviceId()) },
        { name: 'ANDROID ID', getter: () => Promise.resolve(DeviceInfo.getAndroidId()) },
        { name: 'USED MEMORY', getter: () => DeviceInfo.getUsedMemory().then(size => getByteSizeAdjust(size)) },
        { name: 'TOTAL MEMORY', getter: () => DeviceInfo.getTotalMemory().then(size => getByteSizeAdjust(size)) },
        { name: 'FREE DISKSPACE', getter: () => DeviceInfo.getFreeDiskStorage().then(size => getByteSizeAdjust(size)) },
        { name: 'IP ADDRESS', getter: () => DeviceInfo.getIpAddress() },
        { name: 'MAC ADDRESS', getter: () => DeviceInfo.getMacAddress() },
        { name: 'HAS NOTCH', getter: () => Promise.resolve(DeviceInfo.hasNotch() ? 'true' : 'false') },
        { name: 'BRAND', getter: () => Promise.resolve(DeviceInfo.getBrand()) },
        { name: 'MODEL', getter: () => Promise.resolve(DeviceInfo.getModel()) },
        { name: 'DEVICE NAME', getter: () => DeviceInfo.getDeviceName() },
        { name: 'SYSTEM NAME', getter: () => Promise.resolve(DeviceInfo.getSystemName()) },
        { name: 'SYSTEM VERSION', getter: () => Promise.resolve(DeviceInfo.getSystemVersion()) },
      ].map(({ name, getter }) => (collector: []) => getter().then((value) => [...collector, { name, value }]))
        .reduce((p, c: any) => p.then(c), Promise.resolve([]));
      setInfo(info);
    };
    loadInfo();
  }, []);

  React.useEffect(() => {
    if (isShowInfo) setDisplayInfo(true);
    Animated.timing(animate, {
      toValue: isShowInfo ? 1 : 0,
      duration: 500,
      // easing: Easing.bounce,
      useNativeDriver: false,
    }).start(() => {
      setDisplayInfo(isShowInfo);
    });
  }, [isShowInfo]);

  const rotate = animate.interpolate({ inputRange: [0, 1], outputRange: ['90deg', '360deg'] });
  const rotate2 = animate.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  return (
    <View style={{}}>
      <ToolButton
        even={even}
        onPress={() => setShowInfo(!isShowInfo)}
        renderAfterChildren={() => (
          <View style={styles.infoShowIndicatorWrapper}>
            <Animated.View style={[styles.infoShowIndicator, { transform: [{ rotate: rotate2 }] }]} />
            <Animated.View style={[styles.infoShowIndicator, { transform: [{ rotate }] }]} />
          </View>
        )}
      >DEVICE INFO</ToolButton>

      {displayInfo && (
        <Animated.View style={{
          height: animate.interpolate({
            inputRange: [0, 1],
            outputRange: [0, (info.length * InfoRowHeight) + 20],
          })
        }}>
          <ScrollView horizontal contentContainerStyle={styles.infoContainer}>
            {info.map(({ name, value }, index) => {
              return (
                <View style={index == info.length - 1 ? [styles.infoRow, { borderBottomWidth: 0 }] : styles.infoRow} key={index}>
                  <Text allowFontScaling={false} style={styles.infoName}>{name}</Text>
                  <Text allowFontScaling={false} style={styles.infoValue}>{value}</Text>
                </View>
              )
            })}
          </ScrollView>
        </Animated.View>
      )}
    </View>
  )
}

export default DeviceInfoView;