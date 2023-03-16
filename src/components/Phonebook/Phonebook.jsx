import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import '../../shared/styles/styles.scss';

import ContactsForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactsList from './ContactList/ContactList';

import styles from './phonebook.module.scss';

const Phonebook = () => {
  const [contacts, setContacts] = useState(() => {
    const contacts = JSON.parse(localStorage.getItem('my-contacts'));
    return contacts ? contacts : [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('my-contacts', JSON.stringify(contacts));
  }, [contacts]);

  const isDulicate = (name, number) => {
    const normalizedName = name.toLowerCase();
    const normalizedNumber = number.toLowerCase();
    const result = contacts.find(({ name, number }) => {
      return (
        name.toLowerCase() === normalizedName ||
        number.toLowerCase() === normalizedNumber
      );
    });
    return Boolean(result);
  };

  const addContact = ({ name, number }) => {
    if (isDulicate(name, number)) {
      alert(`${name}: ${number} is in phonebook`);
      return false;
    }
    setContacts(prevContacts => {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      return [newContact, ...prevContacts];
    });
    return true;
  };

  const deleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const handleFilter = ({ target }) => setFilter(target.value);

  const getFilteredContacts = () => {
    if (!filter) {
      return contacts;
    }

    const normalizedFilter = filter.toLowerCase();
    const finded = contacts.filter(({ name, number }) => {
      return (
        name.toLowerCase().includes(normalizedFilter) ||
        number.toLowerCase().includes(normalizedFilter)
      );
    });
    return finded;
  };

  const filteredContacts = getFilteredContacts();

  const isContacts = Boolean(filteredContacts.length);

  return (
    <div className={styles.container}>
      <h1>Phonebook</h1>

      <ContactsForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter handleChange={handleFilter} />
      {isContacts && (
        <ContactsList
          contacts={filteredContacts}
          deleteContact={deleteContact}
        />
      )}
      {!isContacts && <p>Not yet added contacts</p>}
    </div>
  );
};


export default Phonebook;
