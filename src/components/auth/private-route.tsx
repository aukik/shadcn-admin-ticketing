import { useEffect } from 'react';
import { useNavigate, useLocation } from '@tanstack/react-router';

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    if (!token) {
      navigate({
        to: '/sign-in',
        search: {
          redirect: location.pathname,
        },
      });
    }
  }, [token, navigate, location]);

  return token ? children : null;
};
