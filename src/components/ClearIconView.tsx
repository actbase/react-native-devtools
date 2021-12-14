import React from 'react';
import { View } from 'react-native';

const ClearIconView = ({ color = 'black' }) => {
  return (
    <View
      style={{
        width: 9,
        height: 9,
        borderBottomColor: color,
        borderBottomWidth: 0.5,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: 6,
          height: 7,
          borderRadius: 1.5,
          borderWidth: 0.5,
          borderColor: color,
          position: 'absolute',
          transform: [{ translateX: 1 }, { rotate: '45deg' }, { translateY: 1.5 }],
        }}
      >
        <View style={{ width: 5, height: 0.75, backgroundColor: color, marginTop: 3.5 }} />
      </View>
    </View>
  );
};

export default ClearIconView;
