import React from "react";
import { drizzleReactHooks } from '@drizzle/react-plugin'

import {
  Button,
  Container,
  Modal
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

function CloseCourse({ show, onClose }) {

  const { useCacheSend } = useDrizzle();

  const {send, status} = useCacheSend('Asignatura', 'cerrar');

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
