/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewAuthorDetails } from '../../api/mergedData';

export default function ViewAuthor() {
  const [authorDetails, setAuthorDetails] = useState({});
  const router = useRouter();

  // grab firebaseKey from url
  const { firebaseKey } = router.query;

  // call to API layer to get the data
  useEffect(() => {
    viewAuthorDetails(firebaseKey).then(setAuthorDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={authorDetails.image} alt={authorDetails.title} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          {authorDetails.title} by {authorDetails.authorObject?.first_name} {authorDetails.authorObject?.last_name}
          {authorDetails.authorObject?.favorite ? ' 🤍' : ''}
        </h5>
        Author Email: <a href={`mailto:${authorDetails.authorObject?.email}`}>{authorDetails.authorObject?.email}</a>
        <p>{authorDetails.description || ''}</p>
        <hr />
        <p>
          {authorDetails.sale
            ? `🏷️ Sale $${authorDetails.price}`
            : `$${authorDetails.price}`}
        </p>
      </div>
    </div>
  );
}
