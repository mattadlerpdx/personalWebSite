import { useState, useEffect } from 'react';

export const useApi = (apiFunction, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    initialData = null,
    dependencies = [],
    onSuccess,
    onError,
    skip = false,
  } = options;

  useEffect(() => {
    if (skip) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiFunction();
        setData(result);
        onSuccess?.(result);
      } catch (err) {
        setError(err);
        onError?.(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [...dependencies, skip]);

  return {
    data,
    loading,
    error,
    refetch: () => {
      setData(initialData);
      setLoading(true);
      setError(null);
    },
  };
}; 