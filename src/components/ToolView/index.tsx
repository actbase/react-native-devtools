import React from 'react';
import {
  Animated,
  StyleSheet,
  Dimensions,
} from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import ToolButton from './ToolHandle';
import ToolHandle from './ToolHandle';
import ToolContent from './ToolContent';
import { PositionRight } from '../../commons/defines';

const styles = StyleSheet.create({
  content: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    shadowOffset: {
      width: -2, height: -2
    },
    shadowColor: 'black',
    shadowRadius: 5,
    shadowOpacity: 0.2,
  },
  contentRight: {
    right: 0,
  },
  contentLeft: {
    left: 0,
  },
});

const ToolView = ({ extensions = [], isOpen, onChangeOpen }: IToolViewProps) => {

  // const [isShowContent, setIsShowContent] = React.useState(false);
  const [opacity, setOpacity] = React.useState(0x40);
  const [position, setPosition] = React.useState(PositionRight);
  const [shadowOpacity, setShadowOpacity] = React.useState(0);

  const backgroundColor = `#fafafa${opacity.toString(16)}`;
  const width: number = Dimensions.get('window').width / 2;
  const appearAnimated = React.useRef(new Animated.Value(0)).current;

  const isRight = position === PositionRight;
  const translateX = appearAnimated.interpolate({
    inputRange: [0, 1],
    outputRange: isRight ? [0, -width] : [0, width],
  });

  const handleTouch = () => {
    onChangeOpen(!isOpen);
  }

  React.useEffect(() => {
    // if (isShow) setIsShowContent(true);
    if (isOpen)
      setShadowOpacity(0.2);
    Animated.timing(appearAnimated, {
      toValue: isOpen ? 1 : 0,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      // if (!isShow) setIsShowContent(false);
      if (!isOpen)
        setShadowOpacity(0);
    });
  }, [isOpen]);

  React.useEffect(() => { setOpacity(0xFF) }, []);

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
          styles.content,
          isRight ? { right: -width } : { left: -width },
          {
            width: width,
            transform: [{ translateX }],
            zIndex: Number.MAX_SAFE_INTEGER - 2,
            shadowOpacity
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
            extensions={extensions}
          />
        </SafeAreaProvider>
      </Animated.View>
    </>
  )
};

export default ToolView;
export {
  ToolButton,
}