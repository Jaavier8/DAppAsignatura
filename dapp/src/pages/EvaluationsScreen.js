import { useState, useContext } from "react";
import { drizzleReactHooks } from '@drizzle/react-plugin'

import { Context } from "../components/CreateContext";
import { Button, Divider, Typography, Stack } from "@mui/material";

import { Link } from "react-router-dom";

import PageHeader from "../components/PageHeader";
import PersonalizedTable from "../components/PersonalizedTable";
import NewEvaluation from "../components/evaluaciones/NewEvaluation";
import EditEvaluation from "../components/evaluaciones/EditEvaluation";

const { useDrizzle } = drizzleReactHooks;

function EvaluationsScreen() {
    const context = useContext(Context);

    const { useCacheCall } = useDrizzle();

    let [showNewEvaluationModal, setShowNewEvaluationModal] = useState(false);
    let [showEditEvaluationModal, setShowEditEvaluationModal] = useState(false);
    let [evSelected, setEvSelected] = useState(-1);

    let rows = useCacheCall(['Asignatura'], call => {
        let rows = [];
        const el = call("Asignatura", "evaluacionesLength") || 0;

        for (let i = 0; i < el; i++) {
            const ev = call("Asignatura", "evaluaciones", i);
            rows.push([ev?.nombre, new Date(parseInt(ev?.fecha)).toLocaleString(), ev?.minimo, ev?.porcentaje]);
        }
        return rows;
    });

    const tableHead = ["Evaluación", "Fecha", "Nota mínima", "Porcentaje"];

    if (context.isCoordinator || context.isProfesor) {
        rows.map((row, index) => row.push(
            <Button variant="outlined" component={Link} to={`/calificacionesEv/${index}`}>
                Ver notas
            </Button>
        ));
        tableHead.push("Notas");
    }

    if (context.isCoordinator) {
        rows.map((row, index) => row.push(
            <Button
                variant="outlined"
                onClick={() => {
                    setEvSelected(index);
                    setShowEditEvaluationModal(true);
                }}
            >
                Editar
            </Button>
        ));
        tableHead.push("Editar");
    }

    return (
        <>

            <PageHeader title="Evaluaciones" subtitle="A continuación se muestran las distintas evaluaciones de la asignatura. En caso de ser el coordinador, se pueden crear nuevas evaluaciones y modificar las existentes." />

            <Stack justifyContent="center" alignItems="center" sx={{ my: 3 }}>
                <PersonalizedTable head={tableHead} rows={rows} />
            </Stack>

            {context.isCoordinator ? <>
                <Divider />
                <Stack justifyContent="center" alignItems="center" spacing={2} sx={{ my: 3 }}>
                    <Typography variant="h5">
                        <b>Acciones</b>
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => setShowNewEvaluationModal(true)}
                    >
                        Añadir evaluación
                    </Button>
                </Stack>
            </> : null}

            <NewEvaluation
                show={showNewEvaluationModal}
                onClose={() => setShowNewEvaluationModal(false)}
            />

            <EditEvaluation
                show={showEditEvaluationModal}
                onClose={() => setShowEditEvaluationModal(false)}
                evId={evSelected}
            />

        </>
    );
}

export default EvaluationsScreen;
