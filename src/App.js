import './App.css';
import LanguageContext from './Context/LanguageContext';
import Routecontainer from './Routecontainer';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <>
      <LanguageContext>
        <Routecontainer />
      </LanguageContext>
    </>
  );
}

export default App;
