import logo from './logo.svg';
import './App.scss';
import Form from './components/test/Form';
import NoValidationForm from './components/test/NotValidatedForm';
const munis= ['apple',"android","chrome","nokia","windows","next"]
function App() {
  return (
    <div className="App">
      {/* with validation */}
      <Form munis={munis} />
      {/* without validation */}
      <NoValidationForm munis={munis} />
    </div>
  );
}

export default App;
