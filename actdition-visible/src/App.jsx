import Navbar from "./components/functionalities/navbar/Navbar.jsx";
import Showcase from "./components/looks/showcase/Showcase.jsx";
import News from "./components/looks/news/News.jsx";

function App() {
  return (
    <>
      <Navbar />
      <div className="title">
        ACTDITION<span>2.0</span>
      </div>
      <Showcase />
      <News />
    </>
  );
}

export default App;
