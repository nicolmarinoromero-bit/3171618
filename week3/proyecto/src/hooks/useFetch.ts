import { useState, useEffect } from 'react';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useFetch<T>(fetchFn: (signal: AbortSignal) => Promise<T>, deps: React.DependencyList = []) {
  const [state, setState] = useState<FetchState<T>>({ data: null, loading: true, error: null });
  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        const result = await fetchFn(controller.signal);
        setState({ data: result, loading: false, error: null });
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setState({ data: null, loading: false, error: 'Error al cargar datos' });
      }
    };
    load();
    return () => controller.abort();
  }, deps);
  return state;
}