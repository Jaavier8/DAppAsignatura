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

function EditCalification({ show, onClose, studentAddress, evId, noteSelected }) {

  const { useCacheSend, useCacheCall } = useDrizzle();

  const [name, setName] = useState("");
  const [evName, setEvName] = useState("");
  const [noteType, setNoteType] = useState("");
  const [note, setNote] = useState("");
  const [clicked, setClicked] = useState(false);

  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);

  const ev = useCacheCall(['Asignatura'], call => evId !== -1 ? call("Asignatura", "evaluaciones", evId) : null);
  const student = useCacheCall(['Asignatura'], call => studentAddress !== "" ? call("Asignatura", "datosAlumno", studentAddress) : null);

  useEffect(() => {
    if (noteSelected) {
      setNoteType(noteSelected.tipo);
      setNote(noteSelected.calificacion);
    }
  }, [noteSelected]);

  useEffect(() => {
    if (ev) {
      setEvName(ev.nombre);
    }

    if (student) {
      setName(student.nombre);
    }
  }, [ev, student]);

  const { send, status } = useCacheSend('Asignatura', 'califica');

  useEffect(() => {
    if (status === 'success' && clicked) {
      setShowSuccessSnackbar(true);
      onClose();
      setClicked(false);
    } else if (status === 'error' && clicked) {
      setShowErrorSnackbar(false);
      onClose();
      setClicked(false);
    }
  }, [status, onClose]);

  return (
    <>
      <Snackbar open={showSuccessSnackbar} autoHideDuration={5000} onClose={() => setShowSuccessSnackbar(false)}>
        <MyAlert onClose={() => setShowSuccessSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          Calificación actualizada con éxito
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

            <PageHeader title="Editar calificación" subtitle="Introduce los datos de la calificación" modal={true} />

            <TextField
              fullWidth
              disabled
              label="Nombre del alumno"
              value={name}
              sx={{ my: 3 }}
            />

            <TextField
              fullWidth
              disabled
              label="Nombre de la evaluación"
              value={evName}
              sx={{ my: 3 }}
            />

            <TextField
              fullWidth
              type="number"
              label="Tipo de nota (0=Pendiente 1=N.P. 2=Normal)"
              value={noteType}
              onChange={(event) => {
                setNoteType(event.target.value);
              }}
              sx={{ my: 3 }}
            />

            <TextField
              fullWidth
              type="number"
              label="Nota (x100)"
              value={note}
              onChange={(event) => {
                setNote(event.target.value);
              }}
              sx={{ my: 3 }}
            />

            <Button
              fullWidth
              size="large"
              variant="contained"
              onClick={() => {
                send(studentAddress, evId, noteType, note);
                setClicked(true);
              }}
            >
              Editar calificación
            </Button>

          </MyContainer>
        </RootStyle>
      </Modal>
    </>
  );
}

export default EditCalification;
