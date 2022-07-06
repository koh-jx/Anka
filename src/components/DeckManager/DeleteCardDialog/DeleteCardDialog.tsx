import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

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
    handleDeleteClickClose: (isHardDelete: boolean) => void,
  }
) {

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
          u sure u wan delete ah
      </DialogTitle>
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
              onClick={() => handleDeleteClickClose(false)}
          >
              Delete from Deck
          </Button>
          <Button 
              color="primary"
              variant="contained"
              onClick={() => handleDeleteClickClose(true)}
          >
              Wipe Card from Existence
          </Button>
      </DialogActions>
    </Dialog> 
  );
}