import React, { } from 'react';
import { StyleSheet, View } from 'react-native';
import Text from '../../components/Text';



export default function HomeScreen() {



  return (
    <View style={{ flex: 1 }}>
      <View>
        <Text style={styles.title} text={"About this site"} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    textAlign: 'center'
  },
  listSection: {
    fontSize: 14,
    padding: 10
  }
});

