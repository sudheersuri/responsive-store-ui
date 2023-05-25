
export const  getProducts =async  ()=> {
    try {
      const res = await fetch('https://fakestoreapi.com/products/');
      if (!res.ok) {
        throw new Error('Failed to fetch products');
      }
      const products = await res.json();
      return products;
    } catch (error) {
      console.error('An error occurred while fetching products:', error);
      throw error; // Rethrow the error to propagate it to the caller
    }
  };
  