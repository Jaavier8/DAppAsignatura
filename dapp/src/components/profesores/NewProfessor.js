import React, { useState } from "react";
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

function NewProfessor({ show, onClose }) {

  const [direction, setDirection] = useState("");
  const [name, setName] = useState("");

  const { useCacheSend } = useDrizzle();

  const { send, status } = useCacheSend('Asignatura', 'addProfesor');

  return (
    <>
      <Modal
        open={show}
        onClose={onClose}
        onBackdropClick={() => {
          onClose();
          setDirection("");
          setName("");
        }}
      >
        <RootStyle>
          <MyContainer>

            <PageHeader title="Nueva profesor" subtitle="Introduce los datos del nuevo profesor" modal={true} />

            <TextField
              fullWidth
              label="Dirección del nuevo profesor"
              value={direction}
              onChange={(event) => {
                setDirection(event.target.value);
              }}
              sx={{ my: 3 }}
            />

            <TextField
              fullWidth
              label="Nombre del nuevo profesor"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
              sx={{ my: 3 }}
            />

            <Button
              fullWidth
              size="large"
              variant="contained"
              onClick={() => send(direction, name)}
            >
              Añadir profesor
            </Button>

          </MyContainer>
        </RootStyle>
      </Modal>
    </>
  );
}

export default NewProfessor;
