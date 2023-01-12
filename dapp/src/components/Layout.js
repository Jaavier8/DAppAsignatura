import { useState } from "react";

import { Outlet } from "react-router-dom";

import Header from "./Header";
import Navegacion from "./Navegacion";

function Layout() {

    const [showNavigation, setShowNavigation] = useState(true);

    return (
        <>
            <Header onSetShowNavigation={() => setShowNavigation(current => !current)}/>
            {showNavigation && <Navegacion />}
            <Outlet />
        </>
    );
}

export default Layout;

