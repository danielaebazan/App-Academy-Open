import harvardArt from './data/harvardArt'
//console.log(harvardArt);
import {Routes, Route} from 'react-router-dom';
import GalleryNavigation from './components/GalleryNavigation';
import GalleryView from './components/GalleryView'


function App() {
  return (
    <div className='page-wrapper'>
      <GalleryNavigation galleries={harvardArt.records}/>
      <Routes>
        <Route path="/" element='{<Home />}' />
        <Route path='/galleries/:galleryId/*' element = {<GalleryView galleries={harvardArt.records}/> } />
        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
  
    </div>
  );
}

export default App;
