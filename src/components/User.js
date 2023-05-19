import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function User() {
  const [user, setUser] = useState(
    [
      {
        pfp: '',
        repository: '',
        followers: '',
        following: '',
        github: ''
      }
    ]
  );
  
  const [repo, setRepo] = useState([]);
  
  const { username } = useParams();
  
  const navigate = useNavigate();
  
  const token = '';
  const options = {headers: { Authorization: `Bearer ${token}`}};
  const urlUser =  `https://api.github.com/users/${username}`;
  const urlUserRepo = `https://api.github.com/users/${username}/repos`;
  
  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get(urlUser, options);
        setUser({
          pfp: data.avatar_url,
          repositories: data.public_repos,
          followers: data.followers,
          following: data.following,
          github: data.html_url
        });
      } catch (error) {
        console.log(error);
      };
    };
    
    const getUserRepo = async () => {
      try {
        const { data } = await axios.get(urlUserRepo, options);
        const repositories = data.map(data => ({
          name: data.name,
          update: new Date(data.updated_at).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          })
        }));
        setRepo(repositories);
      } catch(error) {
        console.log(error);
      };
    };
    
    getUser();
    getUserRepo();
  }, [])
  
  return (
    <div className='container'>
      <div className='user'>
        <div className='img'>
          <img src={user.pfp} />
        </div>
        <div className='user-name'>
          <p>{username}</p>
        </div>
        <div className='flex'>
          <div className='info repositories'>
            <h3>Repositories</h3>
            <p>{user.repositories}</p>
          </div>
          <div className='info followers'>
            <h3>Followers</h3>
            <p>{user.followers}</p>
          </div>
          <div className='info following'>
            <h3>Following</h3>
            <p>{user.following}</p>
          </div>
        </div>
        <div className='button'>
          {/* doesn't go to the previous page after clicking on it */}
          {/* <button type='button' onClick={() => navigate(location.href = user.github)} >GitHub</button> */}
          <button type='button' onClick={() => location.href = user.github} >GitHub</button>
        </div>
      </div>
      <div className='my-repositories'>
        <h2>My Repositories</h2>
        {repo.map((repository, i) => (
          <div key={i} className='repository'>
              <p>
                <span className='flex'>
                  <span className='repository-name'>{repository.name}</span>
                  <span className='repository-update'>Updated at {repository.update}</span>
                </span>
              </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default User;