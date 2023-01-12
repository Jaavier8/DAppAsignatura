import React, { useState } from "react";
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

function ChangeCoordinator({ show, onClose }) {

  const [direction, setDirection] = useState("");

  const { useCacheSend } = useDrizzle();

  const {send, status} = useCacheSend('Asignatura', 'setCoordinador');

  return (
    <>
      <Modal
        open={show}
        onClose={onClose}
        onBackdropClick={() => {
          onClose();
          setDirection("");
        }}
      >
        <RootStyle>
          <MyContainer>

            <PageHeader title="Cambiar Coordinador" subtitle="Introduce la dirección del nuevo coordinador" modal={true} />

            <TextField
              fullWidth
              label="Dirección del nuevo coordinador"
              value={direction}
              onChange={(event) => {
                setDirection(event.target.value);
              }}
              sx={{ my: 3 }}
            />

            <Button
              fullWidth
              size="large"
              variant="contained"
              onClick={() => send(direction)}
            >
              Cambiar coordinador
            </Button>

          </MyContainer>
        </RootStyle>
      </Modal>
    </>
  );
}

export default ChangeCoordinator;
