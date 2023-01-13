import { useState, useContext } from "react";
import { drizzleReactHooks } from '@drizzle/react-plugin'

import { Context } from "../components/CreateContext";
import { IconButton, Stack} from "@mui/material";
import { Icon } from '@iconify/react';


import PageHeader from "../components/PageHeader";
import PersonalizedTable from "../components/PersonalizedTable";
import EditCalification from "../components/calificaciones/EditCalification";

import brushFill from '@iconify/icons-eva/brush-fill';

const { useDrizzle } = drizzleReactHooks;

function CalificationsScreen() {
    const context = useContext(Context);

    const { useCacheCall } = useDrizzle();

    let [showEditCalificationModal, setShowEditCalificationModal] = useState(false);
    let [studentAddress, setStudentAddress] = useState("");
    let [evSelected, setEvSelected] = useState(-1);

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
        const el = call("Asignatura", "evaluacionesLength") || 0;

        for (let i = 0; i < ml; i++) {
            let califications = [];

            const addr = call("Asignatura", "matriculas", i);
            const datos = addr && call("Asignatura", "datosAlumno", addr);

            for (let j = 0; j < el; j++) {
                const nota = addr && call("Asignatura", "calificacionesEvaluacion", j, addr);

                if (context?.isProfesor) {
                    califications.push(<>
                        {result(nota)} <sup>
                            <IconButton
                                onClick={() => {
                                    setShowEditCalificationModal(true);
                                    setStudentAddress(addr);
                                    setEvSelected(j);
                                }}
                                sx={{
                                    color: 'black',
                                    padding: 0,
                                    width: 15,
                                    height: 15,
                                }}
                            >
                                <Icon icon={brushFill} />
                            </IconButton>
                        </sup>
                    </>);
                } else {
                    califications.push(result(nota));
                }
            }

            rows.push([datos?.nombre, ...califications]);
        }

        return rows;
    });

    let tableHead = useCacheCall(['Asignatura'], call => {
        let tableHead = ["Nombre"];
        const el = call("Asignatura", "evaluacionesLength") || 0;

        for (let i = 0; i < el; i++) {
            const ev = call("Asignatura", "evaluaciones", i);
            tableHead.push(ev?.nombre);
        }

        return tableHead;
    });


    return (
        <>
            <PageHeader title="Calificaciones" subtitle="A continuación se muestran las calificaciones de los alumnos en las distintas evaluaciones. En caso de ser profesor, podrá calificar y editar las calificaciones pulsando sobre el icono del lápiz que se muestra en cada calificación." />

            <Stack justifyContent="center" alignItems="center" sx={{ my: 3 }}>
                <PersonalizedTable head={tableHead} rows={rows} />
            </Stack>

            <EditCalification
                show={showEditCalificationModal}
                onClose={() => setShowEditCalificationModal(false)}
                studentAddress={studentAddress}
                evId={evSelected}
            />
        </>
    );
}

export default CalificationsScreen;
