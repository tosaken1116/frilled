import { useNavigate } from "@tanstack/react-router";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  User,
} from "firebase/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

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
  userName: string | null;
  setCurrentUser: (user: User) => void;
};

const AuthContext = createContext<AuthContextType>({
  userId: null,
  token: null,
  userName: null,
  setCurrentUser: () => {},
});

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const setCurrentUser = (user: User) => {
    setUser(user);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        userId: user?.uid ?? null,
        token: user?.refreshToken ?? null,
        userName: user?.uid ?? null,
        setCurrentUser,
      }}
    >
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
  const { userId, token, userName } = useContext(AuthContext);
  return { userId, token, userName };
};

export const useSignin = () => {
  const { setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const signinWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    const { user } = result;
    if (user === null) {
      return;
    }
    setCurrentUser(user);
    navigate({
      to: "/rooms",
      params: {
        id: "1",
      },
    });
  };
  return { signinWithGoogle };
};
