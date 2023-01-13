import React, { useContext, useState } from "react";

import { drizzleReactHooks } from '@drizzle/react-plugin'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, Stack } from "@mui/material";

import { Context } from "./CreateContext";

import Automatricula from "./alumnos/Automatricula";

const { useDrizzle } = drizzleReactHooks;

const Header = ({ onSetShowNavigation }) => {
    const { useCacheCall } = useDrizzle();

    const context = useContext(Context);

    const nombre = useCacheCall("Asignatura", "nombre");
    const curso = useCacheCall("Asignatura", "curso");

    const [showAutomatriculaModal, setShowAutomatriculaModal] = useState(false);

    if (context.cerrada) {
        return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar sx={{ justifyContent: "space-between" }}>
                        <Stack direction="row" justifyContent="center" alignItems="center" sx={{ width: "100%" }}>
                            <Typography variant="h3" component="div" align="center" >
                                Asignatura Full: {nombre}-{curso}
                            </Typography>
                        </Stack>
                    </Toolbar>
                </AppBar>
            </Box>
        )
    } else {
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
                                    {context.roles.length === 0 ? <>
                                        <Button
                                            variant="contained"
                                            color="warning"
                                            onClick={() => setShowAutomatriculaModal(true)}
                                        >
                                            Automatricularme
                                        </Button>
                                    </> : <>
                                        <Typography variant="subtitle1" component="div" align="center" >
                                            Conectado como:
                                        </Typography>
                                        <Typography variant="subtitle2" component="div" align="center" >
                                            {context.roles.toString()}
                                        </Typography>
                                    </>}
                                </Stack>
                            </Stack>
                        </Toolbar>
                    </AppBar>
                </Box>

                <Automatricula
                    show={showAutomatriculaModal}
                    onClose={() => setShowAutomatriculaModal(false)}
                />
            </>
        )
    }

};

export default Header;
