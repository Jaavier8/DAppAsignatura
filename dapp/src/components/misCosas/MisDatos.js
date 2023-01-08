import {drizzleReactHooks} from '@drizzle/react-plugin'

const {useDrizzle, useDrizzleState} = drizzleReactHooks;

const MisDatos = () => {
    const {useCacheCall} = useDrizzle();
    const drizzleState = useDrizzleState(state => state);

    const connected = drizzleState.accounts[0];
    const balance = drizzleState.accountBalances[connected];

    const isCoordinator = useCacheCall("Asignatura", "coordinador") === connected;
    const isOwner = useCacheCall("Asignatura", "owner") === connected;
    const isProfesor = useCacheCall("Asignatura", "datosProfesor", connected) !== "";
    const isAlumno = useCacheCall("Asignatura", "datosAlumno", connected)?.nombre !== "";

    let roles = [];

    if (isCoordinator) roles.push("Coordinador");
    if (isOwner) roles.push("Owner");
    if (isProfesor) roles.push("Profesor");
    if (isAlumno) roles.push("Alumno");

    const datos = useCacheCall("Asignatura", "quienSoy", {from: connected});

    return (
        <article className="AppMisDatos">
            <h3>Mis Datos</h3>
            <ul>
                <li>Nombre: <span style={{color: "blue"}}>{datos?._nombre || "No matriculado"}</span></li>
                <li>Email: <span style={{color: "blue"}}>{datos?._email || "No matriculado"}</span></li>
                <li>Dirección: <span style={{color: "blue"}}>{connected}</span></li>
                <li>Balance: <span style={{color: "blue"}}>{balance}</span> weis</li>
                <li>Roles: <span style={{color: "blue"}}>{roles.toString()}</span></li>
            </ul>
        </article>);
};

export default MisDatos;
