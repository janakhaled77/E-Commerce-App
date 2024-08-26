import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import Loading from './Loading';

function CategorySlider() {
    const [categories, setCategories] = useState([]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true, 
        autoplaySpeed: 1500, 
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
                    borderRadius: "5px",
                    backgroundColor: "gray",
                }}
            />
        ),
    };

    async function getCategories() {
        try {
            const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
            setCategories(data?.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }

    useEffect(() => {
        console.log('Mounting CategorySlider');
        getCategories();
    }, []);

    if (categories.length === 0) {
        return <Loading />;
    }

    return (
        <Slider {...settings}>
            {
                categories.map(c => (
                    <div key={c._id} className='p-2'>
                        <img className='h-[200px] w-full object-cover' src={c.image} alt={c.name} />
                        <h3 className='text-sm text-green-600 mt-3'>{c.name}</h3>
                    </div>
                ))
            }
        </Slider>
    );
}

export default CategorySlider;
