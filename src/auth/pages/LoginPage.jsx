import { useMemo, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Google } from "@mui/icons-material";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Link,
  Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import {
  startGoogleSignIn,
  startLoginWithEmailPassword,
} from "../../store/auth/thunks";

const formValidations = {
  email: [(value) => value.includes("@"), "El correo debe tener una @"],
  password: [
    (value) => value.length >= 6,
    "La contraseña debe tener más de 6 letras",
  ],
};

const formData = {
  email: "",
  password: "",
};

export const LoginPage = () => {
  // AuthLayout se utilizará para otros componentes
  const {
    email,
    password,
    onInputChange,
    formState,
    emailValid,
    passwordValid,
  } = useForm(formData, formValidations);

  const { status, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [formSubmitted, setformSubmitted] = useState(false);

  const isAuthenticating = useMemo(() => status === "checking", [status]);

  const onSubmit = (event) => {
    event.preventDefault();
    setformSubmitted(true);

    console.log(formState);
    //! No es la acción a despachar
    dispatch(startLoginWithEmailPassword({ email, password }));
  };

  const onGoogleSignIn = () => {
    console.log("On Google SignIn");
    dispatch(startGoogleSignIn());
  };

  return (
    <AuthLayout title="Login">
      <form
        aria-label="submit-form"
        onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              name="password"
              inputProps={{ "data-testid": "password" }}
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
            />
          </Grid>

          <Grid container>
            <Grid
              item
              xs={12}
              display={errorMessage ? "" : "None"}
              sx={{ mt: 1 }}
            >
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
          </Grid>

          {/* Contenedor de los botones */}
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            {/* Para pantallas pequeñas: 12 para pantallas medianas: 6 */}
            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAuthenticating}
                type="submit"
                variant="contained"
                fullWidth
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAuthenticating}
                variant="contained"
                fullWidth
                aria-label="google-btn"
                onClick={onGoogleSignIn}
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            {/* El componente RouterLink es usado por Link */}
            <Link component={RouterLink} color="inherit" to="/auth/register">
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
