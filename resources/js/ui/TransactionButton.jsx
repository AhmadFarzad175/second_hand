import { 
  Button, 
  CircularProgress, 
  Tooltip,
  Snackbar,
  Alert
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTransaction } from "../repositories/TransactionRepository";
import { useState } from "react";

function TransactionButton({ product, userId }) {
  const queryClient = useQueryClient();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' // 'success', 'error', 'warning', 'info'
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries(['productDetails', product.id]);
      setSnackbar({
        open: true,
        message: 'Transaction created successfully',
        severity: 'success'
      });
    },
    onError: (error) => {
      setSnackbar({
        open: true,
        message: error.message || 'Failed to create transaction',
        severity: 'error'
      });
    }
  });

  const handleCreateTransaction = () => {
    if (!userId) {
      setSnackbar({
        open: true,
        message: 'You need to login first',
        severity: 'warning'
      });
      return;
    }

    mutate({
      product_id: product.id,
      buyer_id: userId,
      seller_id: product.user.id,
      quantity: 1 // Default to 1, can be made dynamic
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <>
      <Tooltip title={product.stock <= 0 ? "Product is out of stock" : ""}>
        <span>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={isPending || product.stock <= 0}
            onClick={handleCreateTransaction}
            sx={{
              mt: 2,
              fontSize: { xs: "0.875rem", md: "1rem" },
              padding: { xs: 1, md: 2 },
            }}
          >
            {isPending ? (
              <CircularProgress size={24} />
            ) : product.stock <= 0 ? (
              "Out of Stock"
            ) : (
              "Request to Buy"
            )}
          </Button>
        </span>
      </Tooltip>

      {/* Snackbar (Toast) */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default TransactionButton;