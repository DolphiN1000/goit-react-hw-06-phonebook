import {Provider} from 'react-redux';

import Phonebook from 'components/Phonebook/Phonebook';

export const App = () => {
  return (
    <Provider store={store}>
      <Phonebook />
    </Provider>
  );
};
