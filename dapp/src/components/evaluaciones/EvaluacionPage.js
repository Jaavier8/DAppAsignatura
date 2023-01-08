import { useState } from "react";

import EvaluacionesHead from "./EvaluacionesList/EvaluacionesHead";
import EvaluacionRow from "./EvaluacionesList/EvaluacionRow";

import { drizzleReactHooks } from '@drizzle/react-plugin'

import { useParams, Link } from "react-router-dom";

const { useDrizzle, useDrizzleState } = drizzleReactHooks;

function EvaluacionPage() {
    const { useCacheCall, useCacheSend } = useDrizzle();

    let { id } = useParams();

    const drizzleState = useDrizzleState(state => state);
    const connected = drizzleState.accounts[0];
    const coordinator = useCacheCall("Asignatura", "coordinador");

    const { send, status } = useCacheSend('Asignatura', 'editaEvaluacion');

    let [name, setName] = useState("");
    let [date, setDate] = useState("");
    let [percentage, setPercentage] = useState(0);
    let [minimum, setMinimum] = useState(0);

    return (
        <section className="AppEvaluaciones">
            <h2>Evaluacion</h2>

            <table>
                <EvaluacionesHead />
                <tbody>
                    <EvaluacionRow key={"eb-" + id} evaluacionIndex={id} />
                </tbody>
            </table>

            ----------------------------------

            {connected === coordinator ?
                <form>
                    <p>

                        Nombre de la evaluación:  &nbsp;
                        <input key="nombre" type="text" name="nombre" value={name} placeholder="Nombre de la evaluación"
                            onChange={ev => setName(ev.target.value)} />
                    </p>
                    <p>
                        Fecha de la evaluación:  &nbsp;
                        <input key="fecha" type="date" name="fecha" value={date} placeholder="Fecha de la evaluación"
                            onChange={ev => setDate(ev.target.value)} />
                    </p>
                    <p>
                        Porcentaje:  &nbsp;
                        <input key="porcentage" type="number" name="porcentage" value={percentage} placeholder="Porcentaje"
                            onChange={ev => setPercentage(ev.target.value)} />
                    </p>
                    <p>
                        Minimo:  &nbsp;
                        <input key="minimo" type="number" name="minimo" value={minimum} placeholder="Mínimo"
                            onChange={ev => setMinimum(ev.target.value)} />
                    </p>

                    <button key="submit" className="pure-button" type="button"
                        onClick={ev => {
                            ev.preventDefault();
                            send(id, name, new Date(date).getTime(), percentage, minimum);
                        }}>Editar evaluación</button>

                    <p> Último estado = {status}</p>

                </form>
                : null}

            ----------------------------------

            <Link to={`/evaluaciones`}>Volver</Link>

        </section>
    );

}


export default EvaluacionPage;
