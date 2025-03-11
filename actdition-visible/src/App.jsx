import Navbar from './components/functionalities/navbar/Navbar.jsx';
import Showcase from './components/looks/showcase/Showcase.jsx';

function App() {

  return (
    <>
      <Navbar/>
        <div className='title'>
            ACTDITION<span>2.0</span>
        </div>
      <Showcase />
      <br />
      <br />
      <p className='regards'>
        this project has been built with passion and it is a remaster from <a href='https://mirko-125.github.io'>my</a> university project 
      </p>
    </>
  )
}

export default App
