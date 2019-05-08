import React from 'react';
import Photos from './components/Photos';

// TEXTS
import { GENERAL, GALLERY } from '../../../texts';

// Components
import Footer from '../../common/footer/Footer';

const GalleryPage = () => {
  document.title = `${GENERAL.PAGE_TITLE} - ${GENERAL.GALLERY}`;

  return (
    <div className="container-fluid" id="gallery">
      <div className="container main-container pt80">
        <h2>{GALLERY.TITLE}</h2>
        <Photos />
      </div>
      <Footer />
    </div>
  );
};

export default GalleryPage;
