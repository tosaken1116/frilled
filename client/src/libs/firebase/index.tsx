import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { createContext, ReactNode, useContext, useState } from "react";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

type AuthContextType = {
  userId: string | null;
  token: string | null;
  setCurrentUser: (userId: string, token: string) => void;
};

const AuthContext = createContext<AuthContextType>({
  userId: null,
  token: null,
  setCurrentUser: () => {},
});

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const setCurrentUser = (userId: string, token: string) => {
    setUserId(userId);
    setToken(token);
  };

  return (
    <AuthContext.Provider value={{ userId, token, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { userId, token } = useContext(AuthContext);
  if (userId === null || token === null) {
    return null;
  }
  return <>{children}</>;
};

export const useAuth = () => {
  const { userId, token } = useContext(AuthContext);
  return { userId, token };
};

export const useSignin = async () => {
  const { setCurrentUser } = useContext(AuthContext);
  const signinWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    const { user } = result;
    if (user === null) {
      return;
    }
    const token = await user.getIdToken();
    setCurrentUser(user.uid, token);
  };
  return { signinWithGoogle };
};
