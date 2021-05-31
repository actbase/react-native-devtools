import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { setEnableDevTool, addDevToolEnableListener } from '@actbase/react-native-devtools';
import { useNavigation } from '@react-navigation/core';
import common_styles from '../commons/styles';

import DevTools from '@actbase/react-native-devtools';
import { Animated } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonBar: {
    position: 'absolute',
    height: 2,
    borderRadius: 2,
    backgroundColor: 'white',
  },
  buttonCloseCross1: {
    width: 15,
    transform: [{ rotate: '45deg' }, { translateX: 0 }, { translateY: -0 }],
  },
  buttonCloseCross2: {
    width: 15,
    transform: [{ rotate: '-45deg' }, { translateX: 0 }, { translateY: 0 }],
  },
  buttonBackCross1: {
    width: 9,
    transform: [{ rotate: '-45deg' }, { translateX: 2 }, { translateY: -2 }],
  },
  buttonBackCross2: {
    width: 9,
    transform: [{ rotate: '45deg' }, { translateX: 2 }, { translateY: 2 }],
  },
});

const TransformerButton = ({ onPress, isClose }) => {
  const animated = React.useRef(new Animated.Value(0)).current;
  
  React.useEffect(() => {
    Animated.timing(animated, {
      toValue: isClose ? 0 : 1,
      duration: 500,
      useNativeDriver:false,
    }).start();
  }, [isClose]);

  const width = animated.interpolate({ inputRange: [0, 1], outputRange: [15, 9] });
  const rotate1 = animated.interpolate({ inputRange: [0, 1], outputRange: ['45deg', '-45deg'] });
  const rotate2 = animated.interpolate({ inputRange: [0, 1], outputRange: ['-45deg', '45deg'] });
  const translateX1 = animated.interpolate({ inputRange: [0, 1], outputRange: [0, 2] });
  const translateX2 = animated.interpolate({ inputRange: [0, 1], outputRange: [0, 2] });
  const translateY1 = animated.interpolate({ inputRange: [0, 1], outputRange: [0, -2] });
  const translateY2 = animated.interpolate({ inputRange: [0, 1], outputRange: [0, 2] });

  return (
    <TouchableOpacity
      hitSlop={{
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
      }}
      style={[styles.button, { backgroundColor: 'red' }]}
      onPress={() => {
        onPress();
      }}
    >
      <Animated.View
        style={[
          styles.buttonBar,
          {
            width,
            transform: [{ rotate: rotate1 }, { translateX: translateX1 }, { translateY: translateY1 }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.buttonBar,
          {
            width,
            transform: [{ rotate: rotate2 }, { translateX: translateX2 }, { translateY: translateY2 }],
          },
        ]}
      />
    </TouchableOpacity>
  );
};

const Main = () => {
  const navigation = useNavigation();
  const [isEnabledDevTool, setIsEnableDevTool] = React.useState();
  const [isClose, setIsClose] = React.useState(true);

  React.useEffect(() => {
    setEnableDevTool(isEnabledDevTool);
    const removeListener = addDevToolEnableListener(enabled => {
      setIsEnableDevTool(enabled);
    });
    return () => {
      removeListener();
    };
  }, [isEnabledDevTool]);

  const handlePress = () => {
    setIsEnableDevTool(!isEnabledDevTool);
  };

  return (
    <View style={styles.container}>
      <Text>Main</Text>
      
      <TouchableOpacity style={common_styles.button} onPress={handlePress}>
        <Text>{isEnabledDevTool ? 'Hide' : 'Show'} DevTools</Text>
      </TouchableOpacity>

      <TouchableOpacity style={common_styles.button} onPress={() => navigation.navigate('AxiosLogSample')}>
        <Text>Axios Logs Sample</Text>
      </TouchableOpacity>

      <TouchableOpacity
        hitSlop={{
          top: 10,
          left: 10,
          right: 10,
          bottom: 10,
        }}
        style={[styles.button, { backgroundColor: 'red' }]}
        onPress={() => {}}
      >
        <View style={[styles.buttonBar, styles.buttonBackCross1]} />
        <View style={[styles.buttonBar, styles.buttonBackCross2]} />
      </TouchableOpacity>
      <TransformerButton
        onPress={() => {
          setIsClose(!isClose);
        }}
        isClose={isClose}
      />
    </View>
  );
};

export default Main;
