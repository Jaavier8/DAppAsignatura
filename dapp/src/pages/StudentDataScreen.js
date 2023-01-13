import { useContext } from 'react';
import { drizzleReactHooks } from '@drizzle/react-plugin'

import { Stack } from "@mui/system";
import { Button, Typography } from "@mui/material";

import { useParams, Link } from "react-router-dom";

import { Context } from "../components/CreateContext";
import PageHeader from "../components/PageHeader";

const { useDrizzle } = drizzleReactHooks;

function StudentDataScreen() {
    const context = useContext(Context);
    const { useCacheCall } = useDrizzle();

    let { addr } = useParams();

    const datos = useCacheCall("Asignatura", "datosAlumno", addr);

    if (context.isOwner || context.isCoordinator || context.isProfesor) {
        return (
            <>

                <PageHeader title="Información alumno" subtitle="A continuación se muestran los datos del alumno." />

                <Stack justifyContent="center" alignItems="center" sx={{ my: 3 }}>
                    <Typography variant="h5">
                        <b>Nombre del alumno</b>
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>{datos?.nombre}</Typography>
                    <Typography variant="h5">
                        <b>DNI del alumno</b>
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>{datos?.dni}</Typography>
                    <Typography variant="h5">
                        <b>Correo electrónico del alumno</b>
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>{datos?.email}</Typography>
                    <Typography variant="h5">
                        <b>Dirección del alumno</b>
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>{addr}</Typography>

                    <Button variant="outlined" component={Link} to={`/alumnos`}>Volver</Button>
                </Stack>

            </>
        )
    } else {
        return (
            <>
                <PageHeader title="No tienes permiso para acceder a esta página" subtitle="" modal={true} />
            </>
        )
    }

}

export default StudentDataScreen;
