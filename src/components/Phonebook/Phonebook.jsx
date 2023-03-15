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

// class Phonebook extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//   };

//   componentDidMount() {
//     const contacts = JSON.parse(localStorage.getItem('my-contacts'));
//     if (contacts?.length) {
//       this.setState({ contacts });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     const { contacts } = this.state;
//     if (prevState.contacts.length !== contacts.length) {
//       localStorage.setItem('my-contacts', JSON.stringify(contacts));
//     }
//   }

//   addContact = ({ name, number }) => {
//     if (this.isDulicate(name, number)) {
//       alert(`${name}: ${number} is in phonebook`);
//       return false;
//     }
//     this.setState(prevState => {
//       const { contacts } = prevState;
//       const newContact = {
//         id: nanoid(),
//         name,
//         number,
//       };
//       return { contacts: [newContact, ...contacts] };
//     });
//     return true;
//   };

//   deleteContact = id => {
//     this.setState(({ contacts }) => {
//       const newContacts = contacts.filter(contact => contact.id !== id);
//       return { contacts: newContacts };
//     });
//   };

//   handleFilter = ({ target }) => {
//     this.setState({ filter: target.value });
//   };

// getFilteredContacts() {
//   const { filter, contacts } = this.state;
//   if (!filter) {
//     return contacts;
//   }

//   const normalizedFilter = filter.toLocaleLowerCase();
//   const finded = contacts.filter(({ name, number }) => {
//     return (
//       name.toLocaleLowerCase().includes(normalizedFilter) ||
//       number.toLocaleLowerCase().includes(normalizedFilter)
//     );
//   });
//   return finded;
// }

//   isDulicate(name, number) {
//     const normalizedName = name.toLocaleLowerCase();
//     const normalizedNumber = number.toLocaleLowerCase();
//     const { contacts } = this.state;
//     const result = contacts.find(({ name, number }) => {
//       return (
//         name.toLocaleLowerCase() === normalizedName ||
//         number.toLocaleLowerCase() === normalizedNumber
//       );
//     });
//     return Boolean(result);
//   }

//   render() {
//     const { addContact, deleteContact, handleFilter } = this;
//     const contacts = this.getFilteredContacts().sort(function (a, b) {
//       if (a.name > b.name) {
//         return 1;
//       }
//       if (a.name < b.name) {
//         return -1;
//       }
//       return 0;
//     });
//     const isContacts = Boolean(contacts.length);
//     return (
//       <div className={styles.container}>
//         <h1>Phonebook</h1>

//         <ContactsForm onSubmit={addContact} />
//         {/* <div className={styles.contacts}> */}
//         <h2>Contacts</h2>
//         <Filter handleChange={handleFilter} />
//         {isContacts && (
//           <ContactsList contacts={contacts} deleteContact={deleteContact} />
//         )}
//         {!isContacts && <p>Not yet added contacts</p>}
//         {/* </div> */}
//       </div>
//     );
//   }
// }

export default Phonebook;
