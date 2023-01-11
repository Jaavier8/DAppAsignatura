import { useState } from "react";
import { drizzleReactHooks } from '@drizzle/react-plugin'

const { useDrizzle, useDrizzleState } = drizzleReactHooks;

const NotasAlumno = () => {

    const { useCacheCall } = useDrizzle();
    const drizzleState = useDrizzleState(state => state);

    const connected = drizzleState.accounts[0];


    let thead = [];
    thead.push(<th key={"chae"}>Evaluación</th>);
    thead.push(<th key={"chn"}>Calificación</th>);

    let cells = useCacheCall(['Asignatura'], call => {
        let cells = [];
        const el = call("Asignatura", "evaluacionesLength") || 0;

        for (let i = 0; i < el; i++) {
            const nota = call("Asignatura", "calificacionesAlumno", connected, i);
            cells.push(
                <tr key={"d" + i}>
                    <td>E<sub>{i}</sub></td>
                    <td key={"p2-" + i}>
                        {nota?.tipo === "0" ? "Sin nota" : ""}
                        {nota?.tipo === "1" ? "N.P." : ""}
                        {nota?.tipo === "2" ? (nota?.calificacion / 100).toFixed(2) : ""}
                    </td>
                </tr>
            );
        }
        return cells;
    });

    return (
        <section className="AppCalificaciones">
            <h2>Mis calificaciones</h2>

            <table>
                <thead><tr>{thead}</tr></thead>
                <tbody>{cells}</tbody>
            </table>

        </section>
    );

};

export default NotasAlumno;
