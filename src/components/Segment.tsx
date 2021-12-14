import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

interface ISegmentItem {
  label: string;
  value: any;
}

interface ISgementProps {
  items: ISegmentItem[];
  onPress: (item: ISegmentItem) => void;
  value: any;
}

const styles = StyleSheet.create({
  segment: {
    height: 35,
    alignSelf: 'stretch',
    flexDirection: 'row',
    borderRadius: 35 / 2,
    backgroundColor: '#eee',
    overflow: 'hidden',
    // borderColor: '#66666688',
    // borderWidth: 1,
  },
  element: {
    flex: 1,
    justifyContent: 'center',
  },
  elementSelected: {
    flex: 1,
    backgroundColor: '#333',
    justifyContent: 'center',
    // borderRadius: 10,
  },
  text: {
    fontSize: 8,
    color: '#999',
    textAlign: 'center',
  },
  textSelected: {
    fontSize: 8,
    color: '#fff',
    textAlign: 'center',
  },
})

const Segment = ({ items, onPress, value }: ISgementProps) => {
  return (
    <View style={styles.segment}>
      {items.map((item, index) => {
        const isSelected: boolean = item.value === value || item === value;
        return (
          <TouchableOpacity
            style={isSelected ? styles.elementSelected : styles.element}
            key={index}
            onPress={() => onPress(item)}
          >
            <Text allowFontScaling={false} style={isSelected ? styles.textSelected : styles.text}>{item?.label?.toUpperCase?.()}</Text>
          </TouchableOpacity>
        )
      })}
    </View>
  );
};


export default Segment;