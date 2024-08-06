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
import * as Yup from "yup";
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
    padding: 1,
    width: 450,
    height: 678,
    display: "flex",

    flexDirection: "column",
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
      color: "secondary.lighter",
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
const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Vui lòng nhập tên của bạn"),
  phoneNumber: Yup.string()
    .matches(/^(09|08|07|05|03)\d{8}$/, "Vui lòng nhập số điện thoại hợp lệ")
    .required("Vui lòng nhập số điện thoại"),
  email: Yup.string()
    .email("Invalid email")
    .required("Vui lòng nhập Email của bạn"),
  passwordConfirmation: Yup.string()
    .required("Vui lòng nhập xác nhận mật khẩu")
    .oneOf([Yup.ref("password")], "Xác nhận mật khẩu không đúng"),
});

const defaultValues = {
  name: "",
  phoneNumber: "",
  email: "",
  password: "",
  passwordConfirmation: "",
};

function RegisterPage() {
  const auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(
    false
  );

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    let { name, email, phoneNumber, password } = data;

    try {
      await auth.register({ name, email, phoneNumber, password }, () => {
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
            Đăng ký
          </Typography>
        </Box>

        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3} mb={4}>
            {!!errors.responseError && (
              <Alert severity="error" sx={styles.alert}>
                {errors.responseError.message}
              </Alert>
            )}
            <Alert security="info" sx={styles.alert}>
              Bạn đã có tài khoản?{" "}
              <Link
                varial="subtitles2"
                component={RouterLink}
                to="/dang-nhap"
                sx={styles.link}
              >
                Đăng nhập ngay
              </Link>
            </Alert>
            <FTextField name="name" label="Tên của bạn" sx={styles.textField} />
            <FTextField
              name="phoneNumber"
              label="Số điện thoại"
              sx={styles.textField}
            />
            <FTextField
              name="email"
              label="Địa chỉ Email"
              sx={styles.textField}
            />
            <FTextField
              name="password"
              label="Mật khẩu"
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
            <FTextField
              name="passwordConfirmation"
              label="Xác nhận mật khẩu"
              type={!showPasswordConfirmation ? "password" : "text"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowPasswordConfirmation(!showPasswordConfirmation)
                      }
                      onMouseDown={() => setShowPassword(true)}
                      onMouseUp={() => setShowPassword(false)}
                      onMouseLeave={() => setShowPassword(false)}
                      edge="end"
                      sx={{ color: "white" }}
                    >
                      {!showPasswordConfirmation ? (
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
            Đăng ký
          </LoadingButton>
        </FormProvider>
      </Box>
    </Box>
  );
}

export default RegisterPage;
