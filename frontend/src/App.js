import './App.css';
// import FileUploadField from './components/easyImplementation/FileUploadField'
import FileUploader from './components/FileUploader';
import Navbar from './components/util/Navbar';
import RefreshButton from './components/util/RefreshButton';

function App() {
  return (
    <>
      <Navbar/>
      <div className="App">
        {/* <FileUploadField></FileUploadField> */}
        <FileUploader></FileUploader>
        <RefreshButton/>
      </div>
    </>
  );
}

export default App;
