import Navigator from './Components/Navigator'
import Main from './Components/Main'
import {useEffect} from 'react'
function App() {
  useEffect(() => {
    document.title = "NicoDNico";  
  }, []);
  return (
    
    <>
    <Navigator/>
    <Main/>
    </>
  );
}

export default App;
