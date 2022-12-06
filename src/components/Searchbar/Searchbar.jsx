import { Formik, Form, Field } from 'formik';

export const SearchForm = ({ onFormSubmit }) => {
  const initialValues = {
    image: '',
  };

  const handleSubmit = (values, { resetForm }) => {
    if (values.image.trim() === '') {
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
          <Field type="text" name="image" />
        </Form>
      </Formik>
    </header>
  );
};

// <input
//   class="input"
//   type="text"
//   autocomplete="off"
//   autofocus
//   placeholder="Search images and photos"
// />
