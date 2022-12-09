import { Formik, Form, Field } from 'formik';
import PropTypes from 'prop-types';

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
    <header>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <button type="submit">
            <span>Search</span>
          </button>
          <Field
            type="text"
            name="query"
            autoFocus
            placeholder="Search images and photos"
          />
        </Form>
      </Formik>
    </header>
  );
};

SearchForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};
