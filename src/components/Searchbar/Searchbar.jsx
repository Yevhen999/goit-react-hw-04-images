import { Formik, Form, Field } from 'formik';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export const SearchForm = ({ onFormSubmit }) => {
  const initialValues = {
    query: '',
  };

  const handleSubmit = (values, { resetForm }) => {
    if (values.query.trim() === '') {
      alert('Type anything');
      return;
    }

    onFormSubmit(values);
    resetForm();
  };

  return (
    <header className={css.Searchbar}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={css.SearchForm}>
          <button className={css.SearchFormButton} type="submit">
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>
          <Field
            className={css.SearchFormInput}
            type="text"
            name="query"
            autoFocus
            placeholder="🔍Search images and photos"
          />
        </Form>
      </Formik>
    </header>
  );
};

SearchForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};
