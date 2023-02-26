import Navigator from './Components/Navigator'
import Main from './Components/Main'
import {useEffect} from 'react'
function App() {
  useEffect(() => {
    document.title = "Nicora Nicolas";  
  }, []);
  return (
    
    <>
    <Navigator/>
    <Main/>
    </>
  );
}

export default App;
