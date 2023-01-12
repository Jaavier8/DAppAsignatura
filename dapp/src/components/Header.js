import { useState } from "react";

import { drizzleReactHooks } from '@drizzle/react-plugin'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const { useDrizzle } = drizzleReactHooks;

const Header = (props) => {
    const { useCacheCall } = useDrizzle();

    const { onSetShowNavigation } = props;

    const nombre = useCacheCall("Asignatura", "nombre");
    const curso = useCacheCall("Asignatura", "curso");

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={() => onSetShowNavigation()}
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h3" component="div" align="center" sx={{ flexGrow: 1 }}>
                            Asignatura Full: {nombre}-{curso}
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>

        </>
    );
};

export default Header;
