import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { OpaqueColorValue, StyleSheet, Text, View } from 'react-native';
import { ScrollSync } from 'react-native-sync-scrollview';
import { range } from 'lodash';

// render arbitrary row, not important
const Row = ({ title, index, height, color }: { title: string, index: number, height: number, color: string | typeof OpaqueColorValue | undefined }) => (
  <View
      key={`${title}-${index}`}
      style={{
          height: 25,
          backgroundColor: index % 2 === 0 ? 'lightgray' : color,
          padding: 10,
          margin: 5,
          borderRadius:10,
          borderWidth: 1,
          borderColor: '#fff',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
      }}
  >
      <Text>{title} #{index}</Text>
  </View>
);

export default function App() {
  const rowItems: JSX.Element[][] = range(3).map(rowI => range(Math.random() * 20 + 10).map(index => (
    <Row key={`row${rowI}-${index}`} color={'#' + Math.floor(Math.random()*16777215).toString(16)} title={"Item"} index={index} height={100} />
)));
  return (
    <View style={styles.container}>
      <Text>Example of Horizontal ScrollSync</Text>
      <ScrollSync rowItems={rowItems} containerStyle={styles.hScrollSync} />
      <Text>Example of Vertical ScrollSync</Text>
      <ScrollSync rowItems={rowItems} containerStyle={styles.vScrollSync} type="vertical" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  hScrollSync: { height: 150, margin: 10, padding: 2, borderRadius: 10, borderWidth: 1, borderColor: 'gray' },
  vScrollSync: { height: 300, flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'flex-start', margin: 10, padding: 2, borderRadius: 10, borderWidth: 1, borderColor: 'gray' },
});
