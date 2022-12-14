import { useState } from "react";

import EvaluacionesList from "./EvaluacionesList";

import { drizzleReactHooks } from '@drizzle/react-plugin'

const { useDrizzle, useDrizzleState } = drizzleReactHooks;

function EvaluacionesPage() {
    const { useCacheCall, useCacheSend } = useDrizzle();

    const drizzleState = useDrizzleState(state => state);
    const connected = drizzleState.accounts[0];
    const coordinator = useCacheCall("Asignatura", "coordinador");

    const { send, status } = useCacheSend('Asignatura', 'creaEvaluacion');

    let [name, setName] = useState("");
    let [date, setDate] = useState("");
    let [percentage, setPercentage] = useState(0);
    let [minimum, setMinimum] = useState(0);

    return (
        <section className="AppEvaluaciones">
            <h2>Evaluaciones</h2>

            <EvaluacionesList />

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
                            send(name, new Date(date).getTime(), percentage, minimum);
                        }}>Crear evaluación</button>

                    <p> Último estado = {status}</p>

                </form>
                : null}

            ----------------------------------



        </section>
    );

}


export default EvaluacionesPage;
