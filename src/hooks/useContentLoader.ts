import { useState, useEffect } from 'react';

// Custom hook for handling loading state
const useContentLoader = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulating an asynchronous operation (you can replace this with your actual data fetching logic)
  const fetchData = async () => {
    try {
      // Simulating a delay (replace this with your actual data fetching logic)
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      // Set loading state to false once the data is fetched (or an error occurs)
      setIsLoading(false);
    }
  };

  // useEffect to trigger data fetching when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Return loading state and a function to manually trigger data fetching
  return {
    isLoading,
    fetchData,
  };
};

export default useContentLoader;
