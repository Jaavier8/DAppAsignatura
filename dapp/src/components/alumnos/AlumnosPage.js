import { useState } from "react";

import AlumnosList from "./AlumnosList";

import { drizzleReactHooks } from '@drizzle/react-plugin'

const { useDrizzle, useDrizzleState } = drizzleReactHooks;

function AlumnosPage() {
    const { useCacheCall, useCacheSend } = useDrizzle();

    const drizzleState = useDrizzleState(state => state);
    const connected = drizzleState.accounts[0];

    const isCoordinator = useCacheCall("Asignatura", "coordinador") === connected;
    const isOwner = useCacheCall("Asignatura", "owner") === connected;
    const isProfesor = useCacheCall("Asignatura", "datosProfesor", connected) !== "";

    const automatricula = useCacheSend('Asignatura', 'automatricula');
    const matricular = useCacheSend('Asignatura', 'matricular');

    let [direction, setDirection] = useState("");
    let [name, setName] = useState("");
    let [dni, setDni] = useState("");
    let [email, setEmail] = useState("");

    return (
        <section className="AppAlumnos">
            <h2>Alumnos</h2>

            {(isCoordinator || isOwner || isProfesor) ?
                <AlumnosList />
                :
                <form>
                    <p>

                        Nombre alumno:  &nbsp;
                        <input key="nombre" type="text" name="nombre" value={name} placeholder="Nombre alumno"
                            onChange={ev => setName(ev.target.value)} />
                    </p>
                    <p>
                        DNI:  &nbsp;
                        <input key="dni" type="text" name="dni" value={dni} placeholder="DNI"
                            onChange={ev => setDni(ev.target.value)} />
                    </p>
                    <p>
                        Email:  &nbsp;
                        <input key="email" type="text" name="email" value={email} placeholder="Email"
                            onChange={ev => setEmail(ev.target.value)} />
                    </p>

                    <button key="submit" className="pure-button" type="button"
                        onClick={ev => {
                            ev.preventDefault();
                            automatricula.send(name, dni, email);
                        }}>Matricularme</button>

                    <p> Último estado = {automatricula.status}</p>

                </form>
            }

            ----------------------------------

            {isOwner ?
                <form>
                    <p>
                        Dirección alumno:  &nbsp;
                        <input key="direccion" type="text" name="direccion" value={direction} placeholder="Dirección alumno"
                            onChange={ev => setDirection(ev.target.value)} />
                    </p>
                    <p>
                        Nombre alumno:  &nbsp;
                        <input key="nombre" type="text" name="nombre" value={name} placeholder="Nombre alumno"
                            onChange={ev => setName(ev.target.value)} />
                    </p>
                    <p>
                        DNI:  &nbsp;
                        <input key="dni" type="text" name="dni" value={dni} placeholder="DNI"
                            onChange={ev => setDni(ev.target.value)} />
                    </p>
                    <p>
                        Email:  &nbsp;
                        <input key="email" type="text" name="email" value={email} placeholder="Email"
                            onChange={ev => setEmail(ev.target.value)} />
                    </p>

                    <button key="submit" className="pure-button" type="button"
                        onClick={ev => {
                            ev.preventDefault();
                            matricular.send(direction, name, dni, email);
                        }}>Matricular alumno</button>

                    <p> Último estado = {matricular.status}</p>

                </form>
                : null
            }

        </section>
    );
}

export default AlumnosPage;
