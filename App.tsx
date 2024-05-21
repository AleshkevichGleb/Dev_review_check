/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import Navigation from "./app/screens/Navigation.tsx";
import {Provider} from "react-redux";
import {store} from "./app/store/store.ts";


function App(): React.JSX.Element {
  return (
      <Provider store={store}>
        <Navigation/>
      </Provider>
  );
}


export default App;
