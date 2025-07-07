import { 
  Button, 
  CircularProgress, 
  Tooltip
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTransaction } from "../repositories/TransactionRepository";
import toast from "react-hot-toast";

function TransactionButton({ product, userId }) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries(['productDetails', product.id]);
      toast.success('Transaction created successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create transaction');
    }
  });

  const handleCreateTransaction = () => {
    if (!userId) {
      toast.warning('You need to login first');
      return;
    }

    mutate({
      product_id: product.id,
      buyer_id: userId,
      seller_id: product.user.id,
      quantity: 1 // Default to 1, can be made dynamic
    });
  };

  return (
    <Tooltip title={product.quantity <= 0 ? "Product is out of stock" : ""}>
      <span>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          disabled={isPending || product.quantity <= 0}
          onClick={handleCreateTransaction}
          sx={{
            mt: 2,
            fontSize: { xs: "0.875rem", md: "1rem" },
            padding: { xs: 1, md: 2 },
          }}
        >
          {isPending ? (
            <CircularProgress size={24} />
          ) : product.quantity <= 0 ? (
            "Out of Stock"
          ) : (
            "Request to Buy"
          )}
        </Button>
      </span>
    </Tooltip>
  );
}

export default TransactionButton;