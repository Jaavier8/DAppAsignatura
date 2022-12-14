import CalificacionesHead from "./CalificacionesHead";
import CalificacionesBody from "./CalificacionesBody";

const CalificacionesPage = (props) => {

    return (
        <section className="AppCalificaciones">
            <h3>Todas las Calificaciones</h3>
            <table>
                <CalificacionesHead />
                <CalificacionesBody onSetStudentDirection={props.onSetStudentDirection} onSetEvIndex={props.onSetEvIndex}/>
            </table>
        </section>
    );
};

export default CalificacionesPage;
