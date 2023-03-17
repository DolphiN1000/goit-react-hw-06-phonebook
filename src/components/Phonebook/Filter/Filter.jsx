import PropTypes from 'prop-types';

// import styles from './filter.module.scss';

const Filter = ({ handleChange, value }) => {
  return (
    <div>
      <label>Finde contacts by name</label>
      <input
        name="filter"
        value={value}
        onChange={handleChange}
        placeholder="Find contacts"
      />
    </div>
  );
};

export default Filter;

Filter.propTypes = {
  handleChange: PropTypes.func.isRequired,
};
