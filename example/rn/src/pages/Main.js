import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { setEnableDevTool, addDevToolEnableListener } from '@actbase/react-native-devtools';
import { useNavigation } from '@react-navigation/core';
import common_styles from '../commons/styles'

import DevTools from '@actbase/react-native-devtools';

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
});

const Main = ()=>{
  const navigation = useNavigation();
  const [isEnabledDevTool, setIsEnableDevTool] = React.useState();

  React.useEffect(() => {
    setEnableDevTool(isEnabledDevTool);
    const removeListener = addDevToolEnableListener((enabled)=>{
      setIsEnableDevTool(enabled);
    });
    return ()=>{
      removeListener();
    }
  }, [isEnabledDevTool]);

  const handlePress = () => {
    setIsEnableDevTool(!isEnabledDevTool);
  };

  return(
    <View style={styles.container}>
      <Text>Main</Text>

      <TouchableOpacity style={common_styles.button} onPress={handlePress}>
        <Text>{isEnabledDevTool ? 'Hide' :'Show'} DevTools</Text>
      </TouchableOpacity>
      <TouchableOpacity style={common_styles.button} onPress={()=>navigation.navigate('AxiosLogSample')}>
        <Text>Axios Logs Sample</Text>
      </TouchableOpacity>
    </View>
  )
};


export default Main;