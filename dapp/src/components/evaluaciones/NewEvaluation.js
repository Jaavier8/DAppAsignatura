import React, { useState, useEffect, forwardRef } from "react";
import { drizzleReactHooks } from '@drizzle/react-plugin'

import {
  Button,
  Container,
  Modal,
  TextField,
  Snackbar
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
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

function NewEvaluation({ show, onClose }) {

  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [percentage, setPercentage] = useState(0);
  const [minimum, setMinimum] = useState(0);
  const [clicked, setClicked] = useState(false);

  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);

  const { useCacheSend } = useDrizzle();

  const { send, status } = useCacheSend('Asignatura', 'creaEvaluacion');

  useEffect(() => {
    if (status === 'success' && clicked) {
      setShowSuccessSnackbar(true);
      onClose();
      setClicked(false);
      setName("");
      setDate(new Date());
      setPercentage(0);
      setMinimum(0);
    } else if (status === 'error' && clicked) {
      setShowErrorSnackbar(false);
      onClose();
      setClicked(false);
      setName("");
      setDate(new Date());
      setPercentage(0);
      setMinimum(0);
    }
  }, [status, onClose]);

  return (
    <>
      <Snackbar open={showSuccessSnackbar} autoHideDuration={5000} onClose={() => setShowSuccessSnackbar(false)}>
        <MyAlert onClose={() => setShowSuccessSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          Evaluación creada con éxito
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
          setClicked(false);
          setName("");
          setDate(new Date());
          setPercentage(0);
          setMinimum(0);
        }}
      >
        <RootStyle>
          <MyContainer>

            <PageHeader title="Nueva evaluación" subtitle="Introduce los datos de la nueva evaluación" modal={true} />

            <TextField
              fullWidth
              label="Nombre de la nueva evaluación"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
              sx={{ my: 3 }}
            />

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Fecha de la evaluación"
                value={date}
                onChange={(newValue) => {
                  setDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>

            <TextField
              fullWidth
              type="number"
              label="Porcentaje de la evaluación"
              value={percentage}
              onChange={(event) => {
                setPercentage(event.target.value);
              }}
              sx={{ my: 3 }}
            />

            <TextField
              fullWidth
              type="number"
              label="Nota mínima en la evaluación"
              value={minimum}
              onChange={(event) => {
                setMinimum(event.target.value);
              }}
              sx={{ my: 3 }}
            />

            <Button
              fullWidth
              size="large"
              variant="contained"
              onClick={() => {
                send(name, new Date(date).getTime(), percentage, minimum);
                setClicked(true);
              }}
            >
              Añadir evaluación
            </Button>

          </MyContainer>
        </RootStyle>
      </Modal>
    </>
  );
}

export default NewEvaluation;
