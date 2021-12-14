import { __awaiter, __generator, __spreadArrays } from "tslib";
import React from 'react';
import { View, Text, Animated // Easing,
, StyleSheet, ScrollView } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { getByteSizeAdjust } from '../utils/utils';
import ToolButton from '../components/ToolView/ToolButton'; // const DevTreeView = require('react-native-dev-treeview').default;

var InfoRowHeight = 20;
var styles = StyleSheet.create({
  infoContainer: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'column',
    backgroundColor: '#ddddddaa'
  },
  infoRow: {
    padding: 4,
    height: InfoRowHeight,
    flexDirection: 'row',
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderBottomColor: '#ddd'
    alignItems: 'center'
  },
  infoName: {
    color: '#999',
    fontSize: 8,
    letterSpacing: -0.4,
    width: 80
  },
  infoValue: {
    color: '#333',
    letterSpacing: -0.4,
    fontSize: 8
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
  }
});

var DeviceInfoView = function (_a) {
  var even = _a.even;

  var _b = React.useState(false),
      isShowInfo = _b[0],
      setShowInfo = _b[1];

  var _c = React.useState(false),
      displayInfo = _c[0],
      setDisplayInfo = _c[1];

  var animate = React.useRef(new Animated.Value(0)).current;

  var _d = React.useState([]),
      info = _d[0],
      setInfo = _d[1];

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
                name: 'VERSION',
                getter: function () {
                  return Promise.resolve(DeviceInfo.getVersion());
                }
              }, {
                name: 'BUILD NUMBER',
                getter: function () {
                  return Promise.resolve(DeviceInfo.getBuildNumber());
                }
              }, {
                name: 'BUNDLE ID',
                getter: function () {
                  return Promise.resolve(DeviceInfo.getBundleId());
                }
              }, {
                name: 'DEVICE ID',
                getter: function () {
                  return Promise.resolve(DeviceInfo.getDeviceId());
                }
              }, {
                name: 'ANDROID ID',
                getter: function () {
                  return Promise.resolve(DeviceInfo.getAndroidId());
                }
              }, {
                name: 'USED MEMORY',
                getter: function () {
                  return DeviceInfo.getUsedMemory().then(function (size) {
                    return getByteSizeAdjust(size);
                  });
                }
              }, {
                name: 'TOTAL MEMORY',
                getter: function () {
                  return DeviceInfo.getTotalMemory().then(function (size) {
                    return getByteSizeAdjust(size);
                  });
                }
              }, {
                name: 'FREE DISKSPACE',
                getter: function () {
                  return DeviceInfo.getFreeDiskStorage().then(function (size) {
                    return getByteSizeAdjust(size);
                  });
                }
              }, {
                name: 'IP ADDRESS',
                getter: function () {
                  return DeviceInfo.getIpAddress();
                }
              }, {
                name: 'MAC ADDRESS',
                getter: function () {
                  return DeviceInfo.getMacAddress();
                }
              }, {
                name: 'HAS NOTCH',
                getter: function () {
                  return Promise.resolve(DeviceInfo.hasNotch() ? 'true' : 'false');
                }
              }, {
                name: 'BRAND',
                getter: function () {
                  return Promise.resolve(DeviceInfo.getBrand());
                }
              }, {
                name: 'MODEL',
                getter: function () {
                  return Promise.resolve(DeviceInfo.getModel());
                }
              }, {
                name: 'DEVICE NAME',
                getter: function () {
                  return DeviceInfo.getDeviceName();
                }
              }, {
                name: 'SYSTEM NAME',
                getter: function () {
                  return Promise.resolve(DeviceInfo.getSystemName());
                }
              }, {
                name: 'SYSTEM VERSION',
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
    even: even,
    onPress: function () {
      return setShowInfo(!isShowInfo);
    },
    renderAfterChildren: function () {
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
  }, "DEVICE INFO"), displayInfo && React.createElement(Animated.View, {
    style: {
      height: animate.interpolate({
        inputRange: [0, 1],
        outputRange: [0, info.length * InfoRowHeight + 20]
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