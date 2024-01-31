import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = (): (() => Promise<string>) => {
  const { setAuth } = useAuth();

  const refresh = async (): Promise<string> => {
    try {
      const response = await axios('/refresh', {
        withCredentials: true,
      });

      setAuth((prev: any) => {
        console.log(JSON.stringify(prev));
        console.log(response.data.accessToken);
        return { ...prev, accessToken: response.data.accessToken };
      });

      return response.data.accessToken;
    } catch (error) {
      console.error(error);
      throw error; // Propaga o erro para que possa ser tratado por quem chama a função
    }
  };

  return refresh;
};

export default useRefreshToken;
