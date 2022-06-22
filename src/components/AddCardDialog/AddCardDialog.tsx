import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Card from '../Card/Card';
import { CardInterface } from '../Card/Card';
import WordCardface from '../WordCardface';

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
    <Dialog open={dialogOpen} onClose={cancelAdd}>
      <DialogTitle>Create new Flashcard</DialogTitle>
      <DialogContent>
        <Card
          frontCardface={createFront()}
          backCardface={createBack()}
          tags={tags}
        />
        <TextField
          margin="normal"
          id="frontTitle"
          label="Front Title"
          type="text"
          fullWidth
          variant="filled"
          value={frontTitle}
          sx={{ 
            fontFamily: 'Staatliches',
            color: 'black',
            input: {
              color: 'black',
              background: 'rgba(255,255,255,0.8)',
            }
          }}
          InputLabelProps={{
            style: { color: '#000' },
          }}
          onChange={(e) => setFrontTitle(e.target.value)}
        />
        <TextField
          margin="normal"
          id="frontDesc"
          label="Front Description"
          type="text"
          fullWidth
          variant="filled"
          value={frontDescription}
          sx={{ 
            fontFamily: 'Staatliches',
            color: 'black',
            input: {
              color: 'black',
              background: 'rgba(255,255,255,0.8)',
            }
          }}
          InputLabelProps={{
            style: { color: '#000' },
          }}
          onChange={(e) => setFrontDescription(e.target.value)}
        />
        <TextField
          margin="normal"
          id="backTitle"
          label="Back Title"
          type="text"
          fullWidth
          variant="filled"
          value={backTitle}
          sx={{ 
            fontFamily: 'Staatliches',
            color: 'black',
            input: {
              color: 'black',
              background: 'rgba(255,255,255,0.8)',
            }
          }}
          InputLabelProps={{
            style: { color: '#000' },
          }}
          onChange={(e) => setBackTitle(e.target.value)}
        />
        <TextField
          margin="normal"
          id="backDesc"
          label="Back Description"
          type="text"
          fullWidth
          variant="filled"
          value={backDescription}
          sx={{ 
            fontFamily: 'Staatliches',
            color: 'black',
            input: {
              color: 'black',
              background: 'rgba(255,255,255,0.8)',
            }
          }}
          InputLabelProps={{
            style: { color: '#000' },
          }}
          onChange={(e) => setBackDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={cancelAdd}>Cancel</Button>
        <Button onClick={createObject}>Create</Button>
      </DialogActions>
    </Dialog>
  );
}