import React from 'react';
import { View, ScrollView } from 'react-native';
import LocalAPI from './LocalAPI';


const App = () => {
  return (
    <View>
      <ScrollView>
        <LocalAPI/>
      </ScrollView>
    </View>
  );
};

export default App;