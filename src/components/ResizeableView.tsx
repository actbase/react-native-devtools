import React from 'react';
import { View, Text, StyleSheet, ViewStyle, Animated, Dimensions } from 'react-native';
import ASGesutreResponder from './useASGesutreResponder';
import TransformerButton from './TransformerButton';
interface Props {
  title: string;
  onClose?: Function;
  isClose?: boolean;
  contentContainerStyle?: ViewStyle;
  children?: JSX.Element | React.Component;
  nowMove?: boolean;
  renderHeaderExtra?: Function;
  renderFooter?: Function;
}

const styles = StyleSheet.create({

  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    minWidth: 200,
    minHeight: 100,

    shadowOffset: {
      width: -2, height: 0
    },
    shadowColor: 'black',
    shadowRadius: 5,
    shadowOpacity: 0.2,
    elevation: 10,
  },

  innerContainer: {
    flex: 1,
    backgroundColor: '#ffffff99',
    justifyContent: 'space-between',
    borderRadius: 5,
    overflow: 'hidden',
  },
  topView: {
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fafafa',
  },
  title: { color: '#666', fontWeight: 'bold', letterSpacing: -0.5 },
  resizeHandle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: 30,
    width: 30,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resizeHandleInner: {
    position: 'absolute',
    width: 15,
    height: 2,
    borderRadius: 1,
    transform: [{ rotate: '-45deg' }, { translateY: -2.5 }],
    backgroundColor: '#ccc',

  },
  resizeHandleInner2: {
    position: 'absolute',
    width: 15,
    height: 2,
    borderRadius: 1,
    transform: [{ rotate: '-45deg' }, { translateY: 2.5 }],
    backgroundColor: '#ccc',
  },
});

const ResizeableView = ({
  title,
  contentContainerStyle,
  children,
  onClose,
  renderHeaderExtra,
  renderFooter,
  isClose = true,
}: Props): JSX.Element | null => {

  const window = Dimensions.get('window');
  const move = ASGesutreResponder({
    key: `${title}_move`,
    initialValue: { x: 50, y: 50 },
    max: { x: window.width - 80, y: window.height - 80 },
    min: { x: -window.width / 2, y: -window.height / 2 }
  });

  const resize = ASGesutreResponder({
    key: `${title}_resize`,
    initialValue: { x: 200, y: 200 },
    max: { x: window.width, y: window.height },
    min: { x: 200, y: 100 }
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            { translateX: move.pan.x },
            { translateY: move.pan.y }],
        },
        { width: resize.pan.x, height: resize.pan.y },
      ]}>
      <View style={styles.innerContainer}>

        <View style={styles.topView} {...move.responder}>
          <TransformerButton
            onPress={() => onClose?.()}
            isClose={isClose}
          />

          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={styles.title}>
              {title}
            </Text>
          </View>
          {renderHeaderExtra?.()}
        </View>
        {/* Content */}
        <View style={[{ flex: 1 }, contentContainerStyle]}>{children}</View>
        {/* Footer */}
        <View style={styles.topView} {...move.responder} >
          {renderFooter?.()}
        </View>
        {/* ResizeHandle */}
        <View style={styles.resizeHandle} {...resize.responder}>
          <View style={styles.resizeHandleInner} />
          <View style={styles.resizeHandleInner2} />
        </View>
      </View>
    </Animated.View>
  );
};


export default ResizeableView;
