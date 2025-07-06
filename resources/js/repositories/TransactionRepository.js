import AxiosSetup from './AxiosSetup';

export const createTransaction = async (transactionData) => {
  try {
    const response = await AxiosSetup.post('/transactions', transactionData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to create transaction'
    );
  }
};

export const getProductTransactions = async (productId) => {
  try {
    const response = await AxiosSetup.get('/transactions', {
      params: { product_id: productId }
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to fetch transactions'
    );
  }
};

export const getPendingTransactions = async (userId) => {
  try {
    const response = await AxiosSetup.get('/transactions/pending', {
      params: { seller_id: userId }
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to fetch pending transactions'
    );
  }
};

export const updateTransactionStatus = async (transactionId, status) => {
  try {
    const response = await AxiosSetup.patch(
      `/transactions/${transactionId}/status`,
      { status }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to update transaction status'
    );
  }
};

export const deleteTransaction = async (transactionId) => {
  try {
    const response = await AxiosSetup.delete(`/transactions/${transactionId}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to delete transaction'
    );
  }
};