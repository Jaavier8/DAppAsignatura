import { useContext } from "react";
import { drizzleReactHooks } from '@drizzle/react-plugin'

import { Context } from "../components/CreateContext";
import { Stack } from "@mui/system";
import { Divider, Typography } from "@mui/material";

import PageHeader from "../components/PageHeader";
import PersonalizedTable from "../components/PersonalizedTable";

const { useDrizzle } = drizzleReactHooks;

function MyInfoScreen() {
    const { useCacheCall } = useDrizzle();

    const context = useContext(Context);

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
                rows.push([ev?.nombre, nota?.calificacion]);
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
                <Typography variant="body1" sx={{ mb: 2 }}>{datos?.nombre ? datos.nombre : "Desconocido"}</Typography>
                <Typography variant="h5">
                    <b>Correo electrónico</b>
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>{datos?.email ? datos.email : "Desconocido"}</Typography>
                <Typography variant="h5">
                    <b>Dirección</b>
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>{context.connected}</Typography>
                <Typography variant="h5">
                    <b>Balance</b>
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>{context.balance}</Typography>
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
