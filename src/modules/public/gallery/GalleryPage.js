import React from 'react';
import Photos from './components/Photos';

// TEXTS
import GENERALTEXT from '../../../texts/generaltext';
import GALLERY from '../../../texts/gallery';

// Components
import Footer from '../../common/footer/Footer';

const GalleryPage = () => {
  document.title = `${GENERALTEXT.PAGE_TITLE} - ${GENERALTEXT.GALLERY}`;

  return (
    <div className="container-fluid" id="gallery">
      <div className="container main-container pt90">
        <h2>{GALLERY.TITLE}</h2>
        <Photos />
      </div>
      <Footer />
    </div>
  );
};

export default GalleryPage;
