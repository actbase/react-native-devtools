import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import DevTreeView from 'react-native-dev-treeview';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
const DeviceInfoSample = () => {
  return (
    <View style={styles.container}>
      <DevTreeView
        data={{
          version: DeviceInfo.getVersion(),
          buildNumber: DeviceInfo.getBuildNumber(),
          usedMemory: `${(DeviceInfo.getUsedMemorySync() / (1024 * 1024)).toFixed(2)}MB`,
          bundleId: DeviceInfo.getBundleId(),
          deviceId: DeviceInfo.getDeviceId(),
          brand: DeviceInfo.getBrand(),
          androidId: DeviceInfo.getAndroidIdSync(),
          freeDiskSpace: `${(DeviceInfo.getFreeDiskStorageSync() / (1024 * 1024)).toFixed(2)}MB`,
          ipAddress: DeviceInfo.getIpAddressSync(),
          macAddress: DeviceInfo.getMacAddressSync(),
          model: DeviceInfo.getModel(),
          deviceName: DeviceInfo.getDeviceNameSync(),
          systenName: DeviceInfo.getSystemName(),
          systenVersion: DeviceInfo.getSystemVersion(),
        }}
      />
    </View>
  );
};

export default DeviceInfoSample;
