import { useState, useContext } from "react";
import { drizzleReactHooks } from '@drizzle/react-plugin'

import { Context } from "../components/CreateContext";
import { Stack } from "@mui/system";
import { Button, Divider, Typography } from "@mui/material";

import { Link } from "react-router-dom";

import PageHeader from "../components/PageHeader";
import PersonalizedTable from "../components/PersonalizedTable";
import Matricula from "../components/alumnos/Matricula";

const { useDrizzle } = drizzleReactHooks;

function StudentsScreen() {
    const context = useContext(Context);

    const { useCacheCall } = useDrizzle();

    let [showNewStudentModal, setShowNewStudentModal] = useState(false);

    let rows = useCacheCall(['Asignatura'], call => {
        let rows = [];
        const sl = call("Asignatura", "matriculasLength") || 0;

        for (let i = 0; i < sl; i++) {
            const addr = call("Asignatura", "matriculas", i);
            const datos = addr && call("Asignatura", "datosAlumno", addr);
            rows.push([datos?.nombre, datos?.dni, datos?.email, <Button variant="outlined" component={Link} to={`/alumnos/${addr}`}>Info</Button>]);
        }
        return rows;
    });

    const tableHead = ["Nombre", "DNI", "Email", "Info"];

    return (
        <>

            <PageHeader title="Alumnos" subtitle="A continuación se muestran los alumnos matriculados en la asignatura. En caso de ser el owner, se pueden matricular nuevos alumnos." />

            <Stack justifyContent="center" alignItems="center" sx={{ my: 3 }}>
                <PersonalizedTable head={tableHead} rows={rows} />
            </Stack>

            {context.isOwner ? <>
                <Divider />
                <Stack justifyContent="center" alignItems="center" spacing={2} sx={{ my: 3 }}>
                    <Typography variant="h5">
                        <b>Acciones</b>
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => setShowNewStudentModal(true)}
                    >
                        Añadir alumno
                    </Button>
                </Stack>
            </> : null}

            <Matricula
                show={showNewStudentModal}
                onClose={() => setShowNewStudentModal(false)}
            />

        </>
    );
}

export default StudentsScreen;
