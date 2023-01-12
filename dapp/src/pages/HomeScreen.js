import { useState, useContext } from "react";
import { drizzleReactHooks } from '@drizzle/react-plugin'

import { Context } from "../components/CreateContext";
import { Stack } from "@mui/system";
import { Button, Divider, Typography } from "@mui/material";

import PageHeader from "../components/PageHeader";
import ChangeCoordinator from "../components/home/ChangeCoordinator";
import CloseCourse from "../components/home/CloseCourse";

const { useDrizzle } = drizzleReactHooks;

function HomeScreen() {
    const { useCacheCall } = useDrizzle();

    const context = useContext(Context);

    const owner = useCacheCall("Asignatura", "owner");
    const coordinator = useCacheCall("Asignatura", "coordinador");
    const estado = useCacheCall("Asignatura", "cerrada") ? "Cerrada" : "Abierta";


    let [showChangeCoordinatorModal, setShowChangeCoordinatorModal] = useState(false);
    let [showCloseCourse, setShowCloseCourse] = useState(false);

    return (
        <>

            <PageHeader title="Página principal de la asignatura" subtitle="A continuación se muestran los datos generales de la asignatura. En caso de ser el owner, se puede cambiar el coordinador de la asignatura. En caso de ser el coordinador, se puede cerrar la asignatura." />

            <Stack justifyContent="center" alignItems="center" sx={{ my: 3 }}>
                <Typography variant="h5">
                    <b>Dirección del owner</b>
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>{owner}</Typography>
                <Typography variant="h5">
                    <b>Dirección del coordinador</b>
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>{coordinator}</Typography>
                <Typography variant="h5">
                    <b>Estado de la asignatura</b>
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>{estado}</Typography>
            </Stack>

            {(context.isOwner || context.isCoordinator) ? <>
                <Divider />
                <Stack justifyContent="center" alignItems="center" spacing={2} sx={{ my: 3 }}>
                    <Typography variant="h5">
                        <b>Acciones</b>
                    </Typography>
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{ my: 3 }}>
                        {context.isOwner ?
                            <Button
                                variant="contained"
                                onClick={() => setShowChangeCoordinatorModal(true)}
                            >
                                Cambiar coordinador
                            </Button> : null}
                        {context.isCoordinator ?
                            <Button
                                variant="contained"
                                onClick={() => setShowCloseCourse(true)}
                            >
                                Cerrar asignatura
                            </Button> : null}
                    </Stack>
                </Stack>
            </> : null}

            <ChangeCoordinator
                show={showChangeCoordinatorModal}
                onClose={() => setShowChangeCoordinatorModal(false)}
            />

            <CloseCourse
                show={showCloseCourse}
                onClose={() => setShowCloseCourse(false)}
            />

        </>
    );
}

export default HomeScreen;
