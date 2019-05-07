import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import styled from 'styled-components';
import ImageGallery from 'react-image-gallery';
import { buildUrl } from 'react-instafeed'
 
import useAbortableFetch from 'use-abortable-fetch';

//Components 
import Navigation from '../../common/navigation/Navigation';


const options = {
  accessToken: '145363881.1677ed0.0a796f5a2e7f4eaebf88f6d566a95dca',
  clientId: 'bee0e5010c9d4db483b39f7b49664d04',
  get: 'user', // popular, user
  locationId: null,
  resolution: 'standard_resolution', // thumbnail, low_resolution, standard_resolution
  sortBy: 'none', // none, least-commented, least-liked, least-recent, most-commented, most-liked, most-recent, random
  tagName: null,
  userId: 145363881,
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #607d8b;
`;

const GalleryPage = () => {
  document.title = "Casa Rural La Piedad - Galería de fotos";
  console.log(useAbortableFetch(buildUrl(options)))
  var { data, loading, error, abort } = useAbortableFetch(buildUrl(options));
  //const { json, loading, error, abort } = useAbortableFetch("https://api.instagram.com/v1/users/145363881/media/recent?access_token=145363881.1677ed0.0a796f5a2e7f4eaebf88f6d566a95dca");
  // console.log("json")
  // console.log(json)
  // console.log("loading")
  // console.log(loading)
  // console.log("error")
  // console.log(error)
  // console.log("abort")
  // console.log(abort)
  if (loading || !data) return 'Loading...'
  // if (error) return `Error: ${error}`
  // if (!json) return null
  console.log("LO TENEMOS")

  console.log(data.data)
  const dataImages = data.data
  const { meta, pagination } = data

  console.log("data")
  console.log(dataImages)
  

  var arrImages = [
    // {
    //   original: 'http://lorempixel.com/1000/600/nature/1/',
    //   thumbnail: 'http://lorempixel.com/250/150/nature/1/',
    // },
    // {
    //   original: 'http://lorempixel.com/1000/600/nature/2/',
    //   thumbnail: 'http://lorempixel.com/250/150/nature/2/',
    // },
    // {
    //   original: 'http://lorempixel.com/1000/600/nature/3/',
    //   thumbnail: 'http://lorempixel.com/250/150/nature/3/',
    // },
  ];

  if(dataImages) {
    dataImages.map(({ caption, id, images, tags }, index) => {
      
      
      console.log("images")
      console.log(images)
      arrImages.push({"original": images[options.resolution].url, "thumbnail": images["thumbnail"].url});
    })
  }

    console.log(arrImages)
  
 
  return (
    <Container>
      <Navigation />
      <h2>Gallería</h2>
      <div id="gallery__container">
        <ImageGallery items={arrImages} />
      </div>
    </Container>
  );

}

GalleryPage.propTypes = {
  
};

export default GalleryPage;
