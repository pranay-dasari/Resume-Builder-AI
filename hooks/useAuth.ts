import { useAuthContext } from '../contexts/AuthContext';
export type { User } from '../contexts/AuthContext';

export const useAuth = () => {
    return useAuthContext();
};
