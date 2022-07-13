import { useState } from 'react';
import { FormControlLabel, Checkbox, Dialog, Button, DialogActions, DialogTitle, DialogContent } from '@mui/material';

import { DialogTransition } from '../../../common/transitions';

export default function DeleteCardDialog(
  {
    deleteDialogOpen, 
    setDeleteDialogOpen,
    handleDeleteClickClose,
  }
  : {
    deleteDialogOpen: boolean, 
    setDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
    handleDeleteClickClose: (isDeleteAllCards: boolean) => void,
  }
) {

  const [isDeleteAllCards, setIsDeleteAllCards] = useState(false);

  return (
    <Dialog 
      TransitionComponent={DialogTransition}
      keepMounted
      open={deleteDialogOpen} 
      onClose={() => setDeleteDialogOpen(false)}
      PaperProps={{
          style: {
          // Cant use primary theme here for some reason
          backgroundColor: window.localStorage.getItem('mode') === 'light' ? "#94e2e4" : '#3e5641', // theme primary.light
          borderRadius: '10px',
          },
      }}
    >
      <DialogTitle
          sx={{ 
          fontFamily: 'Staatliches',
          color: 'text.secondary',
          }}
      >
          Are you sure?
      </DialogTitle>
      <DialogContent>
        <FormControlLabel
          control={
            <Checkbox 
              checked={isDeleteAllCards} 
              onChange={() => setIsDeleteAllCards(!isDeleteAllCards)} 
              color="info"
            />
          }
          sx={{ 
            fontFamily: 'Staatliches',
            color: 'text.secondary',
          }}
          label="Delete all cards in deck"
        />
      </DialogContent>
      <DialogActions>
          <Button 
              color="secondary"
              variant="contained"
              onClick={() => setDeleteDialogOpen(false)}
          >
              Cancel
          </Button>

          
          <Button 
              color="primary"
              variant="contained"
              onClick={() => handleDeleteClickClose(isDeleteAllCards)}
          >
              Delete Deck
          </Button>
          
      </DialogActions>
    </Dialog> 
  );
}