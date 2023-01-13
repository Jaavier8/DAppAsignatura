import React, { useState, useEffect } from "react";
import { drizzleReactHooks } from '@drizzle/react-plugin'

import {
  Button,
  Container,
  Modal,
  TextField
} from "@mui/material";
import { styled } from "@mui/material/styles";

import PageHeader from "../PageHeader";

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

function EditCalification({ show, onClose, studentAddress, evId }) {

  const { useCacheSend, useCacheCall } = useDrizzle();

  const [name, setName] = useState("");
  const [evName, setEvName] = useState("");
  const [noteType, setNoteType] = useState("");
  const [note, setNote] = useState("");

  const ev = useCacheCall(['Asignatura'], call => evId !== -1 ? call("Asignatura", "evaluaciones", evId) : null);
  const student = useCacheCall(['Asignatura'], call => studentAddress !== "" ? call("Asignatura", "datosAlumno", studentAddress) : null);

  useEffect(() => {
    if (ev) {
      setEvName(ev.nombre);
    }

    if (student) {
      setName(student.nombre);
    }
  }, [ev, student]);

  const { send, status } = useCacheSend('Asignatura', 'califica');

  return (
    <>
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
              label="Nota"
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
              onClick={() => send(studentAddress, evId, noteType, note)}
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
