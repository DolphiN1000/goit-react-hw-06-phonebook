import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Phonebook from 'components/Phonebook/Phonebook';

import { persistor, store } from 'redux/store';

export const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Phonebook />
      </PersistGate>
    </Provider>
  );
};
