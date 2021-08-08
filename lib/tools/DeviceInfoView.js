import { __awaiter, __generator, __spreadArrays } from "tslib";
import React from 'react';
import { View, Text, Animated // Easing,
, StyleSheet, ScrollView } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { getByteSizeAdjust } from '../utils/utils';
import ToolButton from '../components/ToolView/ToolButton'; // const DevTreeView = require('react-native-dev-treeview').default;

var InfoRowHeight = 26;
var styles = StyleSheet.create({
  infoContainer: {
    flexDirection: 'column'
  },
  infoRow: {
    padding: 4,
    height: InfoRowHeight,
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ffffff66',
    alignItems: 'center'
  },
  infoName: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 12,
    width: 100
  },
  infoValue: {
    color: 'white',
    fontSize: 12
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
  }
});

var DeviceInfoView = function () {
  var _a = React.useState(false),
      isShowInfo = _a[0],
      setShowInfo = _a[1];

  var _b = React.useState(false),
      displayInfo = _b[0],
      setDisplayInfo = _b[1];

  var animate = React.useRef(new Animated.Value(0)).current;

  var _c = React.useState([]),
      info = _c[0],
      setInfo = _c[1];

  React.useEffect(function () {
    var loadInfo = function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var info;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [4
              /*yield*/
              , [{
                name: 'Version',
                getter: function () {
                  return Promise.resolve(DeviceInfo.getVersion());
                }
              }, {
                name: 'Build Number',
                getter: function () {
                  return Promise.resolve(DeviceInfo.getBuildNumber());
                }
              }, {
                name: 'Bundle Id',
                getter: function () {
                  return Promise.resolve(DeviceInfo.getBundleId());
                }
              }, {
                name: 'Device Id',
                getter: function () {
                  return Promise.resolve(DeviceInfo.getDeviceId());
                }
              }, {
                name: 'Android Id',
                getter: function () {
                  return Promise.resolve(DeviceInfo.getAndroidId());
                }
              }, {
                name: 'Used Memory',
                getter: function () {
                  return DeviceInfo.getUsedMemory().then(function (size) {
                    return getByteSizeAdjust(size);
                  });
                }
              }, {
                name: 'Total Memory',
                getter: function () {
                  return DeviceInfo.getTotalMemory().then(function (size) {
                    return getByteSizeAdjust(size);
                  });
                }
              }, {
                name: 'Free DiskSpace',
                getter: function () {
                  return DeviceInfo.getFreeDiskStorage().then(function (size) {
                    return getByteSizeAdjust(size);
                  });
                }
              }, {
                name: 'IP Address',
                getter: function () {
                  return DeviceInfo.getIpAddress();
                }
              }, {
                name: 'MAC Address',
                getter: function () {
                  return DeviceInfo.getMacAddress();
                }
              }, {
                name: 'Has Notch',
                getter: function () {
                  return Promise.resolve(DeviceInfo.hasNotch() ? 'true' : 'false');
                }
              }, {
                name: 'Brand',
                getter: function () {
                  return Promise.resolve(DeviceInfo.getBrand());
                }
              }, {
                name: 'Model',
                getter: function () {
                  return Promise.resolve(DeviceInfo.getModel());
                }
              }, {
                name: 'Device Name',
                getter: function () {
                  return DeviceInfo.getDeviceName();
                }
              }, {
                name: 'System Name',
                getter: function () {
                  return Promise.resolve(DeviceInfo.getSystemName());
                }
              }, {
                name: 'System Version',
                getter: function () {
                  return Promise.resolve(DeviceInfo.getSystemVersion());
                }
              }].map(function (_a) {
                var name = _a.name,
                    getter = _a.getter;
                return function (collector) {
                  return getter().then(function (value) {
                    return __spreadArrays(collector, [{
                      name: name,
                      value: value
                    }]);
                  });
                };
              }).reduce(function (p, c) {
                return p.then(c);
              }, Promise.resolve([]))];

            case 1:
              info = _a.sent();
              setInfo(info);
              return [2
              /*return*/
              ];
          }
        });
      });
    };

    loadInfo();
  }, []);
  React.useEffect(function () {
    if (isShowInfo) setDisplayInfo(true);
    Animated.timing(animate, {
      toValue: isShowInfo ? 1 : 0,
      duration: 500,
      // easing: Easing.bounce,
      useNativeDriver: false
    }).start(function () {
      setDisplayInfo(isShowInfo);
    });
  }, [isShowInfo]);
  var rotate = animate.interpolate({
    inputRange: [0, 1],
    outputRange: ['90deg', '360deg']
  });
  var rotate2 = animate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });
  return React.createElement(View, {
    style: {}
  }, React.createElement(ToolButton, {
    onPress: function () {
      return setShowInfo(!isShowInfo);
    },
    renderBeforeChildren: function () {
      return React.createElement(View, {
        style: styles.infoShowIndicatorWrapper
      }, React.createElement(Animated.View, {
        style: [styles.infoShowIndicator, {
          transform: [{
            rotate: rotate2
          }]
        }]
      }), React.createElement(Animated.View, {
        style: [styles.infoShowIndicator, {
          transform: [{
            rotate: rotate
          }]
        }]
      }));
    }
  }, "Device Info"), displayInfo && React.createElement(Animated.View, {
    style: {
      height: animate.interpolate({
        inputRange: [0, 1],
        outputRange: [0, info.length * InfoRowHeight]
      })
    }
  }, React.createElement(ScrollView, {
    horizontal: true,
    contentContainerStyle: styles.infoContainer
  }, info.map(function (_a, index) {
    var name = _a.name,
        value = _a.value;
    return React.createElement(View, {
      style: index == info.length - 1 ? [styles.infoRow, {
        borderBottomWidth: 0
      }] : styles.infoRow,
      key: index
    }, React.createElement(Text, {
      allowFontScaling: false,
      style: styles.infoName
    }, name), React.createElement(Text, {
      allowFontScaling: false,
      style: styles.infoValue
    }, value));
  }))));
};

export default DeviceInfoView;