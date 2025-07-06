// components/TransactionStatus.jsx
import { Button, Chip, CircularProgress, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getProductTransactions } from "../repositories/TransactionRepository";

function TransactionStatus({ productId, userId }) {
  const { data: transactions, isLoading } = useQuery({
    queryKey: ['productTransactions', productId],
    queryFn: () => getProductTransactions(productId),
    enabled: !!productId
  });

  if (isLoading) return <CircularProgress size={24} />;

  const userTransactions = transactions?.filter(
    t => t.buyer_id === userId || t.seller_id === userId
  );

  if (!userTransactions?.length) return null;

  return (
    <Stack spacing={1} sx={{ mt: 2, p: 2, bgcolor: 'background.paper', borderRadius: 2 }}>
      <Typography variant="subtitle1" fontWeight="bold">
        Your Transaction Status
      </Typography>
      {userTransactions.map(transaction => (
        <Stack key={transaction.id} direction="row" alignItems="center" spacing={2}>
          <Chip 
            label={transaction.status} 
            color={
              transaction.status === 'completed' ? 'success' : 
              transaction.status === 'cancelled' ? 'error' : 'primary'
            } 
          />
          <Typography variant="body2">
            Quantity: {transaction.quantity}
          </Typography>
          {transaction.seller_id === userId && transaction.status === 'pending' && (
            <Stack direction="row" spacing={1}>
              <Button size="small" variant="outlined" color="success">
                Approve
              </Button>
              <Button size="small" variant="outlined" color="error">
                Reject
              </Button>
            </Stack>
          )}
        </Stack>
      ))}
    </Stack>
  );
}

export default TransactionStatus;