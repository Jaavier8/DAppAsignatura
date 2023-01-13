import { useContext } from "react";
import { drizzleReactHooks } from '@drizzle/react-plugin'

import { Stack } from "@mui/material";

import { Context } from "../components/CreateContext";
import PageHeader from "../components/PageHeader";
import PersonalizedTable from "../components/PersonalizedTable";

const { useDrizzle } = drizzleReactHooks;

function FinalCalificationsScreen() {
    const context = useContext(Context);

    const { useCacheCall } = useDrizzle();

    const result = (note) => {
        if (note) {
            switch (note.tipo) {
                case "0":
                    return "Sin calificación";
                case "1":
                    return "N.P.";
                case "2":
                    return (note.calificacion / 100).toFixed(2);
                default:
                    return "Sin calificación";
            }
        }
    }

    let rows = useCacheCall(['Asignatura'], call => {
        let rows = [];
        const ml = call("Asignatura", "matriculasLength") || 0;

        for (let i = 0; i < ml; i++) {

            const addr = call("Asignatura", "matriculas", i);
            const datos = addr && call("Asignatura", "datosAlumno", addr);

            const nota = addr && call("Asignatura", "notaFinal", addr);

            rows.push([datos?.nombre, result(nota)]);
        }

        return rows;
    });


    let tableHead = ["Nombre", "Nota final"];

    if (context.isProfesor || context.isCoordinator) {
        return (
            <>
                <PageHeader title="Calificaciones finales" subtitle="A continuación se muestran las calificaciones finales de los alumnos en la asignatura." />

                <Stack justifyContent="center" alignItems="center" sx={{ my: 3 }}>
                    <PersonalizedTable head={tableHead} rows={rows} />
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

export default FinalCalificationsScreen;
