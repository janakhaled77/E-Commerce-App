import { useParams } from "react-router-dom";
import { FaStar, FaHeart } from "react-icons/fa";
import Loading from "./Loading";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import { WishlistContext } from "./WishlistContext";
import toast from "react-hot-toast";
import Slider from "react-slick";

// Slider settings
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  appendDots: dots => (
    <div style={{ padding: "0" }}>
      <ul style={{ margin: "0px" }}>{dots}</ul>
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

export default function ProductDetails() {
  const { id } = useParams();
  const { setCartItems, addToUserCart } = useContext(CartContext);
  const { wishlistItems, addTowishlist, removeItemwishlist } = useContext(WishlistContext);

  const [isInWishlist, setIsInWishlist] = useState(
    wishlistItems.some(item => item._id === id)
  );

  async function addItem(id) {
    try {
      const res = await addToUserCart(id);
      if (res.data.status === "success") {
        setCartItems(res.data.numOfCartItems);
        toast.success('Item Added to Cart', {
          duration: 4000,
          position: 'top-center',
        });
      } else {
        toast.error('Failed to add item to cart');
      }
    } catch (error) {
      console.error('Failed to add item to cart:', error);
      toast.error('Failed to add item');
    }
  }

  async function toggleWishlist() {
    try {
      if (isInWishlist) {
        await removeItemwishlist(id);
        setIsInWishlist(false);
        toast.success('Removed from Wishlist');
      } else {
        await addTowishlist(id);
        setIsInWishlist(true);
        toast.success('Added to Wishlist');
      }
    } catch (error) {
      console.error('Failed to update wishlist:', error);
      toast.error('Failed to update wishlist');
    }
  }

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['productDetails', id],
    queryFn: () => axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`),
    select: (response) => response.data.data,
    enabled: !!id 
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div>
        <h3>{error.message}</h3>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid gap-6 md:grid-cols-12">
        <div className="md:col-span-4 py-5">
          {/* Slider for Images */}
          <Slider {...sliderSettings}>
            {data?.images?.map((image, index) => (
              <div key={index}>
                <img src={image} className="w-full h-auto object-cover rounded-lg" alt={data?.title} />
              </div>
            ))}
          </Slider>
        </div>
        <div className="md:col-span-8 self-center py-5 relative">
          <h2 className="text-2xl font-bold mb-2">{data?.title}</h2>
          <p className="my-3 text-lg font-light text-gray-700">{data?.description}</p>
          <h3 className="text-xl mb-2 text-gray-800">{data?.category.name}</h3>
          <div className="flex mb-3 justify-between items-center">
            <p className="text-xl font-semibold">{data?.price} EGY</p>
            <p className="text-xl flex items-center">
              {data?.ratingsAverage} <FaStar className="text-yellow-400 ml-1" />
            </p>
          </div>
          <button
            onClick={() => addItem(data._id)}
            className="w-full bg-green-600 py-4 text-white font-semibold rounded-lg hover:bg-green-500 transition-all duration-300"
          >
            <span className="flex items-center justify-center">Add To Cart</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation(); 
              toggleWishlist();
            }}
            className={`absolute top-0 right-0 mt-2 mr-2 text-4xl ${isInWishlist ? 'text-red-500' : 'text-gray-400'}`}
          >
            <FaHeart />
          </button>
        </div>
      </div>
    </div>
  );
}
