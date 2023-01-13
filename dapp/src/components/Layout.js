import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { drizzleReactHooks } from '@drizzle/react-plugin';
import { Context } from "./CreateContext";

import { useNavigate } from "react-router-dom";

import Header from "./Header";
import Navegacion from "./Navegacion";

function Layout() {
    let navigate = useNavigate();

    const { useDrizzleState, useDrizzle } = drizzleReactHooks;
    const { useCacheCall } = useDrizzle();

    const drizzleState = useDrizzleState(state => state);

    const connected = drizzleState.accounts[0];
    const owner = useCacheCall("Asignatura", "owner");
    const coordinator = useCacheCall("Asignatura", "coordinador");
    const profesor = useCacheCall("Asignatura", "datosProfesor", connected);
    const alumno = useCacheCall("Asignatura", "datosAlumno", connected);
    const cerrada = useCacheCall("Asignatura", "cerrada");

    const isOwner = owner === connected;
    const isCoordinator = coordinator === connected;
    const isProfesor = (profesor === undefined || profesor === "") ? false : true;
    const isAlumno = (alumno === undefined || alumno?.nombre === "") ? false : true;

    const balance = drizzleState.accountBalances[connected];

    useEffect(() => {
        if (cerrada)
            navigate("/closed");
    }, [cerrada, navigate]);

    let roles = [];

    if (isOwner) roles.push("Owner");
    if (isCoordinator) roles.push("Coordinador");
    if (isProfesor) roles.push("Profesor");
    if (isAlumno) roles.push("Alumno");

    const [showNavigation, setShowNavigation] = useState(true);

    if (cerrada) {
        return (
            <Context.Provider value={{ connected, isOwner, isCoordinator, isProfesor, isAlumno, balance, roles, cerrada }}>
                <Header onSetShowNavigation={() => setShowNavigation(current => !current)} />
                <Outlet />
            </Context.Provider>
        )
    } else {
        return (
            <Context.Provider value={{ connected, isOwner, isCoordinator, isProfesor, isAlumno, balance, roles, cerrada }}>
                <Header onSetShowNavigation={() => setShowNavigation(current => !current)} />
                {showNavigation && <Navegacion />}
                <Outlet />
            </Context.Provider>
        )
    }
}

export default Layout;

