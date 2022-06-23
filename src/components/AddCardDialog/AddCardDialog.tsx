import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

import Card from '../Card/Card';
import { CardInterface } from '../Card/Card';
import Textfield from '../Textfield';
import WordCardface from '../WordCardface';

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
  {dialogOpen, handleClose}
  : {dialogOpen: boolean, handleClose: (toAdd : CardInterface | null) => void}
) {

  const [frontTitle, setFrontTitle] = React.useState('Front');
  const [frontDescription, setFrontDescription] = React.useState('');
  const [backTitle, setBackTitle] = React.useState('Back');
  const [backDescription, setBackDescription] = React.useState('');
  const [tags, setTags] = React.useState([]);

  const createObject = () => {
    const result = {
      front: createFront(),
      back: createBack(),
      tags,
    }
    handleClose(result);
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
    handleClose(null);
  }

  const createFront = () => {
    return (<WordCardface title={frontTitle} description={frontDescription}/>);
  }

  const createBack = () => {
    return (<WordCardface title={backTitle} description={backDescription}/>);
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
      >Create new Flashcard</DialogTitle>
      <DialogContent>
        <div className={styles.card}>
          <Card
            frontCardface={createFront()}
            backCardface={createBack()}
            tags={tags}
          />
        </div>
        <Textfield value={frontTitle} setValue={setFrontTitle} label="Front Title"/>
        <Textfield value={frontDescription} setValue={setFrontDescription} label="Front Description"/>
        <Textfield value={backTitle} setValue={setBackTitle} label="Back Title"/>
        <Textfield value={backDescription} setValue={setBackDescription} label="Front Description"/>
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
          onClick={createObject}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}