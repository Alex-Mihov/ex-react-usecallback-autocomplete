import React, { useState, useEffect } from 'react';


function App() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query === '') {
        setSuggestions([]);
        return;
      }

      async function fetchData() {
        try {
          const res = await fetch(`http://localhost:5000/products?search=${query}`);
          const data = await res.json();
          setSuggestions(data);
        } catch (err) {
          console.error(err)
        }
      }

      fetchData();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
        placeholder="Cerca un prodotto..."
      />
      {suggestions.length > 0 && (
        <ul className="suggestion-list">
          {suggestions.map((s, i) => (
            <li key={i} className="suggestion-item">
              {s.name || s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App
