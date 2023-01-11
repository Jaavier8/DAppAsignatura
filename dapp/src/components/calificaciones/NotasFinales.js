import { useState } from "react";
import { drizzleReactHooks } from '@drizzle/react-plugin'

const { useDrizzle, useDrizzleState } = drizzleReactHooks;

const NotasAlumno = () => {

    const { useCacheCall } = useDrizzle();
    const drizzleState = useDrizzleState(state => state);

    const connected = drizzleState.accounts[0];


    let thead = [];
    thead.push(<th key={"chae"}>ALumno</th>);
    thead.push(<th key={"chn"}>Calificación Final</th>);

    const el = useCacheCall("Asignatura", "matriculasLength") || 0;

    let cells = useCacheCall(['Asignatura'], call => {
        let cells = [];

        for (let i = 0; i < el; i++) {
            const addr = call("Asignatura", "matriculas", i);
            const datos = addr && call("Asignatura", "datosAlumno", addr);

            const nota = addr && call("Asignatura", "notaFinal", connected);

            cells.push(
                <tr key={"d" + i}>
                    <td>{datos?.nombre}</td>
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
            <h2>Calificaciones Finales</h2>

            <table>
                <thead><tr>{thead}</tr></thead>
                <tbody>{cells}</tbody>
            </table>

        </section>
    );

};

export default NotasAlumno;
