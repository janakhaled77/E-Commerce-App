import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import img_1 from './assets/babybed.jpg';
import img_2 from './assets/bag.jpg';
import img_3 from './assets/bagss.jpg';
import img_4 from './assets/music.jpg';
import img_5 from './assets/access.jpg';

function MainSlider() {
    
        const settings = {
          dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          appendDots: dots => (
            <div
              style={{
                padding: "0"
              }}
            >
              <ul style={{ margin: "0px" }}> {dots} </ul>
            </div>
          ),
          customPaging: i => (
            <div
              style={{
                width: "20px",
                height: "10px",
                borderRadius:"5px",
                backgroundColor: "gray",
                
              }}
            >
              
            </div>
          )
        };

    useEffect(() => {
        console.log('Mounting MainSlider');
    }, []);

    return (
        <div className='grid grid-cols-12 mb-4'>
            <div className='col-span-12 md:col-span-8'>
                <Slider {...settings}>
                    <div>
                        <img className='h-[400px] w-full object-contain' src={img_1} alt="Slider Image 1" />
                    </div>
                    <div>
                        <img className='h-[400px] w-full object-contain' src={img_2} alt="Slider Image 2" />
                    </div>
                    <div>
                        <img className='h-[400px] w-full object-contain' src={img_5} alt="Slider Image 5" />
                    </div>
                </Slider>
            </div>
            <div className='col-span-12 md:col-span-4'>
                <img className='md:h-[200px] w-full object-cover' src={img_3} alt="Image 3" />
                <img className='md:h-[200px] w-full object-cover' src={img_4} alt="Image 4" />
            </div>
        </div>
    );
}

export default MainSlider;
