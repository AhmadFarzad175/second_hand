// src/pages/users/CreateWebsiteUser.jsx
import { useNavigate, useLocation } from "react-router-dom";

import UserForm from "../ui/UserForm";
import { useCreateUser } from "../features/user/useCreateUser";
import { useUpdateUser } from "../features/user/useUpdateUser";
import WebsiteHeading from "../ui/WebsiteHeading";

export default function CreateWebsiteUser() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { id: editId, ...editValues } = state?.user || {};
    const isEditSession = Boolean(editId);
    console.log("stat", state?.user);

    const { isCreating, createUser } = useCreateUser();
    const { isUpdating, updateUser } = useUpdateUser();
    const isWorking = isCreating || isUpdating;

    const handleSubmit = (formData) => {
        if (isEditSession) {
            updateUser(
                { formData, id: editId },
                {
                    onSuccess: () => {
                        navigate("/profile");
                    },
                }
            );
        } else {
            createUser(formData, {
                onSuccess: () => {
                    navigate("/login");
                },
            });
        }
    };

    const handleCancel = () => {
        navigate(-1); // Go back to previous page
    };

    return (
        <>
            <WebsiteHeading
                title="Register Yourself"
                subtitle="Please fill all the blanks."
                // Optional props (defaults shown):
                // align="center"
                // gradient={true}
                // divider={true}
                // titleVariant="h2"
                // subtitleVariant="subtitle1"
                sx={{ py: 4 }} // Custom spacing
            />{" "}
            <UserForm
                isEditSession={isEditSession}
                editValues={editValues}
                onSubmit={handleSubmit}
                isWorking={isWorking}
                onCancel={handleCancel}
                adminMode={false}
            />
        </>
    );
}
