import { createContext, useReducer, useEffect } from "react";
import { apiService2 } from "../app/apiService";
import { toast } from "react-toastify";
import { isValidToken } from "../utils/jwt";

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const INITIALIZE = "AUTH.INITIALIZE";
const LOGIN_GOOGLE_SUCCESS = "AUTH.LOGIN_GOOGLE_SUCCESS";

const reducer = (state, action) => {
  switch (action.type) {
    case INITIALIZE:
      const { isAuthenticated, user } = action.payload;
      return {
        ...state,
        isInitialized: true,
        isAuthenticated,
        user,
      };
    case LOGIN_GOOGLE_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    default:
      return state;
  }
};

const AuthContext = createContext({ ...initialState });

const setSession = (accessToken) => {
  if (accessToken) {
    window.localStorage.setItem("accessToken", accessToken);
    apiService2.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    window.localStorage.removeItem("accessToken");
    delete apiService2.defaults.headers.common.Authorization;
  }
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          const response = await apiService2.get("/users/me");
          const user = response.data.data;

          dispatch({
            type: INITIALIZE,
            payload: {
              isAuthenticated: true,
              user,
              accessToken,
            },
          });
        } else {
          setSession(null);
          dispatch({
            type: INITIALIZE,
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (error) {
        setSession(null);
        dispatch({
          type: INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };
    initialize();
  }, []);

  const loginWithGoogleAccount = async ({ email, name, picture }, callback) => {
    try {
      const response = await apiService2.post("/oauth/login", {
        email,
        name,
        picture,
      });

      if (response.data) {
        console.log("Login Response Data:", response.data);
      } else {
        console.warn("No data in response");
      }

      const { user, accessToken } = response.data?.data || {}; // Use optional chaining and fallback to an empty object

      if (user && accessToken) {
        setSession(accessToken);
        dispatch({
          type: LOGIN_GOOGLE_SUCCESS,
          payload: { user, accessToken },
        });
        toast.success("Login success");
        callback();
      } else {
        throw new Error("Missing user or accessToken in response");
      }
    } catch (error) {
      console.error("Error in loginWithGoogleAccount:", error);
      toast.error("Login failed");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        loginWithGoogleAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
