import { useState } from "react";

import CalificacionesTotal from "./CalificacionesTotal";
import Calificar from "./Calificar";

const CalificacionesPage = () => {

    let [studentDirection, setStudentDirection] = useState("");
    let [evIndex, setEvIndex] = useState("");

    return (
        <section className="AppCalificaciones">
            <h2>Calificaciones</h2>

            <CalificacionesTotal onSetStudentDirection={(direction) => setStudentDirection(direction)} onSetEvIndex={(index) => setEvIndex(index)} />

            <Calificar studentDirection={studentDirection} evIndex={evIndex} />
        </section>
    );
};

export default CalificacionesPage;
