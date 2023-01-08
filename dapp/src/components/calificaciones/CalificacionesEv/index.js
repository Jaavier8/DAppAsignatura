import CalificacionesHead from "./CalificacionesHead";
import CalificacionesBody from "./CalificacionesBody";

const CalificacionesEv = () => {

    return (
        <section className="AppCalificaciones">
            <h3>Todas las Calificaciones de la Evaluacion</h3>
            <table>
                <CalificacionesHead />
                <CalificacionesBody />
            </table>
        </section>
    );
};

export default CalificacionesEv;
