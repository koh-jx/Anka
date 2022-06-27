import React, { useEffect } from 'react';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { useSnackbar } from 'notistack';
import { Fragment } from 'react';

import { DeckType } from '../MyDecks';
import Textfield from '../../Textfield';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function AddDeckDialog(
  {
    dialogOpen, 
    handleClose, 
    undo,
  }
  : {
    dialogOpen: boolean, 
    handleClose: (toAdd : DeckType | null) => void,
    undo: (cardToRemove : DeckType) => void
  }
) {

  const [name, setName] = React.useState('');
  const [showAlert, setShowAlert] = React.useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  
  // useEffect(() => {
  //   if (editObject) {
  //     setTitle(editObject.frontCardFaceProps.frontTitle);
  //   }
  // }
  // , [editObject, dialogOpen]);

  const createDeckInfo = () : DeckType => {
    return {
      id: '',
      name,
      cards: []
    }
  }
  const addDeck = () => {
    if (name.length === 0) {
      setShowAlert(true);
      return;
    }
    
    const result = createDeckInfo();

    const action = (key: any) => (
      <Fragment>
          <Button 
            sx={{color: "white"}}
            onClick={() => {
              undo(result);
              closeSnackbar(key);
            }}
          >
              Undo
          </Button>
          <Button 
            sx={{color: "white"}}
            onClick={() => { closeSnackbar(key) }}
          >
              Dismiss
          </Button>
      </Fragment>
    );

    handleClose(result);
    enqueueSnackbar('Deck created!', { 
      variant: 'success',
      autoHideDuration: 3000,
      action
    });
    resetDialog();
  }

  // const editCard = () => {
  //   const result = createCardInfo();

  //   const action = (key: any) => (
  //     <Fragment>
  //         <Button 
  //           sx={{color: "white"}}
  //           onClick={() => {
  //             editUndo(result);
  //             closeSnackbar(key);
  //           }}
  //         >
  //             Undo
  //         </Button>
  //         <Button 
  //           sx={{color: "white"}}
  //           onClick={() => { closeSnackbar(key) }}
  //         >
  //             Dismiss
  //         </Button>
  //     </Fragment>
  //   );

  //   editHandleClose(result);
  //   enqueueSnackbar('Flashcard edited!', { 
  //     variant: 'info',
  //     autoHideDuration: 3000,
  //     action
  //   });
  //   resetDialog();
  // }

  const resetDialog = () => {
    setName("")
    setShowAlert(false);
  }

  const cancelAdd = () => {
    resetDialog();
    // setEditObject(null);
    handleClose(null);
  }

  return (
    <>
      <Dialog 
        TransitionComponent={Transition}
        keepMounted
        open={dialogOpen} 
        onClose={() => null}  // Prevent closing on clicking outside dialog
        PaperProps={{
          style: {
            // Cant use primary theme here for some reason
            backgroundColor: window.localStorage.getItem('mode') === 'light' ? "#94e2e4" : '#3e5641', // theme primary.light
            borderRadius: '10px',
            minWidth: '30%',
          },
        }}
      >
        <DialogTitle
          sx={{ 
            fontFamily: 'Staatliches',
            color: 'text.secondary',
          }}
        >
          {/* {editObject ? "Edit Flashcard" : "Create new Flashcard"} */}
          Create New Deck
        </DialogTitle>
        <DialogContent>
          <Textfield value={name} setValue={setName} label="Name"/>
          {showAlert && (
            <Alert severity="error">"Title cannot be empty!"</Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button 
            color="secondary"
            variant="contained"
            onClick={cancelAdd}
          >
            Cancel
          </Button>

          <Button 
            color="primary"
            variant="contained"
            // onClick={() => editObject ? editCard() : addCard()}
            onClick={addDeck}
          >
            {/* {editObject ? "Edit" : "Create"} */}
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}