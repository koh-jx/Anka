import React, { useState, useEffect } from 'react';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

import { DialogTransition } from '../../../common/transitions';
import { DeckType } from '../../../common/types';
import Textfield from '../../Textfield';

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

  const MAX_CHARS = 16;
  const [name, setName] =useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [numCharsLeft, setNumCharsLeft] = useState(MAX_CHARS);
  
  useEffect(() => {
    if (editObject) {
      setName(editObject.name);
      setNumCharsLeft(MAX_CHARS - editObject.name.length);
    } else {
      setNumCharsLeft(MAX_CHARS);
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
      if (editObject) editDeck();
      else addDeck();
    }
  }

  const handleNameChange = (name: string) => {
    if (name.length <= MAX_CHARS) {
      setName(name);
      setNumCharsLeft(MAX_CHARS - name.length);
    }
  }

  return (
    <>
      <Dialog 
        TransitionComponent={DialogTransition}
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
          <Textfield value={name} setValue={handleNameChange} label="Name" onKeyDown={keyPressSubmit}/>
          <DialogContentText>
            {numCharsLeft} {numCharsLeft === 1 ? "character" : "characters"} left
          </DialogContentText>
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