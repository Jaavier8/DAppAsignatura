import React, { useState, useEffect, forwardRef } from "react";
import { drizzleReactHooks } from '@drizzle/react-plugin'

import {
  Button,
  Container,
  Modal,
  TextField,
  Snackbar
} from "@mui/material";
import { styled } from "@mui/material/styles";

import PageHeader from "../PageHeader";
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MyAlert = styled(Alert)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main
}));

const { useDrizzle } = drizzleReactHooks;

const RootStyle = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  border: "2px solid",
  borderColor: 'blue',
  borderRadius: 16,
  boxShadow: 24,
  backgroundColor: 'white',
}));

const MyContainer = styled(Container)(({ theme }) => ({
  position: "relative",
  maxWidth: 480,
  margin: 15,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}));

function Matricula({ show, onClose }) {

  const [direction, setDirection] = useState("");
  const [name, setName] = useState("");
  const [dni, setDni] = useState("");
  const [email, setEmail] = useState("");
  const [clicked, setClicked] = useState(false);

  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);

  const { useCacheSend } = useDrizzle();

  const { send, status } = useCacheSend('Asignatura', 'matricular');

  useEffect(() => {
    if (status === 'success' && clicked) {
      setShowSuccessSnackbar(true);
      setClicked(false);
      setDirection("");
      setName("");
      setDni("");
      setEmail("");
      onClose();
    } else if (status === 'error' && clicked) {
      setShowErrorSnackbar(false);
      setClicked(false);
      setDirection("");
      setName("");
      setDni("");
      setEmail("");
      onClose();
    }
  }, [status, onClose]);

  return (
    <>
      <Snackbar open={showSuccessSnackbar} autoHideDuration={5000} onClose={() => setShowSuccessSnackbar(false)}>
        <MyAlert onClose={() => setShowSuccessSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          Alumno matriculado con éxito
        </MyAlert>
      </Snackbar>
      <Snackbar open={showErrorSnackbar} autoHideDuration={5000} onClose={() => setShowErrorSnackbar(false)}>
        <MyAlert onClose={() => setShowErrorSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          Ha ocurrido algún error
        </MyAlert>
      </Snackbar>

      <Modal
        open={show}
        onClose={onClose}
        onBackdropClick={() => {
          onClose();
          setDirection("");
          setName("");
          setDni("");
          setEmail("");
          setClicked(false);
        }}
      >
        <RootStyle>
          <MyContainer>

            <PageHeader title="Matricular alumno" subtitle="Introduce los datos del alumno para matricularle en la asignatura" modal={true} />

            <TextField
              fullWidth
              label="Dirección del alumno"
              value={direction}
              onChange={(event) => {
                setDirection(event.target.value);
              }}
              sx={{ my: 3 }}
            />

            <TextField
              fullWidth
              label="Nombre"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
              sx={{ my: 3 }}
            />

            <TextField
              fullWidth
              label="DNI"
              value={dni}
              onChange={(event) => {
                setDni(event.target.value);
              }}
              sx={{ my: 3 }}
            />

            <TextField
              fullWidth
              label="Correo electrónico"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              sx={{ my: 3 }}
            />

            <Button
              fullWidth
              size="large"
              variant="contained"
              onClick={() => {
                send(direction, name, dni, email);
                setClicked(true);
              }}
              sx={{ mt: 3 }}
            >
              Matricular alumno
            </Button>

          </MyContainer>
        </RootStyle>
      </Modal>
    </>
  );
}

export default Matricula;
