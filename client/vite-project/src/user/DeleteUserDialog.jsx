import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { Form } from 'react-router-dom'
import PropTypes from 'prop-types'

const DeleteUserDialog = ({ profile, open, setOpen }) => {
    const handleClose = () => {setOpen(false)}

    return (
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Delete {profile.name} ?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deleting an account is irreversible, fyi.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>Cancel</Button>
          {/* Prevent form from making formData */}
          <Form method="post" action="delete">
            <Button type="submit" color='secondary' onClick={handleClose}>
              Delete
            </Button>
          </Form>
        </DialogActions>
      </Dialog>
    )
}

// created here is a string apparently
DeleteUserDialog.propTypes = {
  "open": PropTypes.bool.isRequired,
  "setOpen": PropTypes.func.isRequired,
  "profile": PropTypes.shape({
    "_id": PropTypes.string,
    "name": PropTypes.string,
    "email": PropTypes.string,
    "created": PropTypes.string,
  })
}

export default DeleteUserDialog
