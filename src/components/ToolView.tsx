import React from 'react';
import {
  View,
  Text,
  Animated,
  Easing,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';

import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

import { ToolContext } from '../context/toolManager/ToolContext';
import { setEnableDevTool } from '../context/devToolEmitter/devToolEmitter';
import ASGesutreResponder from './ASGesutreResponder';
import assets from '../assets';
import ToolButton from './ToolButton';
import DeviceInfoView from '../tools/DeviceInfoView';
// const DevTreeView = require('react-native-dev-treeview').default;
const RNRestart = require('react-native-restart').default;

const HandleWidth = 20;
const HandleHeight = 40;

const PositionRight = 'right';
const PositionLeft = 'left';

const InfoRowHeight = 26;

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
  handleBar: {
    height: HandleHeight - 20,
    width: 3,
    borderRadius: 3 / 2,
    backgroundColor: '#000',
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


const DevToolContainer = ({ position, setPosition, backgroundColor, toggleTool }: Props) => {
  const inset = useSafeAreaInsets();
  const {
    axiosLog: [isShowAxiosLog, setShowAxiosLog] = [],
    asyncStorage: [isShowAsyncStorage, setShowAsyncStorage] = [],
  } = React.useContext(ToolContext);

  const isRight = position === PositionRight;

  return (
    <View
      style={[styles.body, { backgroundColor }]}>
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
    key: 'Handle',
    initialValue: { x: 0, y: 0 },
    onPress
  });

  return (
    <Animated.View
      style={[
        styles.handle,
        isRight ? styles.handleRight : styles.handleLeft,
        { transform: [{ translateY: handle.pan.y }, { translateX }] },
        { backgroundColor },
      ]}
      {...handle.responder}
    >
      <View style={styles.handleBar} />
      <View style={styles.handleBar} />
    </Animated.View >
  )
}

const ToolView = ({ }) => {
  const [isShow, setIsShow] = React.useState(false);
  const [isShowContent, setIsShowContent] = React.useState(false);
  const [opacity, setOpacity] = React.useState(0x40);
  const [position, setPosition] = React.useState(PositionRight);

  const backgroundColor = `#000000${opacity.toString(16)}`;
  const width: number = Dimensions.get('window').width / 2;
  const appearAnimated = React.useRef(new Animated.Value(0)).current;

  const isRight = position === PositionRight;
  const translateX = appearAnimated.interpolate({
    inputRange: [0, 1],
    outputRange: isRight ? [0, -width] : [0, width],
  });
  const handleTouch = () => {
    setIsShow(!isShow);
  }

  React.useEffect(() => {
    if (isShow) setIsShowContent(true);
    Animated.timing(appearAnimated, {
      toValue: isShow ? 1 : 0,
      duration: 500,
      easing: Easing.bounce,
      useNativeDriver: false,
    }).start(() => {
      if (!isShow) setIsShowContent(false);
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
            isRight ? { right: -width } : { left: -width },
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