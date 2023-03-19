import { useState } from 'react';
import PropTypes from 'prop-types';

import initialState from './initialState';

import styles from './contactForm.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/phonebook/phonebook-slice';
import { getAllContacts } from 'redux/phonebook/phonebook-selectors';

const ContactsForm = () => {
  const [contact, setContact] = useState({ ...initialState });
  const dispatch = useDispatch();
  const contacts = useSelector(getAllContacts);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setContact(prevContact => {
      return { ...prevContact, [name]: value };
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    handleaddContact({ ...contact });
    setContact({ ...initialState });
  };

  const handleaddContact = ({ name, number }) => {
    if (isDulicate(name, number)) {
      alert(`${name}: ${number} is in phonebook`);
      return false;
    }
    dispatch(addContact({ name, number }));
  };

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

  const { name, number } = contact;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <p>Name</p>
      <input
        className={styles.input}
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <p>Number</p>
      <input
        className={styles.input}
        type="tel"
        name="number"
        value={number}
        onChange={handleChange}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <button className={styles.button} type="submit">
        Add contact
      </button>
    </form>
  );
};

export default ContactsForm;

ContactsForm.protoType = {
  onSubmit: PropTypes.func.isRequired,
};
