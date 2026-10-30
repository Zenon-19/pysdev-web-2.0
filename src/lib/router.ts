import { useState, useEffect, useCallback } from 'react';

export type RoutePath = '/' | '/services' | '/work' | '/process' | '/contact' | '/privacy' | '/thank-you';

export interface RouteState {
  path: RoutePath;
  queryParams: Record<string, string>;
}

function parseLocation(): RouteState {
  if (typeof window === 'undefined') {
    return { path: '/', queryParams: {} };
  }
  const pathname = window.location.pathname as RoutePath;
  const searchParams = new URLSearchParams(window.location.search);
  const queryParams: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    queryParams[key] = value;
  });

  const validPaths: RoutePath[] = ['/', '/services', '/work', '/process', '/contact', '/privacy', '/thank-you'];
  const matchedPath = validPaths.includes(pathname) ? pathname : '/';

  return {
    path: matchedPath,
    queryParams,
  };
}

export function useRouter() {
  const [route, setRoute] = useState<RouteState>(parseLocation());

  useEffect(() => {
    const handlePopState = () => {
      setRoute(parseLocation());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((path: RoutePath, queryParams?: Record<string, string>) => {
    let url = path as string;
    if (queryParams && Object.keys(queryParams).length > 0) {
      const search = new URLSearchParams(queryParams).toString();
      url = `${path}?${search}`;
    }

    const isNewPath = window.location.pathname !== path;
    if (window.location.pathname + window.location.search !== url) {
      window.history.pushState({}, '', url);
      setRoute({
        path,
        queryParams: queryParams || {},
      });
      if (!isNewPath) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, []);

  return {
    path: route.path,
    queryParams: route.queryParams,
    navigate,
  };
}
