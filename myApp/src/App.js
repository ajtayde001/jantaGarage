
import './App.css';
//import { Login } from './pages/Login';
import { Navbar } from './components/Navbar';
import Footer from './pages/Footer';
import MainRoutes from './pages/MainRoutes';

function App() {
  return (
    <div className="App">
      <Navbar/>     
      <div style={{marginTop:"61px"}}>   
      <MainRoutes/>
         </div>
      <Footer/>
    </div>
  );
}

export default App;
