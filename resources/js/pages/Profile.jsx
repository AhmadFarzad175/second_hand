// import UserDetails from "../ui/UserDetails"
import WebsiteHeading from "../ui/WebsiteHeading";
// import ShowUser from "../features/user/ShowUser"

// function Profile() {
//     return (
//         <>
//             <WebsiteHeading
//                             title="Profile"
//                             subtitle="A summary of your Business"
//                             // Optional props (defaults shown):
//                             // align="center"
//                             //   gradient={true}
//                             // divider={true}
//                             // titleVariant="h2"
//                             // subtitleVariant="subtitle1"
//                             sx={{ py: 4 }} // Custom spacing
//                         />
//                         {/* <UserDetails
//                         userId={userId}
//                          /> No userId passed - fetches current user */}
//                          <ShowUser />
//         </>
//     )
// }

// export default Profile

// src/pages/Profile.js
import UserDetails from "../ui/UserDetails";
import { useProfile } from "../features/user/useProfile";
// import ProfileEditModal from './ProfileEditModal';
import { CircularProgress, Box, Alert } from "@mui/material";

const Profile = () => {
    const { user, isLoading, error } = useProfile();

    return (
        <>
            <WebsiteHeading
                title="Profile"
                subtitle="A summary of your Business"
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

            {!isLoading && !error && (
                <div>
                    <UserDetails user={user} isEditable={true} />
                </div>
            )}
        </>
    );
};

export default Profile;
