import { useEffect } from "react";

import { Button, Stack } from "@mui/material";

import { Link, useNavigate } from "react-router-dom";

import PageHeader from "../components/PageHeader";

function NoMatchScreen() {
    let navigate = useNavigate();

    useEffect(() => {
        let tid = setTimeout(() => void navigate("/"),
            5000);
        return () => void clearTimeout(tid);
    });

    return (
        <>

            <PageHeader title="Página no encontrada" subtitle="" modal={true} />

            <Stack justifyContent="center" alignItems="center" sx={{ my: 3 }}>
                <Button variant="contained" component={Link} to={`/`} sx={{ mt: 2 }}>Volver a la página principal</Button>
            </Stack>

        </>
    );
}

export default NoMatchScreen;
