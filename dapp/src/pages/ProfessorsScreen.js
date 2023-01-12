import { useState, useContext } from "react";
import { drizzleReactHooks } from '@drizzle/react-plugin'

import { Context } from "../components/CreateContext";
import { Stack } from "@mui/system";
import { Button, Divider, Typography } from "@mui/material";

import PageHeader from "../components/PageHeader";
import PersonalizedTable from "../components/PersonalizedTable";
import NewProfessor from "../components/profesores/NewProfessor";

const { useDrizzle } = drizzleReactHooks;

function ProfessorsScreen() {
    const context = useContext(Context);

    const { useCacheCall } = useDrizzle();

    let [showNewProfessorModal, setShowNewProfessorModal] = useState(false);

    let rows = useCacheCall(['Asignatura'], call => {
        let rows = [];
        const pl = call("Asignatura", "profesoresLength") || 0;

        for (let i = 0; i < pl; i++) {
            const addr = call("Asignatura", "profesores", i);
            const name = addr && call("Asignatura", "datosProfesor", addr);
            rows.push([name]);
        }
        return rows;
    });

    const tableHead = ["Nombre"];

    return (
        <>

            <PageHeader title="Profesores" subtitle="A continuación se muestran los distintos profesores de la asignatura. En caso de ser el owner, se pueden crear nuevos profesores." />

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
                        onClick={() => setShowNewProfessorModal(true)}
                    >
                        Añadir profesor
                    </Button>
                </Stack>
            </> : null}

            <NewProfessor
                show={showNewProfessorModal}
                onClose={() => setShowNewProfessorModal(false)}
            />

        </>
    );
}

export default ProfessorsScreen;
