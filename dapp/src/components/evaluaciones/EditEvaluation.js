import React, { useState, useEffect } from "react";
import { drizzleReactHooks } from '@drizzle/react-plugin'

import {
  Button,
  Container,
  Modal,
  TextField
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
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

function EditEvaluation({ show, onClose, evId }) {

  const { useCacheSend, useCacheCall } = useDrizzle();

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [percentage, setPercentage] = useState(0);
  const [minimum, setMinimum] = useState(0);

  //const ev = evId && useCacheCall("Asignatura", "evaluaciones", evId);

  const ev = useCacheCall(['Asignatura'], call => evId !== -1 ? call("Asignatura", "evaluaciones", evId) : null);

  useEffect(() => {
    if (ev) {
      console.log(ev.nombre);
      console.log(new Date(parseInt(ev.fecha)).toLocaleString());
      console.log(parseInt(ev.porcentaje));
      console.log(parseInt(ev.minimo));
      
      setName(ev.nombre);
      setDate(new Date(parseInt(ev.fecha)));
      setPercentage(parseInt(ev.porcentaje));
      setMinimum(parseInt(ev.minimo));
    }
  }, [ev]);

  const { send, status } = useCacheSend('Asignatura', 'editaEvaluacion');

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

            <PageHeader title="Editar evaluación" subtitle="Introduce los nuevos datos de la evaluación" modal={true} />

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
              onClick={() => send(evId, name, new Date(date).getTime(), percentage, minimum)}
            >
              Editar evaluación
            </Button>

          </MyContainer>
        </RootStyle>
      </Modal>
    </>
  );
}

export default EditEvaluation;
