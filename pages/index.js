/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getBooks } from '../api/bookData';
import { useAuth } from '../utils/context/authContext';
import BookCard from '../components/BookCard';
import { getAuthors } from '../api/authorData';
import AuthorCard from '../components/AuthorCard';

function Home() {
  // TODO: Set a state for books
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [view, setViewState] = useState('books');

  const setView = (newView) => {
    setViewState(newView);
  };

  // TODO: Get user ID using useAuth Hook
  const { user } = useAuth();

  // TODO: create a function that makes the API call to get all the books
  const getAllTheBooks = () => {
    getBooks(user.uid).then((booksData) => {
      setBooks(booksData);
      setView('books');
    });
  };

  const getAllTheAuthors = () => {
    getAuthors(user.uid).then((authorsData) => {
      setAuthors(authorsData);
      setView('authors');
      console.warn('should show author cards');
      console.warn(authorsData);
    });
  };

  // TODO: make the call to the API to get all the books on component render
  useEffect(() => {
    if (view === 'books') {
      getAllTheBooks();
    } else if (view === 'authors') {
      getAllTheAuthors();
    }
  }, [view]);

  return (
    <div className="text-center my-4">
      <Link href="/book/new" passHref>
        <Button>Add A Book</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {view === 'books'
          && books.map((book) => (
            <BookCard key={book.firebaseKey} bookObj={book} onUpdate={getAllTheBooks} />
          ))}
        {view === 'authors'
          && authors.map((author) => (
            <AuthorCard key={author.firebaseKey} authorObj={author} onUpdate={getAllTheAuthors} />
          ))}
      </div>

    </div>
  );
}

export default Home;
