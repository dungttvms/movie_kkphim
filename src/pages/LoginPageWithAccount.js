import {
  Alert,
  Box,
  IconButton,
  InputAdornment,
  Stack,
  Link,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockIcon from "@mui/icons-material/Lock";
import { LoadingButton } from "@mui/lab";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FTextField, FormProvider } from "../components/form";
import useAuth from "../hooks/useAuth";
import backgroundImg from "../images/img-login.png";

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
    p: 1,
    width: 450,
    height: 500,
    borderTop: "0.1px solid white",
    borderBottom: "0.1px solid white",
    borderRadius: 3,
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
  textField: {
    "& .MuiInputBase-root": {
      color: "white", // Text color
    },
    "& .MuiInputLabel-root": {
      color: "white", // Label color
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "white", // Border color
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "white", // Border color when focused
    },
    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "white", // Border color on hover
    },
    "& .MuiInputBase-input::placeholder": {
      color: "white", // Placeholder color
    },
  },
  alert: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Background color with transparency
    color: "white", // Text color
    "& .MuiAlert-message": {
      color: "white", // Ensure message text is white
    },
    "& .MuiAlert-icon": {
      color: "white", // Ensure icon color is white
    },
  },
  link: {
    color: "white", // Chữ màu trắng
    textDecoration: "none", // Bỏ gạch chân
    "&:hover": {
      textDecoration: "underline", // Gạch chân khi hover
    },
  },
};
const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});
const defaultValues = {
  email: "b710hausneo@gmail.com",
  password: "1234",
};

function LoginPage() {
  let navigate = useNavigate();

  let auth = useAuth();

  const [showPassword, setShowPassword] = useState(true);

  const methods = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    let { email, password } = data;

    try {
      await auth.login({ email, password }, () => {
        navigate("/", { replace: true });
      });
    } catch (error) {
      reset();
      setError("responseError", error);
    }
  };

  return (
    <Box sx={styles.boxCover}>
      <Box component="div" className="faded-div" />

      <Box sx={styles.boxWrap}>
        <Box sx={styles.boxWrapIconSigIn}>
          <LockIcon sx={{ fontSize: 30 }}></LockIcon>
        </Box>
        <Box sx={styles.boxWrapIconSigIn}>
          <Typography variant="h4" mb={3}>
            Đăng nhập
          </Typography>
        </Box>

        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3} mb={4}>
            {!!errors?.responseError && (
              <Alert severity="error" sx={styles.alert}>
                {errors?.responseError.message}
              </Alert>
            )}
            <Alert severity="info" sx={styles.alert}>
              Bạn chưa có tài khoản{" "}
              <Link
                variant="subtitle2"
                component={RouterLink}
                to="/dang-ky"
                sx={styles.link}
              >
                Tạo tài khoản ngay
              </Link>
            </Alert>
            <FTextField
              name="email"
              label="Địa chỉ Email"
              sx={styles.textField}
            />
            <FTextField
              name="password"
              label="Password"
              type={!showPassword ? "password" : "text"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={() => setShowPassword(true)}
                      onMouseUp={() => setShowPassword(false)}
                      onMouseLeave={() => setShowPassword(false)}
                      edge="end"
                      sx={{ color: "white" }}
                    >
                      {!showPassword ? (
                        <VisibilityOff color="white" />
                      ) : (
                        <Visibility color="white" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={styles.textField}
            />
          </Stack>

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            loading={isSubmitting}
            variant="contained"
            sx={{ color: "secondary.lighter" }}
            color="primary"
          >
            Đăng nhập
          </LoadingButton>

          <Box sx={styles.boxCoverTypoBottom}>
            <Typography sx={styles.typoBottom} variant="subtitle2">
              Quên mật khẩu?
            </Typography>
            <Typography sx={styles.typoBottom} variant="subtitle2">
              Chưa có tài khoản? Đăng ký
            </Typography>
          </Box>
        </FormProvider>
      </Box>
    </Box>
  );
}

export default LoginPage;
