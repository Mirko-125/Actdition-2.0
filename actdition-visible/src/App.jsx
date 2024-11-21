import Showcase from './components/looks/showcase/Showcase.jsx';

import { useNavigate } from 'react-router-dom';

function App() {

  const navigate = useNavigate();

  return (
    <>
      <div className='title'>
          ACTDITION<span>2.0</span>
      </div>
      <Showcase />
    </>
  )
}

export default App
