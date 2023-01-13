import { useContext } from 'react';
import { drizzleReactHooks } from '@drizzle/react-plugin'

import { Stack } from "@mui/system";
import { Button } from "@mui/material";

import { Link, useParams } from "react-router-dom";

import { Context } from "../components/CreateContext";
import PageHeader from "../components/PageHeader";
import PersonalizedTable from "../components/PersonalizedTable";

const { useDrizzle } = drizzleReactHooks;

function EvaluationCalificationsScreen() {
    const context = useContext(Context);

    let { id } = useParams();

    const { useCacheCall } = useDrizzle();

    const ev = useCacheCall("Asignatura", "evaluaciones", id) || 0;

    let rows = useCacheCall(['Asignatura'], call => {
        let rows = [];
        const ml = call("Asignatura", "matriculasLength") || 0;

        for (let i = 0; i < ml; i++) {
            const addr = call("Asignatura", "matriculas", i);
            const datos = addr && call("Asignatura", "datosAlumno", addr);
            const nota = addr && call("Asignatura", "calificacionesEvaluacion", id, addr);

            rows.push([datos?.nombre, nota?.calificacion]);
        }

        return rows;
    });

    const tableHead = ["Nombre", "Nota"];

    if (context.isProfesor || context.isCoordinator) {
        return (
            <>
                <PageHeader title={"Notas de la evaluación: " + ev?.nombre} subtitle={"A continuación se muestran las notas de todos los alumnos en la evaluación: " + ev?.nombre} />

                <Stack justifyContent="center" alignItems="center" sx={{ my: 3 }}>
                    <PersonalizedTable head={tableHead} rows={rows} />

                    <Button variant="outlined" component={Link} to={`/evaluaciones`} sx={{ mt: 2 }}>Volver</Button>

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

export default EvaluationCalificationsScreen;
