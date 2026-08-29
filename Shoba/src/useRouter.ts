import { useState, useEffect } from 'react';

export interface RouteState {
  path: string;
  parts: string[];
  params: Record<string, string>;
}

function parsePath(pathname: string): RouteState {
  let cleanPath = pathname || '/';
  if (cleanPath === '') cleanPath = '/';
  
  const parts = cleanPath.split('/').filter(Boolean);
  const params: Record<string, string> = {};

  if (parts[0] === 'city' && parts[1]) {
    params.cityId = parts[1];
  } else if ((parts[0] === 'project' || parts[0] === 'properties') && parts[1]) {
    params.projectId = parts[1];
  } else if (parts[0] === 'blog' && parts[1]) {
    params.blogId = parts[1];
  }

  return {
    path: cleanPath,
    parts,
    params,
  };
}

export function useRouter() {
  const [route, setRoute] = useState<RouteState>(() => parsePath(window.location.pathname));

  useEffect(() => {
    const handlePopState = () => {
      setRoute(parsePath(window.location.pathname));
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const navigate = (toPath: string) => {
    let target = toPath;
    if (!target.startsWith('/')) target = '/' + target;
    
    window.history.pushState({}, '', target);
    setRoute(parsePath(target));
    
    // Immediate scroll reset unless targeting an in-page section like awards
    if (!target.includes('/awards') && !target.includes('#awards')) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  };

  return { route, navigate };
}
