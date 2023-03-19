import PropTypes from 'prop-types';

import ContactsListItem from './ContactsListItem/ContactsListItem';

import { getFilteredContacts } from 'redux/phonebook/phonebook-selectors';
import styles from './contactList.module.scss';
import { useSelector } from 'react-redux';

const ContactsList = () => {
  const filteredContacts = useSelector(getFilteredContacts);
  const contactsSorted = filteredContacts;
  // .sort(function (a, b) {
  //   if (a.name.toLowerCase() > b.name.toLowerCase()) {
  //     return 1;
  //   }
  //   if (a.name.toLowerCase() < b.name.toLowerCase()) {
  //     return -1;
  //   }
  //   return 0;
  // });

  const elements = contactsSorted.map(({ id, name, number }) => {
    return <ContactsListItem key={id} id={id} name={name} number={number} />;
  });

  return <ol className={styles.list}>{elements}</ol>;
};

export default ContactsList;

ContactsList.defaultProps = {
  contacts: [],
};

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
