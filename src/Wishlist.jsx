// import { useContext, useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { WishlistContext } from './WishlistContext'; // Import the correct context
// import { CartContext } from './CartContext'; // Import CartContext
// import toast from 'react-hot-toast';
// import Loading from './Loading';

// function WishList() {
//     const [loading, setLoading] = useState(true); 
//     const [btnLoading, setBtnLoading] = useState(false); 
//     const { wishlistItems, getUserwishlist, removeItemwishlist, addTowishlist } = useContext(WishlistContext);
//     const { addToUserCart, setCartItems } = useContext(CartContext);

//     // Add item to cart
//     async function addItem(id) {
//         try {
//             setBtnLoading(true); 
//             const res = await addToUserCart(id);
//             if (res.data.status === "success") {
//                 setCartItems(res.data.numOfCartItems);
//                 toast.success('Item Added', {
//                     duration: 4000,
//                     position: 'top-center',
//                 });
//             } else {
//                 toast.error('Failed to add item');
//             }
//         } catch (error) {
//             console.error('Failed to add item to cart:', error);
//             toast.error('Failed to add item');
//         } finally {
//             setBtnLoading(false); 
//         }
//     }

//     // Get wishlist items
//     async function getLoggedUserWishlist() {
//         try {
//             setLoading(true);
//             const res = await getUserwishlist();
//             if (res.data.status === 'success') {
//                 // Wishlist items are already set via context
//             } else {
//                 toast.error('Failed to fetch wishlist');
//             }
//         } catch (error) {
//             console.error('Failed to fetch wishlist details:', error);
//         } finally {
//             setLoading(false);
//         }
//     }

//     // Remove item from wishlist
//     async function removeItemFromWishlist(id) {
//         try {
//             setBtnLoading(true); 
//             const res = await removeItemwishlist(id);
//             if (res.data.status === 'success') {
//                 // Fetch updated wishlist
//                 await getLoggedUserWishlist();
//                 toast.success('Item removed');
//             } else {
//                 toast.error('Failed to remove item');
//             }
//         } catch (error) {
//             console.error('Failed to remove item from wishlist:', error);
//         } finally {
//             setBtnLoading(false); 
//         }
//     }

//     // Fetch wishlist items on mount
//     useEffect(() => {
//         getLoggedUserWishlist();
//     }, []);

//     if (loading) {
//         return <Loading />;
//     }

//     if (wishlistItems.length === 0) {
//         return (
//             <div className="flex items-center justify-center min-h-screen">
//                 <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
//                     <h2 className="text-xl font-semibold text-gray-800">Your wishlist is empty</h2>
//                     <p className="text-gray-600 mt-2">Add items to your wishlist to see them here.</p>
//                     <Link to="/" className="mt-4 inline-block bg-green-500 text-white py-2 px-4 rounded-lg">
//                         Go to Shop
//                     </Link>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div>
//             <div className="flex flex-col items-center justify-center  mt-28">
//                 <h2 className="text-2xl font-bold mb-6 text-green-600">Your Wishlist</h2>
//                 <div className="w-full max-w-4xl">
//                     {wishlistItems.map((product) => (
//                         <div key={product._id} className="flex items-start justify-between border rounded-lg p-4 mb-4 bg-gray-100 shadow-md">
//                             <img
//                                 src={product.imageCover}
//                                 alt={product.title}
//                                 className="w-24 h-24 object-cover mr-4 rounded"
//                             />
//                             <div className="flex-1">
//                                 <Link to={`/productDetails/${product._id}`} className="block mb-2 text-lg font-semibold text-blue-600">
//                                     {product.title}
//                                 </Link>
//                                 <p className="text-gray-600 mb-2">{product.price} EGY</p>
//                                 <div className="flex gap-2">
//                                     <button
//                                         onClick={() => removeItemFromWishlist(product._id)}
//                                         disabled={btnLoading} 
//                                         className={`px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors ${btnLoading ? 'cursor-wait' : ''}`}
//                                     >
//                                         {btnLoading ? 'Removing...' : 'Remove'} 
//                                     </button>
//                                     <button
//                                         onClick={() => addItem(product._id)}
//                                         disabled={btnLoading} 
//                                         className={`px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors ${btnLoading ? 'cursor-wait' : ''}`}
//                                     >
//                                         {btnLoading ? 'Adding...' : 'Add to Cart'} 
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default WishList;
import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { WishlistContext } from './WishlistContext'; // Import the correct context
import { CartContext } from './CartContext'; // Import CartContext
import toast from 'react-hot-toast';
import Loading from './Loading';

