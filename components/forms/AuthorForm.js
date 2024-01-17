import React, { useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createAuthor, updateAuthor } from '../../api/authorData';

const initialState = {
  first_name: '',
  last_name: '',
  email: '',
  favorite: false,
};

function AuthorForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateAuthor(formInput).then(() => router.push(`/author/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, author_id: formInput.firebaseKey, uid: user.uid };
      createAuthor(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateAuthor(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Author</h2>

      {/* TITLE INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Author First Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter author's first name"
          name="first_name"
          value={formInput.first_name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Author Last Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter author's last name"
          name="last_name"
          value={formInput.last_name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* PRICE INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Author Email" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Author Email"
          name="email"
          value={formInput.email}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* A WAY TO HANDLE UPDATES FOR TOGGLES, RADIOS, ETC  */}
      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="favorite"
        name="favorite"
        label="Is a favorite?"
        checked={formInput.favorite}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            favorite: e.target.checked,
          }));
        }}
      />

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Author</Button>
    </Form>
  );
}

AuthorForm.propTypes = {
  obj: PropTypes.shape({
    email: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    favorite: PropTypes.bool,
    author_id: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

AuthorForm.defaultProps = {
  obj: initialState,
};

export default AuthorForm;
