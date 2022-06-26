import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { useSnackbar } from 'notistack';
import { Fragment } from 'react';

import { CardType, CardFace, createCard } from '../../Card/CardFactory';
import Textfield from '../../Textfield';

import styles from './AddCardDialog.module.css';


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function AddCardDialog(
  {
    dialogOpen, 
    handleClose, 
    undo,
    editObject,
    setEditObject,
    editHandleClose,
    editUndo,
  }
  : {
    dialogOpen: boolean, 
    handleClose: (toAdd : CardType | null) => void,
    undo: (cardToRemove : CardType) => void
    editObject: CardType | null,
    setEditObject: (cardToEdit : CardType | null) => void,
    editHandleClose: (toEdit : CardType | null) => void,
    editUndo: (cardToUndo : CardType) => void,
  }
) {

  const [frontTitle, setFrontTitle] = React.useState('Front');
  const [frontDescription, setFrontDescription] = React.useState('');
  const [backTitle, setBackTitle] = React.useState('Back');
  const [backDescription, setBackDescription] = React.useState('');
  const [tags, setTags] = React.useState<string[]>([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    if (editObject) {
      setFrontTitle(editObject.frontCardFaceProps.frontTitle);
      setFrontDescription(editObject.frontCardFaceProps.frontDescription);
      setBackTitle(editObject.backCardFaceProps.backTitle);
      setBackDescription(editObject.backCardFaceProps.backDescription);
      setTags(editObject.tags);
    }
  }
  , [editObject, dialogOpen]);

  const createCardInfo = (id: string) : CardType => {
    return {
      id,               // Not yet initialised
      front: CardFace.WORD,
      back: CardFace.WORD,
      tags,
      frontCardFaceProps: {
        frontTitle,
        frontDescription,
      },
      backCardFaceProps: {
        backTitle,
        backDescription,
      }
    }
  }
  const addCard = () => {
    const result = createCardInfo("");

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
    enqueueSnackbar('Flashcard created!', { 
      variant: 'success',
      autoHideDuration: 3000,
      action
    });
    resetDialog();
  }

  const editCard = () => {
    const result = createCardInfo(editObject!.id);

    const action = (key: any) => (
      <Fragment>
          <Button 
            sx={{color: "white"}}
            onClick={() => {
              editUndo(result);
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

    editHandleClose(result);
    enqueueSnackbar('Flashcard edited!', { 
      variant: 'info',
      autoHideDuration: 3000,
      action
    });
    resetDialog();
  }

  const resetDialog = () => {
    setFrontTitle('Front');
    setFrontDescription('');
    setBackTitle('Back');
    setBackDescription('');
    setTags([]);
  }

  const cancelAdd = () => {
    resetDialog();
    setEditObject(null);
    handleClose(null);
  }

  return (
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
        },
      }}
    >
      <DialogTitle
        sx={{ 
          fontFamily: 'Staatliches',
          color: 'text.secondary',
        }}
      >
        {editObject ? "Edit Flashcard" : "Create new Flashcard"}
      </DialogTitle>
      <DialogContent>
        <div className={styles.card}>
          {createCard(createCardInfo(""))}
        </div>
        <Textfield value={frontTitle} setValue={setFrontTitle} label="Front Title"/>
        <Textfield value={frontDescription} setValue={setFrontDescription} label="Front Description"/>
        <Textfield value={backTitle} setValue={setBackTitle} label="Back Title"/>
        <Textfield value={backDescription} setValue={setBackDescription} label="Back   Description"/>
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
          onClick={() => editObject ? editCard() : addCard()}
        >
          {editObject ? "Edit" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}