import { useDispatch } from 'react-redux';

import { setFilter } from 'redux/filter/filter-slice';
// import styles from './filter.module.scss';

const Filter = ({ handleChange, value }) => {

  const dispatch = useDispatch();

  const handleFilter = ({ target }) => {
    dispatch(setFilter(target.value));
  };

  return (
    <div>
      <label>Finde contacts by name</label>
      <input
        name="filter"
        value={value}
        onChange={handleFilter}
        placeholder="Find contacts"
      />
    </div>
  );
};

export default Filter;