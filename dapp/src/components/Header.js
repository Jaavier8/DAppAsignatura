import React, { useContext } from "react";

import { drizzleReactHooks } from '@drizzle/react-plugin'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Stack } from "@mui/material";

import { Context } from "./CreateContext";

const { useDrizzle } = drizzleReactHooks;

const Header = ({ onSetShowNavigation }) => {
    const { useCacheCall } = useDrizzle();

    const context = useContext(Context);

    const nombre = useCacheCall("Asignatura", "nombre");
    const curso = useCacheCall("Asignatura", "curso");

    let roles = [];

    if (context.isCoordinator) roles.push("Coordinador");
    if (context.valueisOwner) roles.push("Owner");
    if (context.isProfesor) roles.push("Profesor");
    if (context.isAlumno) roles.push("Alumno");

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar sx={{ justifyContent: "space-between" }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: "100%" }}>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                onClick={() => onSetShowNavigation()}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h3" component="div" align="center" >
                                Asignatura Full: {nombre}-{curso}
                            </Typography>
                            <Stack alignItems="flex-end">
                                <Typography variant="subtitle1" component="div" align="center" >
                                    Conectado como:
                                </Typography>
                                <Typography variant="subtitle2" component="div" align="center" >
                                    {roles.toString()}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Toolbar>
                </AppBar>
            </Box>

        </>
    );
};

export default Header;
