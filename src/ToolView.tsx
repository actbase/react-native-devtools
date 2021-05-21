import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import AxoisLog from './tools/AxoisLog';
import { ToolContext } from './context/toolManager/ToolContext';
import Button from './components/Button';

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: '20%',
    height: '100%',
    backgroundColor: '#919191a0',
    paddingVertical: 20,
  },
  grab: {
    position: 'absolute',
    right: '20%',
    top: '50%',
    backgroundColor: '#000000',
    width: 30,
    height: 50,
  },
  button: {
    fontSize: 10,
  },
});

const ToolView = () => {
  const { isShowDevTool, type, setToolType, setShowDevTool } = useContext(ToolContext);
  const onPressLog = () => {
    setToolType('axiosLog');
  };

  // const onCloseLog = () => {
  //   setToolType(undefined);
  // };

  return (
    <>
      <View style={[styles.grab, { right: isShowDevTool ? '20%' : 0 }]}>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => {
            isShowDevTool ? setShowDevTool(false) : setShowDevTool(true);
          }}></TouchableOpacity>
      </View>
      {isShowDevTool && (
        <>
          <View style={styles.bar}>
            <Button
              style={{ borderWidth: 1, backgroundColor: '#f2f2f2' }}
              textStyle={styles.button}
              onPress={onPressLog}
            >
              AxiosLog
              </Button>
          </View>
          {type === 'axiosLog' && <AxoisLog />}
        </>
      )}
    </>
  );
};



export default ToolView;
