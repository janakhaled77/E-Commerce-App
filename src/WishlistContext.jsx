
// // import { useQuery } from "@tanstack/react-query";
// // import { data } from "autoprefixer";
// // import axios from "axios";
// // import { createContext, useEffect, useState } from "react";

// // export const WishlistContext =createContext() //wishlist contexttt!!
// // export default function WishlistContextProvider({children}){
// //     const token = localStorage.getItem('token');
    
// // console.log("Token from local storage:", token);
// //     const [wishlistItems, setWishlistItems] = useState([]);
// //     const [count, setCount] = useState(null);
// //     const headers ={token};
// // function getUserwishlist(){
// //         return axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',{headers
// //         })
// //         .then(data=>data)
// //         .catch(err=>err)
// //     }
// // function addTowishlist(productId){
// //         return axios.post(
// //             'https://ecommerce.routemisr.com/api/v1/wishlist',
// //             { productId },
// //             { headers },
// //         )
// //         .then(data=>data)
// //         .catch(err=>err)
        
// //     }
// // function removeItemwishlist(id){
// //         return axios.delete('https://ecommerce.routemisr.com/api/v1/wishlist/'+id,{headers
// //         })
// //         .then(data=>data)
// //         .catch(err=>err)
// //     }


// // async function getwishlist(){
// //     const response = await getUserwishlist();
    
// //     if(response.data.status=="success"){
// //         setWishlistItems(response.data.data);
// //         setCount(response.data.count)

// //     }
// // }
// // useEffect(() => {
// //     getwishlist()
// // }, [])


// //     return <WishlistContext.Provider value={{wishlistItems, setWishlistItems, getUserwishlist ,addTowishlist,removeItemwishlist ,getwishlist ,count}}>
// //         {children}
// //     </WishlistContext.Provider>
// // }
// import { createContext, useEffect, useState } from "react";
// import axios from "axios";

// export const WishlistContext = createContext();

// export default function WishlistContextProvider({ children }) {
//     const token = localStorage.getItem('token');
//     const [wishlistItems, setWishlistItems] = useState([]);
//     const [count, setCount] = useState(null);
//     const headers = { token };

//     function getUserwishlist() {
//         return axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', { headers })
//             .then(data => data)
//             .catch(err => err);
//     }

//     function addTowishlist(productId) {
//         return axios.post(
//             'https://ecommerce.routemisr.com/api/v1/wishlist',
//             { productId },
//             { headers }
//         )
//         .then(data => data)
//         .catch(err => err);
//     }

//     async function removeItemwishlist(id) {
//         try {
//             const response = await axios.delete('https://ecommerce.routemisr.com/api/v1/wishlist/' + id, { headers });
            
//             if (response.data.status === "success") {
//                 // Update the wishlistItems state to remove the item locally
//                 setWishlistItems(prevItems => prevItems.filter(item => item.id !== id));
//                 setCount(prevCount => prevCount - 1);
//             }
//         } catch (err) {
//             console.error("Error removing item from wishlist:", err);
//         }
//     }

//     async function getwishlist() {
//         const response = await getUserwishlist();
        
//         if (response.data.status === "success") {
//             setWishlistItems(response.data.data);
//             setCount(response.data.count);
//         }
//     }

//     useEffect(() => {
//         getwishlist();
//     }, []);

//     return (
//         <WishlistContext.Provider value={{ wishlistItems, setWishlistItems, getUserwishlist, addTowishlist, removeItemwishlist, getwishlist, count }}>
//             {children}
//         </WishlistContext.Provider>
//     );
// }
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const WishlistContext = createContext();

export default function WishlistContextProvider({ children }) {
    const token = localStorage.getItem('token');
    const [wishlistItems, setWishlistItems] = useState([]);
    const [count, setCount] = useState(null);
    const headers = { token };

    async function getUserwishlist() {
        try {
            const response = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', { headers });
            return response;
        } catch (err) {
            console.error("Error fetching wishlist:", err);
            return err;
        }
    }

    async function addTowishlist(productId) {
        try {
            const response = await axios.post(
                'https://ecommerce.routemisr.com/api/v1/wishlist',
                { productId },
                { headers }
            );
            if (response.data.status === "success") {
                // Update the wishlistItems state to include the newly added item
                setWishlistItems(prevItems => [...prevItems, response.data.data]);
                setCount(prevCount => prevCount + 1);
            }
            return response;
        } catch (err) {
            console.error("Error adding item to wishlist:", err);
            return err;
        }
    }

    async function removeItemwishlist(id) {
        try {
            const response = await axios.delete('https://ecommerce.routemisr.com/api/v1/wishlist/' + id, { headers });
            if (response.data.status === "success") {
                // Update the wishlistItems state to remove the item locally
                setWishlistItems(prevItems => prevItems.filter(item => item._id !== id));
                setCount(prevCount => prevCount - 1);
            }
            return response;
        } catch (err) {
            console.error("Error removing item from wishlist:", err);
            return err;
        }
    }

    async function getwishlist() {
        try {
            const response = await getUserwishlist();
            if (response.data.status === "success") {
                setWishlistItems(response.data.data);
                setCount(response.data.count);
            }
        } catch (err) {
            console.error("Error fetching wishlist:", err);
        }
    }

    useEffect(() => {
        getwishlist();
    }, []);

    return (
        <WishlistContext.Provider value={{ wishlistItems, setWishlistItems, getUserwishlist, addTowishlist, removeItemwishlist, getwishlist, count }}>
            {children}
        </WishlistContext.Provider>
    );
}
