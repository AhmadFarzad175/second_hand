// // src/components/Admin/ShowUser.jsx
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import UserDetails from '../../ui/UserDetails';
// // import { getUserById } from '../../features/user/useProfile';
// import { Box, CircularProgress, Button, Typography } from '@mui/material';

import { useParams } from "react-router-dom";
import UserDetails from "../../ui/UserDetails";
import { useProfile } from "./useProfile";
import WebsiteHeading from "../../ui/WebsiteHeading";
import { Alert, Box, CircularProgress } from "@mui/material";

// const ShowUser = () => {
//     // const { userId } = useParams();
//     // const [user, setUser] = useState(null);
//     // const [loading, setLoading] = useState(true);
//     // const [error, setError] = useState(null);

//     // useEffect(() => {
//     //     const fetchUser = async () => {
//     //         try {
//     //             const userData = await getUserById(userId);
//     //             if (!userData) {
//     //                 setError('User not found');
//     //             } else {
//     //                 setUser(userData);
//     //             }
//     //         } catch (err) {
//     //             setError('Failed to load user data');
//     //             console.error(err);
//     //         } finally {
//     //             setLoading(false);
//     //         }
//     //     };

//     //     fetchUser();
//     // }, [userId]);

//     if (loading) {
//         return (
//             <Box display="flex" justifyContent="center" mt={4}>
//                 <CircularProgress />
//             </Box>
//         );
//     }

//     if (error) {
//         return (
//             <Box p={3}>
//                 <Typography color="error">{error}</Typography>
//                 <Button href="/admin/users" variant="contained" sx={{ mt: 2 }}>
//                     Back to Users List
//                 </Button>
//             </Box>
//         );
//     }

//     return (
//         <div>
//             <UserDetails user={user} />

//             {/* Admin-specific actions */}
//             <Box mt={3} display="flex" gap={2} justifyContent="flex-end">
//                 <Button
//                     variant="contained"
//                     color="error"
//                     onClick={() => console.log('Delete user', user.id)}
//                 >
//                     Delete User
//                 </Button>
//                 <Button
//                     variant="outlined"
//                     onClick={() => console.log('Edit user', user.id)}
//                 >
//                     Edit User
//                 </Button>
//             </Box>
//         </div>
//     );
// };

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
