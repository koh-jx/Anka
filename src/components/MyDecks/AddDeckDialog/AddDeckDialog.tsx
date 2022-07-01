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
    editObject,
    setEditObject,
    editHandleClose,
  }
  : {
    dialogOpen: boolean, 
    handleClose: (toAdd : DeckType | null) => void,
    editObject: DeckType | null,
    setEditObject: (cardToEdit : DeckType | null) => void,
    editHandleClose: (toEdit : DeckType | null) => void,
  }
) {

  const [name, setName] = React.useState('');
  const [showAlert, setShowAlert] = React.useState(false);
  
  useEffect(() => {
    if (editObject) {
      setName(editObject.name);
    }
  }
  , [editObject, dialogOpen]);

  const createDeckInfo = () : DeckType => {
    return {
      id: editObject?.id || '',
      name,
      cards: editObject?.cards || [],
    }
  }

  const addDeck = () => {
    if (name.length === 0) {
      setShowAlert(true);
      return;
    }
    const result = createDeckInfo();
    handleClose(result);
    resetDialog();
  }

  const editDeck = () => {
    if (name.length === 0) {
      setShowAlert(true);
      return;
    }
    const result = createDeckInfo();
    editHandleClose(result);
    resetDialog();
  }

  const resetDialog = () => {
    setName("")
    setShowAlert(false);
  }

  const cancelAdd = () => {
    resetDialog();
    setEditObject(null);
    handleClose(null);
  }

  const keyPressSubmit = (e: any) => {
    if(e.keyCode === 13){
      addDeck();
    }
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
          {editObject ? "Edit Deck" : "Create new Deck"}
        </DialogTitle>
        <DialogContent>
          <Textfield value={name} setValue={setName} label="Name" onKeyDown={keyPressSubmit}/>
          {showAlert && (
            <Alert severity="error">Title cannot be empty!</Alert>
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
            onClick={() => editObject ? editDeck() : addDeck()}
          >
            {editObject ? "Edit" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}