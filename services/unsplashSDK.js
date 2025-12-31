// Defines and exports the Unsplash API client for use in other parts of the application
import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY
});

export { unsplash };