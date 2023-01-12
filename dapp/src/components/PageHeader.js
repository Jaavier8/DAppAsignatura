import { Stack, Typography, Divider } from "@mui/material";

function PageHeader({ title, subtitle }) {

    return <>
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ my: 5 }}
        >
            <Stack>
                <Typography variant="h4" gutterBottom>
                    {title}
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                    {subtitle}
                </Typography>
            </Stack>
        </Stack>

        <Divider />
    </>
}

export default PageHeader;
