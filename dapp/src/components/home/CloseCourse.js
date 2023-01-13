import React, { useState, useEffect, forwardRef } from "react";
import { drizzleReactHooks } from '@drizzle/react-plugin'

import {
  Button,
  Container,
  Modal,
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

function CloseCourse({ show, onClose }) {

  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);

  const { useCacheSend } = useDrizzle();

  const { send, status } = useCacheSend('Asignatura', 'cerrar');

  useEffect(() => {
    if (status === 'success') {
      setShowSuccessSnackbar(true);
      onClose();
    } else if (status === 'error') {
      setShowErrorSnackbar(false);
      onClose();
    }
  }, [status, onClose]);

  return (
    <>
      <Snackbar open={showSuccessSnackbar} autoHideDuration={5000} onClose={() => setShowSuccessSnackbar(false)}>
        <MyAlert onClose={() => setShowSuccessSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          Asignatura cerrada con éxito
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
        }}
      >
        <RootStyle>
          <MyContainer>

            <PageHeader title="Cerrar asignatura" subtitle="¿Está seguro que desea cerrar la asignatura?" modal={true} />

            <Button
              fullWidth
              size="large"
              variant="contained"
              onClick={() => send()}
              sx={{ mt: 3 }}
            >
              Cerrar asignatura
            </Button>

          </MyContainer>
        </RootStyle>
      </Modal>
    </>
  );
}

export default CloseCourse;
