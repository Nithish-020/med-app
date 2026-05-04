import {
  createContext,
  useContext,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";
import type { AuthUser } from "@/types";

const EMPTY_USER: AuthUser = { user_id: 0, username: "", role: "" };

type AuthAction =
  | { type: "SET_USER"; payload: AuthUser }
  | { type: "CLEAR_USER" };

function authReducer(state: AuthUser, action: AuthAction): AuthUser {
  switch (action.type) {
    case "SET_USER":
      return { ...action.payload };
    case "CLEAR_USER":
      return { ...EMPTY_USER };
    default:
      return state;
  }
}

interface AuthContextValue {
  user: AuthUser;
  dispatch: Dispatch<AuthAction>;
  setUser: (u: AuthUser) => void;
  clearUser: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, dispatch] = useReducer(authReducer, EMPTY_USER);

  const value: AuthContextValue = {
    user,
    dispatch,
    setUser: (u) => dispatch({ type: "SET_USER", payload: u }),
    clearUser: () => dispatch({ type: "CLEAR_USER" }),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
