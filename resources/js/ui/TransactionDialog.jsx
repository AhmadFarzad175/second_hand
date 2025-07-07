import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Divider,
    CircularProgress,
    Typography,
    Stack,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    getPendingTransactions,
    updateTransactionStatus,
} from "../repositories/TransactionRepository";
import toast from "react-hot-toast";

function TransactionDialog({ open, onClose, userId }) {
    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery({
        queryKey: ["pendingTransactions", userId],
        queryFn: () => getPendingTransactions(userId),
        enabled: open && !!userId,
    });

    const transactions = data?.data || [];

    const { mutate: updateStatus, isPending } = useMutation({
        mutationFn: ({ id, status }) => updateTransactionStatus(id, status),
        onSuccess: () => {
            queryClient.invalidateQueries(["pendingTransactions", userId]);
            toast.success("Transaction updated successfully");
        },
        onError: (error) => {
            toast.error(error.message || "Failed to update transaction");
        },
    });

    const handleApprove = (transactionId) => {
        updateStatus({ id: transactionId, status: "completed" });
    };

    const handleReject = (transactionId) => {
        updateStatus({ id: transactionId, status: "cancelled" });
    };


    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Pending Transactions</DialogTitle>
            <DialogContent>
                {isLoading ? (
                    <CircularProgress />
                ) : transactions?.length ? (
                    <List>
                        {transactions.map((transaction) => (
                            <div key={transaction.id}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar src={transaction.buyer_image} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={transaction.buyer_name}
                                        secondary={
                                            <>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                >
                                                    {transaction.product_name}
                                                </Typography>
                                                <br />
                                                Quantity: {transaction.quantity}
                                            </>
                                        }
                                    />
                                    <Stack direction="row" spacing={1}>
                                        <Button
                                            size="small"
                                            variant="contained"
                                            color="success"
                                            disabled={isPending}
                                            onClick={() =>
                                                handleApprove(transaction.id)
                                            }
                                        >
                                            Approve
                                        </Button>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            color="error"
                                            disabled={isPending}
                                            onClick={() =>
                                                handleReject(transaction.id)
                                            }
                                        >
                                            Reject
                                        </Button>
                                    </Stack>
                                </ListItem>
                                <Divider />
                            </div>
                        ))}
                    </List>
                ) : (
                    <Typography variant="body1" align="center" sx={{ py: 4 }}>
                        No pending transactions
                    </Typography>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}

export default TransactionDialog;