function WishList() {
    const [loading, setLoading] = useState(true); 
    const [removingId, setRemovingId] = useState(null); // Track item being removed
    const [addingId, setAddingId] = useState(null); // Track item being added
    const { wishlistItems, getUserwishlist, removeItemwishlist, addTowishlist } = useContext(WishlistContext);
    const { addToUserCart, setCartItems } = useContext(CartContext);

    // Add item to cart
    async function addItem(id) {
        try {
            setAddingId(id); 
            const res = await addToUserCart(id);
            if (res.data.status === "success") {
                setCartItems(res.data.numOfCartItems);
                toast.success('Item Added', {
                    duration: 4000,
                    position: 'top-center',
                });
            } else {
                toast.error('Failed to add item');
            }
        } catch (error) {
            console.error('Failed to add item to cart:', error);
            toast.error('Failed to add item');
        } finally {
            setAddingId(null); 
        }
    }

    // Get wishlist items
    async function getLoggedUserWishlist() {
        try {
            setLoading(true);
            const res = await getUserwishlist();
            if (res.data.status === 'success') {
                // Wishlist items are already set via context
            } else {
                toast.error('Failed to fetch wishlist');
            }
        } catch (error) {
            console.error('Failed to fetch wishlist details:', error);
        } finally {
            setLoading(false);
        }
    }

    // Remove item from wishlist
    async function removeItemFromWishlist(id) {
        try {
            setRemovingId(id); 
            const res = await removeItemwishlist(id);
            if (res.data.status === 'success') {
                // Fetch updated wishlist
                await getLoggedUserWishlist();
                toast.success('Item removed');
            } else {
                toast.error('Failed to remove item');
            }
        } catch (error) {
            console.error('Failed to remove item from wishlist:', error);
        } finally {
            setRemovingId(null); 
        }
    }

    // Fetch wishlist items on mount
    useEffect(() => {
        getLoggedUserWishlist();
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (wishlistItems.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
                    <h2 className="text-xl font-semibold text-gray-800">Your wishlist is empty</h2>
                    <p className="text-gray-600 mt-2">Add items to your wishlist to see them here.</p>
                    <Link to="/" className="mt-4 inline-block bg-green-500 text-white py-2 px-4 rounded-lg">
                        Go to Shop
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex flex-col items-center justify-center mt-28">
                <h2 className="text-2xl font-bold mb-6 text-green-600">Your Wishlist</h2>
                <div className="w-full max-w-4xl">
                    {wishlistItems.map((product) => (
                        <div key={product._id} className="flex items-start justify-between border rounded-lg p-4 mb-4 bg-gray-100 shadow-md">
                            <img
                                src={product.imageCover}
                                alt={product.title}
                                className="w-24 h-24 object-cover mr-4 rounded"
                            />
                            <div className="flex-1">
                                <Link to={`/productDetails/${product._id}`} className="block mb-2 text-lg font-semibold text-blue-600">
                                    {product.title}
                                </Link>
                                <p className="text-gray-600 mb-2">{product.price} EGY</p>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => removeItemFromWishlist(product._id)}
                                        disabled={removingId === product._id} 
                                        className={`px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors ${removingId === product._id ? 'cursor-wait' : ''}`}
                                    >
                                        {removingId === product._id ? 'Removing...' : 'Remove'} 
                                    </button>
                                    <button
                                        onClick={() => addItem(product._id)}
                                        disabled={addingId === product._id} 
                                        className={`px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors ${addingId === product._id ? 'cursor-wait' : ''}`}
                                    >
                                        {addingId === product._id ? 'Adding...' : 'Add to Cart'} 
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default WishList;
