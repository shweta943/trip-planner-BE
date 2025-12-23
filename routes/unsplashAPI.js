const { unsplash } = require('../utils/unsplashSDK');
        
// Function to get images from Unsplash based on a query
const getUnsplashImages = async (query, perPage) => {
    try {
        const images = await unsplash.search.getPhotos({
            query,
            page: 1,
            perPage,
            orientation: 'landscape'
        })
  
    
        if (images.errors) {
            console.error("Unsplash API Error:", images.errors);
            return [];
          }
          return images?.response?.results;
    } catch (error) {
        console.error('Error fetching Images', error);
    }
}
// return images
export default getUnsplashImages;
