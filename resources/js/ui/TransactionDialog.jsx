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
  Snackbar,
  Alert
} from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { 
  getPendingTransactions,
  updateTransactionStatus
} from '../repositories/TransactionRepository';
import { useState } from 'react';

function TransactionDialog({ open, onClose, userId }) {
  const queryClient = useQueryClient();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' // 'success', 'error', 'warning', 'info'
  });
  
  const { data: transactions, isLoading } = useQuery({
    queryKey: ['pendingTransactions', userId],
    queryFn: () => getPendingTransactions(userId),
    enabled: open && !!userId
  });

  const { mutate: updateStatus, isPending } = useMutation({
    mutationFn: ({ id, status }) => updateTransactionStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries(['pendingTransactions', userId]);
      setSnackbar({
        open: true,
        message: 'Transaction updated successfully',
        severity: 'success'
      });
    },
    onError: (error) => {
      setSnackbar({
        open: true,
        message: error.message || 'Failed to update transaction',
        severity: 'error'
      });
    }
  });

  const handleApprove = (transactionId) => {
    updateStatus({ id: transactionId, status: 'completed' });
  };

  const handleReject = (transactionId) => {
    updateStatus({ id: transactionId, status: 'cancelled' });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Pending Transactions</DialogTitle>
        <DialogContent>
          {isLoading ? (
            <CircularProgress />
          ) : transactions?.length ? (
            <List>
              {transactions.map(transaction => (
                <div key={transaction.id}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar src={transaction.buyer.image} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={transaction.buyer.name}
                      secondary={
                        <>
                          <Typography component="span" variant="body2">
                            {transaction.product.name}
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
                        onClick={() => handleApprove(transaction.id)}
                      >
                        Approve
                      </Button>
                      <Button 
                        size="small" 
                        variant="outlined" 
                        color="error"
                        disabled={isPending}
                        onClick={() => handleReject(transaction.id)}
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

export default TransactionDialog;