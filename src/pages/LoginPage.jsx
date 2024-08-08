import { Box, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import useAuth from "../hooks/useAuth";
import backgroundImg from "../images/img-login.png";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { apiService2 } from "../app/apiService";
import { toast } from "react-toastify";
import { GOOGLE_CLIENT_ID } from "../app/config";

const styles = {
  boxWrapIconSigIn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    p: 1,
    color: "secondary.lighter",
  },
  boxCover: {
    position: "relative",
    minHeight: "100vh",
    top: 0,
    backgroundImage: `url(${backgroundImg})`,
    backgroundSize: "cover",
    height: "100%",
    width: "100%",
    m: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "secondary.lighter",
  },
  boxWrap: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    p: 2,
    width: 450,
    height: 200,
    borderTop: "0.1px solid white",
    borderBottom: "0.1px solid white",
    borderRadius: 3,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: adds a slight background overlay to make the content more readable
  },

  boxCoverTypoBottom: {
    display: "flex",
    justifyContent: "space-between",
    p: 2,
  },
  typoBottom: {
    "&:hover": {
      cursor: "pointer",
      color: "white",
    },
  },
};

function LoginPage() {
  const navigate = useNavigate();
  const auth = useAuth();

  return (
    <Box sx={styles.boxCover}>
      <Box component="div" className="faded-div" />
      <Box sx={styles.boxWrap}>
        <Box sx={styles.boxWrapIconSigIn}>
          <LockIcon sx={{ fontSize: 30 }} />
        </Box>
        <Typography variant="h4" mb={3} sx={{ textAlign: "center" }}>
          Đăng nhập
        </Typography>

        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              const token = credentialResponse.credential;
              try {
                const response = await apiService2.post("/oauth", { token });

                if (response.data && response.data.email) {
                  const { email, picture, name } = response.data;
                  try {
                    await auth.loginWithGoogle({ email, name, picture }, () => {
                      navigate("/", { replace: true });
                    });
                  } catch (error) {
                    toast.error("Login Error");
                    navigate("/login");
                  }
                } else {
                  toast.error("Login Error");
                  navigate("/login");
                }
              } catch (error) {
                console.log("Error during Google Login:", error);
                toast.error("Login Error");
              }
            }}
            onError={() => {
              console.log("Login Failed");
            }}
            width="300"
            logo_alignment="center"
            theme="outlined"
          />
        </GoogleOAuthProvider>
      </Box>
    </Box>
  );
}

export default LoginPage;
