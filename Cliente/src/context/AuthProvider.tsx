import { createContext, ReactNode, useState, useEffect } from "react";

interface AuthContextProps {
  auth: any; // Substitua 'any' pelo tipo apropriado para o seu contexto
  setAuth: React.Dispatch<React.SetStateAction<any>>; // Substitua 'any' pelo tipo apropriado
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<any>(() => {
    // Inicializar a partir do sessionStorage, se existir
    const storedAuth = sessionStorage.getItem('auth');
    return storedAuth ? JSON.parse(storedAuth) : {};
  });

  // Efeito para atualizar o sessionStorage sempre que o estado de autenticação é alterado
  useEffect(() => {
    sessionStorage.setItem('auth', JSON.stringify(auth));
  }, [auth]);

  const logout = () => {
    // Limpar o sessionStorage e setar o estado de autenticação para vazio
    sessionStorage.removeItem('auth');
    setAuth({});
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth , logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider as default, AuthContext };
