
import { useParams } from "react-router-dom";
import UserDetails from "../../ui/UserDetails";
import { useProfile } from "./useProfile";
import WebsiteHeading from "../../ui/WebsiteHeading";
import { Alert, Box, CircularProgress } from "@mui/material";

// export default ShowUser;
function ShowUser() {
    const { id } = useParams();
    console.log("id ", id);
    const { user, isLoading, error } = useProfile(id);
    return (
        <>
            <WebsiteHeading
                title="Profile"
                subtitle="A summary of his/her Business"
                // Optional props (defaults shown):
                // align="center"
                //   gradient={true}
                // divider={true}
                // titleVariant="h2"
                // subtitleVariant="subtitle1"
                sx={{ py: 4 }} // Custom spacing
            />

            {isLoading && (
                <Box display="flex" justifyContent="center" mt={4}>
                    <CircularProgress />
                </Box>
            )}

            {error && <Alert severity="error">{error.message}</Alert>}
            <div>
                <UserDetails user={user} />
            </div>
        </>
    );
}

export default ShowUser;
