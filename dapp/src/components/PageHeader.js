import { Stack, Typography, Divider } from "@mui/material";

function PageHeader({ title, subtitle, modal }) {

    return <>
        <Stack justifyContent="center" alignItems={modal ? "center" : ""} sx={{ my: 3, mx: 5 }}>
            <Typography variant="h4" gutterBottom>
                {title}
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
                {subtitle}
            </Typography>
        </Stack>

        <Divider />
    </>
}

export default PageHeader;
