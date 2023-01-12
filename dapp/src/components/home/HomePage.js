import { useContext } from "react";
import { useState } from "react";

import { drizzleReactHooks } from '@drizzle/react-plugin'

import { Context } from "../CreateContext";

const { useDrizzle, useDrizzleState } = drizzleReactHooks;

function HomePage() {
    const value = useContext(Context);

    const { useCacheCall, useCacheSend } = useDrizzle();
    const drizzleState = useDrizzleState(state => state);

    const setCoordinador = useCacheSend('Asignatura', 'setCoordinador');
    const statusCoord = setCoordinador.status;
    const setCoord = setCoordinador.send;

    const setAsigState = useCacheSend('Asignatura', 'cerrar');
    const statusState = setAsigState.status;
    const close = setAsigState.send;

    const owner = useCacheCall("Asignatura", "owner");
    const coordinator = useCacheCall("Asignatura", "coordinador");
    const estado = useCacheCall("Asignatura", "cerrada") ? "Cerrada" : "Abierta";

    const connected = drizzleState.accounts[0];

    let [coordinatorAddress, setCoordinatorAddress] = useState("");

    return (
        <div>
            <p>Página Home de la Asignatura</p>

            ----------------------------------

            <p>Owner - {owner}</p>
            <p>Coordinator - {coordinator}</p>
            <p>Estado asignatura - {estado}</p>

            ----------------------------------

            {connected === owner ?
                <form>
                    <p>
                        Dirección del nuevo Coordinador:  &nbsp;
                        <input key="coordinador" type="text" name="coordinador" value={coordinatorAddress} placeholder="Dirección del coordinador"
                            onChange={ev => setCoordinatorAddress(ev.target.value)} />
                    </p>

                    <button key="submit" className="pure-button" type="button"
                        onClick={ev => {
                            ev.preventDefault();
                            setCoord(coordinatorAddress);
                        }}>Cambiar coordinador</button>

                    <p> Último estado = {statusCoord}</p>

                </form>
                : null}

            ----------------------------------

            {connected === coordinator ?
                <form>
                    <button key="submit" className="pure-button" type="button"
                        onClick={ev => {
                            ev.preventDefault();
                            close();
                        }}>Cerrar</button>

                    <p> Último estado = {statusState}</p>

                </form>
                : null}

        </div>
    );
}

export default HomePage;
