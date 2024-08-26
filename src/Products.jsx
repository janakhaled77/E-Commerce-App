import { useContext, useState } from 'react';
import useProducts from './useProducts';
import Loading from './Loading';
import { FaStar, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';
import { WishlistContext } from './WishlistContext'; 
import toast from 'react-hot-toast';

export default function Products() {
    const { setCartItems, addToUserCart } = useContext(CartContext);
    const { wishlistItems, addTowishlist, removeItemwishlist } = useContext(WishlistContext);
    const { data: products, isLoading: productsLoading, error: productsError, isError: productsIsError } = useProducts();
    const [searchTerm, setSearchTerm] = useState('');

    const getInitialWishlistState = (productId) => {
        return wishlistItems.some(item => item._id === productId);
    };

    const [wishlistStates, setWishlistStates] = useState(
        products?.reduce((acc, product) => {
            acc[product._id] = getInitialWishlistState(product._id);
            return acc;
        }, {}) || {}
    );

    const toggleWishlist = async (productId) => {
        const isInWishlist = wishlistStates[productId];
        try {
            if (isInWishlist) {
                await removeItemwishlist(productId);
                setWishlistStates(prevState => ({
                    ...prevState,
                    [productId]: false,
                }));
                toast.success('Removed from Wishlist');
            } else {
                await addTowishlist(productId);
                setWishlistStates(prevState => ({
                    ...prevState,
                    [productId]: true,
                }));
                toast.success('Added to Wishlist');
            }
        } catch (error) {
            console.error('Failed to update wishlist:', error);
            toast.error('Failed to update wishlist');
        }
    };

    const addItem = async (id) => {
        try {
            const res = await addToUserCart(id);
            if (res.data.status === 'success') {
                setCartItems(res.data.numOfCartItems);
                toast.success('Item Added to Cart', {
                    duration: 4000,
                    position: 'top-center',
                });
            } else {
                toast.error('Failed to add item');
            }
        } catch (error) {
            console.error('Failed to add item to cart:', error);
            toast.error('Failed to add item');
        }
    };

    const filteredProducts = products?.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    if (productsLoading) {
        return <Loading />;
    }

    if (productsIsError) {
        return (
            <div className="container mx-auto mt-10 text-center">
                <h3 className="text-lg text-red-500">{productsError?.message || 'An error occurred'}</h3>
            </div>
        );
    }

    return (
        <div>
            <div className="container w-full mx-auto mb-5 mt-28">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
            </div>
            <div className="container mx-auto grid sm:grid-cols-2 md:grid-cols-4 mt-10 gap-4">
                {filteredProducts.map((p) => (
                    <div key={p._id} className="relative group cursor-pointer hover:shadow-xl hover:shadow-green-400 p-4 transition-shadow duration-300 bg-white rounded-lg shadow-md">
                        <Link to={`/productDetails/${p._id}`}>
                            <img src={p.imageCover} className="object-cover w-full h-48 rounded-lg mb-2" alt={p.title} />
                            <p className="text-sm text-green-600">{p.category.name}</p>
                            <h3 className="text-lg font-semibold truncate">{p.title.split(" ").slice(0, 2).join(" ")}</h3>
                            <div className="flex justify-between items-center mt-2">
                                <p className="text-lg font-semibold">{p.price} EGP</p>
                                <p className="flex items-center">{p.ratingsAverage} <FaStar className="text-yellow-400 ml-1" /></p>
                            </div>
                        </Link>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleWishlist(p._id);
                            }}
                            className={`absolute top-2 right-2 text-2xl transition-colors duration-300 ${wishlistStates[p._id] ? 'text-red-500' : 'text-gray-400'}`}
                        >
                            <FaHeart />
                        </button>
                        <div className="flex">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    addItem(p._id);
                                }}
                                className='w-full bg-green-600 text-white py-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                            >
                                Add To Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}