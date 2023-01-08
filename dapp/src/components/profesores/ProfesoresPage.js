import { useState } from "react";

import ProfesoresList from "./ProfesoresList";

import { drizzleReactHooks } from '@drizzle/react-plugin'

const { useDrizzle, useDrizzleState } = drizzleReactHooks;

function ProfesoresPage() {
    const { useCacheCall, useCacheSend } = useDrizzle();

    const drizzleState = useDrizzleState(state => state);
    const connected = drizzleState.accounts[0];

    const isOwner = useCacheCall("Asignatura", "owner") === connected;

    const { send, status } = useCacheSend('Asignatura', 'addProfesor');

    let [direction, setDirection] = useState("");
    let [name, setName] = useState("");

    return (
        <section className="AppAlumnos">
            <h2>Profesores</h2>

            <ProfesoresList />

            ----------------------------------

            {isOwner ?
                <form>
                    <p>

                        Dirección del nuevo profesor:  &nbsp;
                        <input key="dirección" type="text" name="dirección" value={direction} placeholder="Dirección profesor"
                            onChange={ev => setDirection(ev.target.value)} />
                    </p>
                    <p>
                        NOmbre del nuevo profesor:  &nbsp;
                        <input key="nombre" type="text" name="nombre" value={name} placeholder="Nombre profesor"
                            onChange={ev => setName(ev.target.value)} />
                    </p>

                    <button key="submit" className="pure-button" type="button"
                        onClick={ev => {
                            ev.preventDefault();
                            send(direction, name);
                        }}>Añadir profesor</button>

                    <p> Último estado = {status}</p>

                </form>
                : null
            }
        </section>
    );
}

export default ProfesoresPage;
