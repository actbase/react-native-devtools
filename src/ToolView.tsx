import React from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ToolContext } from './context/toolManager/ToolContext';
import { setEnableDevTool } from './context/devToolEmitter/devToolEmitter';
import DeviceInfo from 'react-native-device-info';
import { getByteSizeAdjust } from './utils';
import ASGesutreResponder from './components/ASGesutreResponder';
// const DevTreeView = require('react-native-dev-treeview').default;
const RNRestart = require('react-native-restart').default;

const HandleWidth = 20;
const HandleHeight = 40;

const PositionRight = 'right';
const PositionLeft = 'left';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    bottom: 0,
  },
  containerRight: {
    right: 0,
  },
  containerLeft: {
    left: 0,
  },
  handle: {
    position: 'absolute',
    top: '50%',
    marginTop: -HandleHeight / 2,
    height: HandleHeight,
    width: HandleWidth,
    zIndex: 2,
    paddingHorizontal: 2,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  handleRight: {
    right: 0,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  handleLeft: {
    left: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
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

  tool: {
    height: 44,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  toolCaption: {
    color: 'white',
  },

  infoRow: {
    padding: 4,
    flexDirection: 'row',
    // justifyContent: 'center',
  }
});
interface Props {
  backgroundColor?: string;
  position: string;
  setPosition: Function,
  toggleTool: Function
}

const DeviceInfoView = () => {
  const [isShowInfo, setShowInfo] = React.useState(false);
  const info = React.useMemo(() => ([
    { name: 'Version', value: DeviceInfo.getVersion() },
    { name: 'Build Number', value: DeviceInfo.getBuildNumber() },
    { name: 'Bundle Id', value: DeviceInfo.getBundleId() },
    { name: 'Device Id', value: DeviceInfo.getDeviceId() },
    { name: 'Android Id', value: DeviceInfo.getAndroidIdSync() },
    { name: 'Used Memory', value: getByteSizeAdjust(DeviceInfo.getUsedMemorySync()) },
    { name: 'Total Memory', value: getByteSizeAdjust(DeviceInfo.getTotalMemorySync()) },
    { name: 'Free DiskSpace', value: getByteSizeAdjust(DeviceInfo.getFreeDiskStorageSync()) },
    { name: 'IP Address', value: DeviceInfo.getIpAddressSync() },
    { name: 'MAC Address', value: DeviceInfo.getMacAddressSync() },
    { name: 'Has Notch', value: DeviceInfo.hasNotch() ? 'true' : 'false' },
    { name: 'Brand', value: DeviceInfo.getBrand() },
    { name: 'Model', value: DeviceInfo.getModel() },
    { name: 'Device Name', value: DeviceInfo.getDeviceNameSync() },
    { name: 'System Name', value: DeviceInfo.getSystemName() },
    { name: 'System Version', value: DeviceInfo.getSystemVersion() },
  ]), []);
  return (
    <View style={{}}>
      <TouchableOpacity style={styles.tool} onPress={() => setShowInfo(!isShowInfo)}>
        <Text allowFontScaling={false} style={styles.toolCaption}>{isShowInfo ? '-' : '+'} Device Info</Text>
      </TouchableOpacity>
      {isShowInfo && (
        <ScrollView horizontal>
          <View >
            {info.map(({ name, value }, index) => {
              return (
                <View style={styles.infoRow} key={index}>
                  <Text allowFontScaling={false} style={{ width: 120 }}>{name}</Text>
                  <Text allowFontScaling={false}>{value}</Text>
                </View>
              )
            })}
          </View>
        </ScrollView>
      )}
    </View>
  )
}

const DevToolContainer = ({ position, setPosition, backgroundColor, toggleTool }: Props) => {
  const inset = useSafeAreaInsets();
  const {
    axiosLog: [isShowAxiosLog, setShowAxiosLog] = [],
    asyncStorage: [isShowAsyncStorage, setShowAsyncStorage] = [],
  } = React.useContext(ToolContext);

  const isRight = position === PositionRight;

  return (
    <View
      style={[
        styles.body,
        { backgroundColor },
      ]}>
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

        <TouchableOpacity style={styles.tool} onPress={() => RNRestart.Restart()}>
          <Text allowFontScaling={false} style={styles.toolCaption}>Restart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tool} onPress={() => { setShowAxiosLog(!isShowAxiosLog); toggleTool() }}>
          <Text allowFontScaling={false} style={styles.toolCaption}>{isShowAxiosLog ? 'Hide' : 'Show'} Axios Log</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tool} onPress={() => { setShowAsyncStorage(!isShowAsyncStorage); toggleTool() }}>
          <Text allowFontScaling={false} style={styles.toolCaption}>{isShowAsyncStorage ? 'Hide' : 'Show'} AsyncStorage</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tool} onPress={() => { setEnableDevTool(false) }}>
          <Text allowFontScaling={false} style={styles.toolCaption}>Disable DevTool</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const ToolHandle = ({
  isRight,
  onPress,
  backgroundColor,
  translateX,
}: {
  isRight: boolean,
  onPress: Function,
  backgroundColor: string,
  translateX?: Animated.AnimatedInterpolation
}) => {
  const handle = ASGesutreResponder({
    key: '__DevTool_Handle__',
    onPress
  });

  if( !handle.isLoad ) return null;

  return (
    <Animated.View
      style={[
        styles.handle,
        isRight ? styles.handleRight : styles.handleLeft,
        { transform: [{ translateY: handle.pan.y }, { translateX}] },
        { backgroundColor },
      ]}
      {...handle.responder}
    >
      <View
        style={{
          height: HandleHeight - 20,
          width: 3,
          borderRadius: 3 / 2,
          backgroundColor: '#000',
        }}
      />
      <View
        style={{
          height: HandleHeight - 20,
          width: 3,
          borderRadius: 3 / 2,
          backgroundColor: '#000',
        }}
      />
    </Animated.View >
  )
}

const ToolView = ({ }) => {
  const [isShow, setIsShow] = React.useState(false);
  const [isShowContent, setIsShowContent] = React.useState(false);
  const [opacity, setOpacity] = React.useState(0x90);
  const [position, setPosition] = React.useState(PositionRight);

  const backgroundColor = `#000000${opacity.toString(16)}`;
  const width: number = Dimensions.get('window').width / 2;
  const appearAnimated = React.useRef(new Animated.Value(1)).current;

  const isRight = position === PositionRight;
  const translateX = appearAnimated.interpolate({
    inputRange: [0, 1],
    outputRange: isRight ? [0, -width] : [0, width],
  });
  const handleTouch = () => {
    setIsShow(!isShow);
  }

  React.useEffect(() => {
    if( isShow ) {
      setIsShowContent(true);
    }
    Animated.timing(appearAnimated, {
      toValue: isShow ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start(()=>{
      if( !isShow ) {
        setIsShowContent(false);
      }
    });
  }, [isShow]);

  React.useEffect(() => {
    setOpacity(0x80);
  }, []);

  return (
    <>
      <ToolHandle
        isRight={isRight}
        onPress={handleTouch}
        backgroundColor={backgroundColor}
        translateX={appearAnimated.interpolate({
          inputRange: [0, 1],
          outputRange: isRight ? [0, -width] : [0, width],
        })}
      />
      {isShowContent && (
        <Animated.View
          style={[
            styles.container,
            isRight ? { right: -width } : { left:-width },
            {
              width: width,
              transform: [{ translateX }],
              zIndex: Number.MAX_SAFE_INTEGER - 1,
            },
            // isRight ? styles.containerRight : styles.containerLeft,
          ]}>

          <SafeAreaProvider style={{ flex: 1 }}>
            <DevToolContainer
              backgroundColor={backgroundColor}
              setPosition={setPosition}
              position={position}
              toggleTool={() => {
                handleTouch();
              }}
            />
          </SafeAreaProvider>

        </Animated.View>
      )}
    </>
  )
}

export default ToolView;