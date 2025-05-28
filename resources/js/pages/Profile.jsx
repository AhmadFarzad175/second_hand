import UserDetails from "../ui/UserDetails"
import WebsiteHeading from "../ui/WebsiteHeading"
import ShowUser from "../features/user/ShowUser"

function Profile() {
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
                        {/* <UserDetails
                        userId={userId}
                         /> No userId passed - fetches current user */}
                         <ShowUser />
        </>
    )
}

export default Profile
