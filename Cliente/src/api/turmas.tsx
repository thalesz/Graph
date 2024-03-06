// apiFunctions.ts
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useRefreshToken from "../hooks/useRefreshToken";




interface ITurma {
  id: string;
  nome: String;
  codigo: String;
  // Adicione outros campos do usuário, se necessário
}

const getTurmas = async (axiosPrivate: ReturnType<typeof useAxiosPrivate>) => {
  const controller = new AbortController();
  const refresh = useRefreshToken();  // Adicione a função de refresh token

  try {
    const response = await axiosPrivate.get<ITurma[]>('/turmas', {
      signal: controller.signal,
    });

    return response.data;
  } catch (err:any) {
    if (err.response && err.response.status === 401) {
      // Refresh the access token
      await refresh();

      // Retry the request
      const retryResponse = await axiosPrivate.get<ITurma[]>('/turmas', {
        signal: controller.signal,
      });

      return retryResponse.data;
    }

    if (err.name === 'AbortError') {
      console.warn('Request was canceled due to component unmounting');
    } else {
      console.error(err);
    }

    return [];
  } finally {
    controller.abort();
  }
};

export default getTurmas;

