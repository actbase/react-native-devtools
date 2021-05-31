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
import ToolButton from '../components/ToolButton';
// const DevTreeView = require('react-native-dev-treeview').default;
const InfoRowHeight = 26;

const styles = StyleSheet.create({


  infoContainer: {
    flexDirection: 'column',
  },
  infoRow: {
    padding: 4,
    height: InfoRowHeight,
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ffffff66',
    alignItems: 'center',

    // justifyContent: 'center',
  },
  infoName: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 12,
    width: 100,
  },
  infoValue: {
    color: 'white',
    fontSize: 12,
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
    height: 2,
    width: 10,
    borderRadius: 1,
    backgroundColor: 'white'
  },

});

const DeviceInfoView = () => {
  const [isShowInfo, setShowInfo] = React.useState(false);
  const [displayInfo, setDisplayInfo] = React.useState(false);
  const animate = React.useRef(new Animated.Value(0)).current;
  const [info, setInfo] = React.useState<{ name: string, value: any }[]>([]);
  React.useEffect(() => {
    const loadInfo = async () => {
      const info = await [
        { name: 'Version', getter: () => Promise.resolve(DeviceInfo.getVersion()) },
        { name: 'Build Number', getter: () => Promise.resolve(DeviceInfo.getBuildNumber()) },
        { name: 'Bundle Id', getter: () => Promise.resolve(DeviceInfo.getBundleId()) },
        { name: 'Device Id', getter: () => Promise.resolve(DeviceInfo.getDeviceId()) },
        { name: 'Android Id', getter: () => Promise.resolve(DeviceInfo.getAndroidId()) },
        { name: 'Used Memory', getter: () => DeviceInfo.getUsedMemory().then(size => getByteSizeAdjust(size)) },
        { name: 'Total Memory', getter: () => DeviceInfo.getTotalMemory().then(size => getByteSizeAdjust(size)) },
        { name: 'Free DiskSpace', getter: () => DeviceInfo.getFreeDiskStorage().then(size => getByteSizeAdjust(size)) },
        { name: 'IP Address', getter: () => DeviceInfo.getIpAddress() },
        { name: 'MAC Address', getter: () => DeviceInfo.getMacAddress() },
        { name: 'Has Notch', getter: () => Promise.resolve(DeviceInfo.hasNotch() ? 'true' : 'false') },
        { name: 'Brand', getter: () => Promise.resolve(DeviceInfo.getBrand()) },
        { name: 'Model', getter: () => Promise.resolve(DeviceInfo.getModel()) },
        { name: 'Device Name', getter: () => DeviceInfo.getDeviceName() },
        { name: 'System Name', getter: () => Promise.resolve(DeviceInfo.getSystemName()) },
        { name: 'System Version', getter: () => Promise.resolve(DeviceInfo.getSystemVersion()) },
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
        onPress={() => setShowInfo(!isShowInfo)}
        renderBeforeChildren={() => (
          <View style={styles.infoShowIndicatorWrapper}>
            <Animated.View style={[styles.infoShowIndicator, { transform: [{ rotate:rotate2 }] }]} />
            <Animated.View style={[styles.infoShowIndicator, { transform: [{ rotate }] }]} />
          </View>
        )}
      >Device Info</ToolButton>

      {displayInfo && (
        <Animated.View style={{
          height: animate.interpolate({
            inputRange: [0, 1],
            outputRange: [0, info.length * InfoRowHeight],
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