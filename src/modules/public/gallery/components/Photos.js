import React from 'react';
import ImageGallery from 'react-image-gallery';
import { buildUrl } from 'react-instafeed';
import useAbortableFetch from 'use-abortable-fetch';
import { GridLoader } from 'react-spinners';

const override = `
  display: block;
  margin: 50px auto;
  border-color: red;
`;

const options = {
  accessToken: '145363881.1677ed0.0a796f5a2e7f4eaebf88f6d566a95dca',
  clientId: 'bee0e5010c9d4db483b39f7b49664d04',
  get: 'user', // popular, user
  locationId: null,
  resolution: 'standard_resolution', // thumbnail, low_resolution, standard_resolution
  sortBy: 'none', // none, least-commented, least-liked, least-recent, most-commented, most-liked, most-recent, random
  tagName: null,
  userId: 145363881,
};

const Photos = () => {
  const { data, loading, error, abort } = useAbortableFetch(buildUrl(options));

  if (loading || !data) {
    return <GridLoader css={override} color="#ffffff" />;
  }
  // if (error) return `Error: ${error}`
  // if (!json) return null
  const dataImages = data.data;
  const { meta, pagination } = data;

  const arrImages = [];

  if (dataImages) {
    dataImages.map(({ caption, id, images, tags }, index) => {
      arrImages.push({ original: images[options.resolution].url, thumbnail: images.thumbnail.url });
    });
  }

  return (
    <div id="gallery__container">
      <ImageGallery items={arrImages} />
    </div>
  );
};

export default Photos;
