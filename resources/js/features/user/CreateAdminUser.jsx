// src/pages/admin/users/CreateAdminUser.jsx
import { useNavigate, useLocation } from "react-router-dom";
import { useCreateUser } from "./useCreateUser";
import { useUpdateUser } from "./useUpdateUser";
import UserForm from "../../ui/UserForm";

export default function CreateAdminUser() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { id: editId, ...editValues } = state?.user || {};
    const isEditSession = Boolean(editId);
    
    const { isCreating, createUser } = useCreateUser();
    const { isUpdating, updateUser } = useUpdateUser();
    const isWorking = isCreating || isUpdating;

    const handleSubmit = (formData) => {
        if (isEditSession) {
            updateUser(
                { formData, id: editId },
                {
                    onSuccess: () => {
                        navigate("/admin/users");
                    },
                }
            );
        } else {
            createUser(formData, {
                onSuccess: () => {
                    navigate("/admin/users");
                },
            });
        }
    };

    const handleCancel = () => {
        navigate("/admin/users");
    };

    return (
        <UserForm
            isEditSession={isEditSession}
            editValues={editValues}
            onSubmit={handleSubmit}
            isWorking={isWorking}
            onCancel={handleCancel}
            adminMode={true}
        />
    );
}