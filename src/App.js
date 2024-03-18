import logo from './logo.svg';
import './App.css';
import Articles from './Component/Articles';
import AddArticle from './Component/AddArticle';

function App() {
  return <>
    <div className='container'>
      <div className='row'>
        <div className='col-md-8'>
             <Articles/>
        </div>
         
         <div className='col-md-4'>
          <AddArticle/>
         </div>
      </div>

    </div>
  </>
}

export default App;
