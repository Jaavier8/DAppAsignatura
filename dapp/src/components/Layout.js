import { useState } from "react";
import { Outlet } from "react-router-dom";
import { drizzleReactHooks } from '@drizzle/react-plugin';
import { Context } from "./CreateContext";

import Header from "./Header";
import Navegacion from "./Navegacion";

function Layout() {

    const { useDrizzleState, useDrizzle } = drizzleReactHooks;
    const { useCacheCall } = useDrizzle();
    
    const drizzleState = useDrizzleState(state => state);
    
    const connected = drizzleState.accounts[0];
    const isOwner = useCacheCall("Asignatura", "owner") === connected;
    const isCoordinator = useCacheCall("Asignatura", "coordinador") === connected;
    const isProfesor = useCacheCall("Asignatura", "datosProfesor", connected) !== "";
    const isAlumno = useCacheCall("Asignatura", "datosAlumno", connected)?.nombre !== "";
    
    let roles = [];

    if (isOwner) roles.push("Owner");
    if (isCoordinator) roles.push("Coordinador");
    if (isProfesor) roles.push("Profesor");
    if (isAlumno) roles.push("Alumno");

    const [showNavigation, setShowNavigation] = useState(true);

    return (
        <Context.Provider value={{ connected, isOwner, isCoordinator, isProfesor, isAlumno, roles }}>
            <Header onSetShowNavigation={() => setShowNavigation(current => !current)}/>
            {showNavigation && <Navegacion />}
            <Outlet />
        </Context.Provider>
    );
}

export default Layout;

