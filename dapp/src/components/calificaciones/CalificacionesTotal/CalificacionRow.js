import { drizzleReactHooks } from '@drizzle/react-plugin'

const { useDrizzle } = drizzleReactHooks;

const CalificacionRow = (props) => {
    const { useCacheCall } = useDrizzle();

    const alumnoAddr = useCacheCall("Asignatura", "matriculas", props.alumnoIndex);

    let alumnoName = useCacheCall(['Asignatura'],
        call => alumnoAddr && call("Asignatura", "datosAlumno", alumnoAddr)?.nombre
    );

    let cells = useCacheCall(['Asignatura'], call => {
        if (!alumnoAddr) { return []; }

        let cells = [];
        const evaluacionesLength = call("Asignatura", "evaluacionesLength") || 0;
        for (let ei = 0; ei < evaluacionesLength; ei++) {
            const nota = call("Asignatura", "calificacionesAlumno", alumnoAddr, ei);
            cells.push(
                <td key={"p2-" + props.alumnoIndex + "-" + ei}>
                    <button key="submit" className="pure-button" type="button"
                        onClick={ev => {
                            ev.preventDefault();
                            props.onSetStudentDirection(alumnoAddr);
                            props.onSetEvIndex(ei);
                        }}>
                        {nota?.tipo === "0" ? "Calificar" : ""}
                        {nota?.tipo === "1" ? "N.P." : ""}
                        {nota?.tipo === "2" ? (nota?.calificacion / 100).toFixed(2) : ""}
                    </button>
                </td>
            );
        }
        return cells;
    });

    return <tr key={"d" + props.alumnoIndex}>
        <th>A<sub>{props.alumnoIndex}</sub></th>
        <td>{alumnoName}</td>
        {cells}
    </tr>;
};

export default CalificacionRow;
