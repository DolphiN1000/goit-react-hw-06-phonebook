import '../../shared/styles/styles.scss';

import ContactsForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactsList from './ContactList/ContactList';

import { getFilteredContacts } from 'redux/phonebook/phonebook-selectors';

import styles from './phonebook.module.scss';
import { useSelector } from 'react-redux';

const Phonebook = () => {
  const filteredContacts = useSelector(getFilteredContacts);

  const isContacts = Boolean(filteredContacts.length);

  return (
    <div className={styles.container}>
      <h1>Phonebook</h1>

      <ContactsForm />
      <h2>Contacts</h2>
      <Filter />
      {isContacts && <ContactsList />}
      {!isContacts && <p>Not yet added contacts</p>}
    </div>
  );
};

export default Phonebook;
