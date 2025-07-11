import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
    // CircularProgress,
    // Tooltip
} from "@mui/material";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTransaction } from "../repositories/TransactionRepository";
// import toast from "react-hot-toast";
import { useState } from "react";
import toast from "react-hot-toast";

function TransactionButton({ product, userId }) {
    const [open, setOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [message, setMessage] = useState("");

    const handleRequest = async () => {
    try {
        await createTransaction({
            product_id: product.id,
            buyer_id: userId,
            seller_id: product.user.id,
            quantity: quantity,
            message: message,
        });

        setOpen(false);
        // Success toast
        toast.success('Request sent successfully!');
        setQuantity(1);
        setMessage("");
        
    } catch (error) {
        console.error("Error creating Request:", error);
        // Error toast
        toast.error(`Failed to send request: ${error.message}`);
        
    }
};

    return (
        <>
            <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={() => setOpen(true)}
                sx={{
                    fontSize: { xs: "0.875rem", md: "1rem" },
                    padding: { xs: 1, md: 2 },
                }}
            >
                Request to Buy
            </Button>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Request to Buy {product.name}</DialogTitle>
                <DialogContent>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        Price: ${product.final_price} each
                    </Typography>

                    <TextField
                        label="Quantity"
                        type="number"
                        fullWidth
                        value={quantity}
                        onChange={(e) => {
                            const value = Math.max(
                                1,
                                parseInt(e.target.value) || 1
                            );
                            setQuantity(value);
                        }}
                        inputProps={{ min: 1, max: product.quantity_available }}
                        sx={{ mb: 2 }}
                    />

                    <Typography variant="body1" sx={{ mb: 2 }}>
                        Total: ${(product.price * quantity).toFixed(2)}
                    </Typography>

                    <TextField
                        label="Message to Seller (Optional)"
                        multiline
                        rows={4}
                        fullWidth
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleRequest} color="primary">
                        Send Request
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default TransactionButton;
