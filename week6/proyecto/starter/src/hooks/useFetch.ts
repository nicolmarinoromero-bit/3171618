import { useState, useEffect, useCallback } from 'react';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useFetch<T>(
  fetchFn: (signal: AbortSignal) => Promise<T>,
  deps: React.DependencyList = []
): FetchState<T> & { refetch: () => void } {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const execute = useCallback(async () => {
    const controller = new AbortController();
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const result = await fetchFn(controller.signal);
      setState({ data: result, loading: false, error: null });
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      setState({ data: null, loading: false, error: 'Error al cargar datos' });
    }
  }, [fetchFn]);

  useEffect(() => {
    execute();
  }, [execute, ...deps]);

  return { ...state, refetch: execute };
}