import { drizzleReactHooks } from '@drizzle/react-plugin'

import { useParams } from "react-router-dom";

const { useDrizzle } = drizzleReactHooks;

const CalificacionRow = ({ alumnoIndex }) => {
    const { useCacheCall } = useDrizzle();

    let { id } = useParams();

    const alumnoAddr = useCacheCall("Asignatura", "matriculas", alumnoIndex);

    let alumnoName = useCacheCall(['Asignatura'],
        call => alumnoAddr && call("Asignatura", "datosAlumno", alumnoAddr)?.nombre
    );

    let cells = useCacheCall(['Asignatura'], call => {
        if (!alumnoAddr) { return []; }

        const nota = call("Asignatura", "calificacionesEvaluacion", id, alumnoAddr);
        return (
            <td key={"p2-" + alumnoIndex}>
                {nota?.tipo === "0" ? "" : ""}
                {nota?.tipo === "1" ? "N.P." : ""}
                {nota?.tipo === "2" ? (nota?.calificacion / 100).toFixed(2) : ""}
            </td>
        );
    });

    return <tr key={"d" + alumnoIndex}>
        <td>{alumnoName}</td>
        {cells}
    </tr>;
};

export default CalificacionRow;
