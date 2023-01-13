import { useState } from "react";
import { drizzleReactHooks } from '@drizzle/react-plugin'

import { Stack } from "@mui/material";

import PageHeader from "../components/PageHeader";
import PersonalizedTable from "../components/PersonalizedTable";

const { useDrizzle } = drizzleReactHooks;

function FinalCalificationsScreen() {

    const { useCacheCall } = useDrizzle();

    let rows = useCacheCall(['Asignatura'], call => {
        let rows = [];
        const ml = call("Asignatura", "matriculasLength") || 0;

        for (let i = 0; i < ml; i++) {

            const addr = call("Asignatura", "matriculas", i);
            const datos = addr && call("Asignatura", "datosAlumno", addr);

            const nota = addr && call("Asignatura", "notaFinal", addr);

            rows.push([datos?.nombre, nota?.calificacion]);
        }

        return rows;
    });


    let tableHead = ["Nombre", "Nota final"];


    return (
        <>
            <PageHeader title="Calificaciones finales" subtitle="A continuación se muestran las calificaciones finales de los alumnos en la asignatura." />

            <Stack justifyContent="center" alignItems="center" sx={{ my: 3 }}>
                <PersonalizedTable head={tableHead} rows={rows} />
            </Stack>

        </>
    );
}

export default FinalCalificationsScreen;
