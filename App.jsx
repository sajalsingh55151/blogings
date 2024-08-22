import React from 'react';
import FlashMessage from "react-native-flash-message";
import RootStack from './src/routes/RootStack';

function App() {
  return <>
  <RootStack/>
  <FlashMessage position="top" />
  </>;
}


export default App;
