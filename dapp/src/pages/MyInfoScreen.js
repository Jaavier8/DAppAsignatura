import { useContext } from "react";
import { drizzleReactHooks } from '@drizzle/react-plugin'

import { Context } from "../components/CreateContext";
import { Divider, Typography, Stack } from "@mui/material";

import PageHeader from "../components/PageHeader";
import PersonalizedTable from "../components/PersonalizedTable";

const { useDrizzle } = drizzleReactHooks;

function MyInfoScreen() {
    const { useCacheCall } = useDrizzle();

    const context = useContext(Context);

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

    let datos = {};

    const tableHead = ["Evaluación", "Nota"];

    let rows = useCacheCall(['Asignatura'], call => {
        let rows = [];
        if (context.isAlumno) {
            datos = call("Asignatura", "quienSoy", { from: context.connected });

            const el = call("Asignatura", "evaluacionesLength") || 0;

            for (let i = 0; i < el; i++) {
                const ev = call("Asignatura", "evaluaciones", i);
                const nota = call("Asignatura", "calificacionesAlumno", context.connected, i);
                rows.push([ev?.nombre, result(nota)]);
            }
        }
        return rows;
    });


    return (
        <>

            <PageHeader title="Mis datos" subtitle="A continuación se muestra su información. En caso de ser alumno, se muestran todas sus notas." />

            <Stack justifyContent="center" alignItems="center" sx={{ my: 3 }}>
                <Typography variant="h5">
                    <b>Nombre</b>
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>{datos?._nombre ? datos._nombre : "Desconocido"}</Typography>
                <Typography variant="h5">
                    <b>Correo electrónico</b>
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>{datos?._email ? datos._email : "Desconocido"}</Typography>
                <Typography variant="h5">
                    <b>Dirección</b>
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>{context.connected}</Typography>
                <Typography variant="h5">
                    <b>Balance</b>
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>{context.balance} weis</Typography>
                <Typography variant="h5">
                    <b>Roles</b>
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>{context.roles.length === 0 ? "Sin roles" : context.roles.toString()}</Typography>
            </Stack>

            {context.isAlumno ? <>
                <Divider />
                <Stack justifyContent="center" alignItems="center" sx={{ my: 3 }}>
                    <PersonalizedTable head={tableHead} rows={rows} />
                </Stack>
            </> : null}

        </>
    );
}

export default MyInfoScreen;
