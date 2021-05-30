import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle, Animated } from 'react-native';
import ASGesutreResponder from '../components/ASGesutreResponder';

interface Props {
  title: string;
  onClose?: Function,
  contentContainerStyle?: ViewStyle,
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
    minHeight: 200,
    backgroundColor: '#00000099',
    justifyContent: 'space-between',
    borderRadius: 5,
    overflow: 'hidden',
  },
  topView: {
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#000000',
  },
  resizeHandle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: 30,
    width: 30,
    backgroundColor:'transparent',
  },
  resizeHandleInner: {
    position:'absolute',
    width: 0,
    height: 0,
    right:0,
    bottom:0,
    zIndex:0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderBottomWidth: 30,
    borderLeftWidth: 30,
    borderBottomColor: '#ffffff88',
  },
  resizeHandleInner2: {
    position:'absolute',
    width: 0,
    height: 0,
    right:0,
    bottom:0,
    zIndex:1,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderBottomWidth: 15,
    borderLeftWidth: 15,
    borderBottomColor: '#ffffff88',
  },
  buttonClose: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonCloseCross1: {
    position: 'absolute',
    width: 15,
    height: 2,
    borderRadius: 2,
    backgroundColor: 'white',
    transform: [{ rotate: '45deg' }]
  },
  buttonCloseCross2: {
    position: 'absolute',
    width: 15,
    height: 2,
    borderRadius: 2,
    backgroundColor: 'white',
    transform: [{ rotate: '-45deg' }]
  },
});

const ResizeableView = ({
  title,
  contentContainerStyle,
  children,
  onClose,
  renderHeaderExtra,
  renderFooter,
}: Props): JSX.Element => {
  const move = ASGesutreResponder({
    key: `__DevTool_${title}_move__`,
    initialValue: { x: 50, y: 50 }
  });
  const resize = ASGesutreResponder({
    key: `__DevTool_${title}_resize__`,
    initialValue: { x: 200, y: 200 }
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
      <View style={styles.topView} {...move.responder}>
        <TouchableOpacity style={styles.buttonClose} onPress={() => {
          onClose?.();
        }}>
          <View style={styles.buttonCloseCross1} />
          <View style={styles.buttonCloseCross2} />
        </TouchableOpacity>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
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
    </Animated.View>
  );
};


export default ResizeableView;
