
import { create } from 'zustand'



export const useAuthStore = create(() => ({
  logout: () => {
    localStorage.removeItem('accessToken');
    window.location.href = '/sign-in';
  },
}));

// export const useAuth = () => useAuthStore((state) => state.auth)
