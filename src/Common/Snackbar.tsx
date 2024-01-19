import React from 'react';
import { Dispatch, SetStateAction } from 'react';
import { Snackbar as SnackbarCustom } from '@mui/material';

interface ISnackbarProps {
  message: string;
  setError: Dispatch<SetStateAction<string>>;
}

function Snackbar({ message, setError }: ISnackbarProps) {
  const handleSnackbarClose = () => {
    setError('');
  };

  return (
    <SnackbarCustom
      open={!!message}
      autoHideDuration={4000}
      onClose={handleSnackbarClose}
      message={message}
    />
  );
}

export default Snackbar;
