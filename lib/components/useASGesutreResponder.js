import React from 'react';
import { Animated } from 'react-native';
import ASStore from '../utils/ASStore';

var ASGesutreResponder = function (_a) {
  var key = _a.key,
      initialValue = _a.initialValue,
      onPress = _a.onPress,
      _b = _a.touchDelayMS,
      touchDelayMS = _b === void 0 ? 200 : _b,
      _c = _a.min,
      min = _c === void 0 ? {
    x: Number.MIN_SAFE_INTEGER,
    y: Number.MIN_SAFE_INTEGER
  } : _c,
      _d = _a.max,
      max = _d === void 0 ? {
    x: Number.MAX_SAFE_INTEGER,
    y: Number.MAX_SAFE_INTEGER
  } : _d;
  var ref = React.useRef({
    start: {
      offset: {
        x: 0,
        y: 0
      },
      move: {
        x: 0,
        y: 0
      }
    },
    current: initialValue,
    pan: new Animated.ValueXY(initialValue || {
      x: 0,
      y: 0
    })
  }).current;
  React.useEffect(function () {
    if (!key) return;
    var v = ASStore.get(key);
    if (!v || !v.x || !v.y) return;
    ref.pan.setValue(ref.current = v);
  }, [key]);
  var handleTouchTime = React.useRef(0);
  return {
    pan: ref.pan,
    responder: {
      onStartShouldSetResponder: function () {
        return true;
      },
      onResponderGrant: function (_a) {
        var _b = _a.nativeEvent,
            pageX = _b.pageX,
            pageY = _b.pageY;
        ref.start.offset = {
          x: pageX,
          y: pageY
        };
        ref.start.move = ref.current || {
          x: 0,
          y: 0
        };
        if (onPress) handleTouchTime.current = Date.now();
      },
      onResponderMove: function (_a) {
        var _b = _a.nativeEvent,
            pageX = _b.pageX,
            pageY = _b.pageY;
        var x = Math.max(min.x, Math.min(ref.start.move.x + pageX - (ref.start.offset.x || 0), max.x));
        var y = Math.max(min.y, Math.min(ref.start.move.y + pageY - (ref.start.offset.y || 0), max.y));
        ref.pan.setValue(ref.current = {
          x: x,
          y: y
        });
      },
      onResponderRelease: function (_a) {
        var _b = _a.nativeEvent,
            pageX = _b.pageX,
            pageY = _b.pageY;
        if (onPress && Date.now() - handleTouchTime.current < touchDelayMS) onPress();
        var x = Math.max(min.x, Math.min(ref.start.move.x + pageX - (ref.start.offset.x || 0), max.x));
        var y = Math.max(min.y, Math.min(ref.start.move.y + pageY - (ref.start.offset.y || 0), max.y));
        ref.pan.setValue(ref.current = {
          x: x,
          y: y
        });
        if (key) ASStore.set(key, ref.current);
      }
    }
  };
};

export default ASGesutreResponder;