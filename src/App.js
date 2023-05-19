import { Routes, Route } from 'react-router-dom';
import Search from './components/Search';
import User from './components/User'

function App() {
  return (
    <>
      <header></header>
      <main>
        <Routes>
          <Route exact path='/' element={<Search />} />
          <Route exact path='/user/:username' element={<User />} />
        </Routes>
      </main>
      <footer></footer>
    </>
  );
}

export default App;