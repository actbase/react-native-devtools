import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { LogContext } from '../context/log/LogContext';
import { ToolContext } from '../context/toolManager/ToolContext';
import ResizeableView from '../components/ResizeableView';
import Button from '../components/Button';
import { useASStoredState } from '../utils/ASStore';
const DevTreeView = require('react-native-dev-treeview').default;

const styles = StyleSheet.create({
  headerExtra: {
    flexDirection: 'row',
  },
  list: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  logDate: {
    fontSize: 12,
    color: 'white',
    width: 80,
  },
  logContents: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  logContent: {
    color: '#eee',
  },

  typeLog: {
    color: 'white',
  },
  typeWarn: {
    color: '#cccc66'
  },
  typeError: {
    color: '#cc6666'
  },
});

const getTypeStyle = (type: TLogType) => {
  if (type === 'log') return styles.typeLog;
  if (type === 'warn') return styles.typeWarn;
  if (type === 'error') return styles.typeError;
  return null;
}

const LogItem = ({ log, fontSize = 14 }: { log: ILog, fontSize: number }) => {
  return (
    <View style={styles.row}>
      <Text style={[styles.logDate, getTypeStyle(log.type), { fontSize }]}>{log.time}</Text>
      <View style={styles.logContents}>
        {log?.contents?.map((content, index) => {
          if (content !== null && typeof content != 'undefined'
            && typeof content != 'string' && typeof content != 'boolean'
            && typeof content != 'number' && typeof content == 'object'
          ) return (
            <View key={`${index}`} style={{}}>
              <DevTreeView data={content} style={{ flex: 1, backgroundColor: '#33333399' }} fontSize={fontSize} />
            </View>
          )
          return (
            <Text key={`${index}`} style={[styles.logContent, { fontSize }]}>{content}</Text>
          )
        })}
      </View>
    </View>
  )
}

const LogView = () => {
  const { logs, clearLogs, isStealingLog, stealConsoleLog, recoverConsoleLog, logCount, setLogCount } = React.useContext<ILogContext>(LogContext);
  const { log: [isShow, setShow] = [] } = React.useContext(ToolContext);
  const [fontSize, setFontSize] = useASStoredState('Log_fontsize', 14);

  if (!isShow) return null;

  const fontSizeUp = () => setFontSize(prev => Math.min(24, prev + 1));
  const fontSizeDown = () => setFontSize(prev => Math.max(7, prev - 1));
  const innerTools = () => {
    return (
      <View style={styles.headerExtra}>
        <Button onPress={() => {
          setLogCount(prev => (prev + 100) % 400);
        }}>{`${logCount}`}</Button>
        <Button onPress={fontSizeUp}>+</Button>
        <Button onPress={fontSizeDown}>-</Button>
        {isStealingLog ? (
          <Button onPress={recoverConsoleLog}>R</Button>
        ) : (
          <Button onPress={stealConsoleLog}>S</Button>
        )}
        <Button onPress={clearLogs}>C</Button>
      </View>
    )
  }

  return (
    <ResizeableView
      title={'Log'}
      onClose={() => setShow(false)}
      renderHeaderExtra={innerTools}
      renderFooter={innerTools}
    >
      <FlatList
        style={styles.list}
        data={logs}
        renderItem={({ item }) => <LogItem log={item} fontSize={fontSize} />}
      />
    </ResizeableView>
  )
}


export default LogView;