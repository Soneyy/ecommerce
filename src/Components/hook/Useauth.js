import { useSelector } from 'react-redux';

export const Useauth = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const user = useSelector((state) => state.user.user);

  return {
    isLoggedIn,
    user,
  };
};
