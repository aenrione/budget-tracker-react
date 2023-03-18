import * as NavigationService from '../navigation/navigationService';

export const changeTransaction = ({ transaction_id }) => {
  return (dispatch) => {
    dispatch({
      type: 'CHANGE_TRANSACTION',
      payload: transaction_id,
    });

    NavigationService.navigate('Transaction');
  };
};

export const setQueryClient = (client) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_QUERY_CLIENT',
      payload: client,
    });
  };
};
