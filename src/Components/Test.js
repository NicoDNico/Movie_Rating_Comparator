import React, { useState } from 'react';

export default function Test() {
  const apikey = 'api_key=5625c97a465184ed5c6509459a4505fb'
  return (
    <button
      onClick={async() => {
        const response = await fetch(`https://api.themoviedb.org/3/movie/47169?${apikey}`).then(response => response.json());
        console.log(response);
      }}
    >
      Click or hover me!
    </button>
  );
}
