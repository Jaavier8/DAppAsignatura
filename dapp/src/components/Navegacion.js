import { NavLink } from "react-router-dom";

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const Navegacion = () => {

    const f = ({ isActive }) => isActive ? "navlinkactive" : "";

    return <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{ height: '40px', backgroundColor: '#1F8CF8' }}>
        <NavLink to="/">
            <Typography variant="h6" color="black" sx={{ flexGrow: 1 }}>Home</Typography>
        </NavLink>
        <NavLink className={f} to="/evaluaciones/">
            <Typography variant="h6" color="black" sx={{ flexGrow: 1 }}>Evaluaciones</Typography>
        </NavLink>
        <NavLink className={f} to="/alumnos/">
            <Typography variant="h6" color="black" sx={{ flexGrow: 1 }}>Alumnos</Typography>
        </NavLink>
        <NavLink className={f} to="/profesores/">
            <Typography variant="h6" color="black" sx={{ flexGrow: 1 }}>Profesores</Typography>
        </NavLink>
        <NavLink className={f} to="/calificaciones/">
            <Typography variant="h6" color="black" sx={{ flexGrow: 1 }}>Calificaciones</Typography>
        </NavLink>
        <NavLink className={f} to="/miscosas/">
            <Typography variant="h6" color="black" sx={{ flexGrow: 1 }}>Mis Cosas</Typography>
        </NavLink>
        <NavLink className={f} to="/misnotas/">
            <Typography variant="h6" color="black" sx={{ flexGrow: 1 }}>Mis Notas</Typography>
        </NavLink>
        <NavLink className={f} to="/notasfinales/">
            <Typography variant="h6" color="black" sx={{ flexGrow: 1 }}>Notas Finales</Typography>
        </NavLink>
    </Stack>
};

export default Navegacion;
