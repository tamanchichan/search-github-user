import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Search() {
  const [user, setUser] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  
  const handleUser = async (event) => {
    event.preventDefault();
    
    const input = event.target.user.value.trim();
    
    if (input.length > 0) {
      try {
        const token = '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';
        const options = {headers: { Authorization: `Bearer ${token}`}};
        const urlUser =  `https://api.github.com/users/${input}`;
        
        const response = await axios.get(urlUser, options);
        if (response.status === 200) {
          setUser(input);
        }
      } catch (error) {
        setError('User not found');
        setTimeout(() => {
          setError('');
        }, 3000);
      };
    };
    
    event.target.user.value = '';
    event.target.user.focus();
  };
  
  useEffect(() => {
    if (user) {
      navigate(`/user/${user}`);
    }
  }, [user])
  
  return (
    <div className='grid'>
      <div>
        <h1>GitHub Finder</h1>
      </div>
      <div>
        <form onSubmit={handleUser}>
          <input type='text' placeholder='User' name='user' />
          <input type='submit' value='Search' />
        </form>
      </div>
      <div className='error'>
        {/* don't need this since it has 'setTimeout' */}
        {/* {error && <p>{error}</p>} */}
        <p>{error}</p>
      </div>
    </div>
  );
};

export default Search;