import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AllProduct from '../Components/home/AllProduct'; // Ensure correct path
import { removeFromWishlist } from '../redux/slice/wishlistsSlice'; // Import removeFromWishlist action

export default function WishlistPage() {
  const wishlistItems = useSelector(store => store.wishlist.wishlistItems || []); // Ensure wishlistItems is defined
  const dispatch = useDispatch();

  const handleRemoveFromWishlist = (id) => {
    dispatch(removeFromWishlist(id));
  };

  return (
    <div className="container mx-auto pt-8">
      <h2 className="text-2xl font-bold mb-4">Wishlist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {wishlistItems.length > 0 ? (
          wishlistItems.map(item => (
            <AllProduct 
              key={item._id} 
              {...item} 
              showWishlistIcon={false} 
              showRemoveFromWishlist={true}
              handleRemoveFromWishlist={() => handleRemoveFromWishlist(item._id)} // Pass remove function
            />
          ))
        ) : (
          <p>No items in wishlist</p>
        )}
      </div>
    </div>
  );
}
