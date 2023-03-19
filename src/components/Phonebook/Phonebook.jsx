import '../../shared/styles/styles.scss';

import ContactsForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactsList from './ContactList/ContactList';

import {
  getAllContacts,
  getFilteredContacts,
} from 'redux/phonebook/phonebook-selectors';

import styles from './phonebook.module.scss';
import { useDispatch, useSelector } from 'react-redux';

import { addContact, deleteContact } from 'redux/phonebook/phonebook-slice';
import { setFilter } from 'redux/filter/filter-slice';

const Phonebook = () => {
  const filteredContacts = useSelector(getFilteredContacts);
  const contacts = useSelector(getAllContacts);
  // const filter = useSelector(getFilter);
  const dispatch = useDispatch();
  // const [contacts, setContacts] = useState(() => {
  //   const contacts = JSON.parse(localStorage.getItem('my-contacts'));
  //   return contacts ? contacts : [];
  // });
  // const [filter, setFilter] = useState('');

  // useEffect(() => {
  //   localStorage.setItem('my-contacts', JSON.stringify(contacts));
  // }, [contacts]);

  

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  const handleFilter = ({ target }) => {
    dispatch(setFilter(target.value));
  };

  const isContacts = Boolean(filteredContacts.length);

  return (
    <div className={styles.container}>
      <h1>Phonebook</h1>

      <ContactsForm />
      <h2>Contacts</h2>
      <Filter handleChange={handleFilter} />
      {isContacts && (
        <ContactsList
          contacts={filteredContacts}
          deleteContact={handleDeleteContact}
        />
      )}
      {!isContacts && <p>Not yet added contacts</p>}
    </div>
  );
};

export default Phonebook;
