import React from 'react';
import {
  Animated,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ToolHandle from './ToolHandle';
import ToolContent from './ToolContent';
import { PositionRight } from '../../commons/defines';

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
});

const ToolView = ({ }) => {
  const [isShow, setIsShow] = React.useState(false);
  // const [isShowContent, setIsShowContent] = React.useState(false);
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

  const handleTouch = () => setIsShow(!isShow)

  React.useEffect(() => {
    // if (isShow) setIsShowContent(true);
    Animated.timing(appearAnimated, {
      toValue: isShow ? 1 : 0,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      // if (!isShow) setIsShowContent(false);
    });
  }, [isShow]);

  React.useEffect(() => setOpacity(0x80), []);

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
          <ToolContent
            backgroundColor={backgroundColor}
            setPosition={setPosition}
            position={position}
            toggleTool={() => {
              handleTouch();
            }}
          />
        </SafeAreaProvider>
      </Animated.View>
    </>
  )
}

export default ToolView;