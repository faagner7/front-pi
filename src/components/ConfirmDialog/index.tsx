import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button
} from '@material-ui/core';
import { MdClose as CloseIcon } from 'react-icons/md';

import classes from './styles.module.css';

const ConfirmDialog = ({
  open = false,
  title,
  description,
  acceptLabel,
  cancelLabel,
  onAccept = () => {},
  onClose = () => {}
}) => {
  return (
    <Dialog open={open} onClose={onClose} className={classes.paper}>
      <div>
        <DialogTitle>
          <span className={classes.titleConfirmDialog}>{title}</span>
        </DialogTitle>
      </div>
      <DialogContent>
        <pre className={classes.confirmDescription}>{description}</pre>
      </DialogContent>
      <DialogActions className={classes.buttonContent}>
        <>
          <Button variant="outlined" onClick={onClose}>
            {cancelLabel}
          </Button>
          <Button
            variant="outlined"
            onClick={onAccept}
            style={{ backgroundColor: '#0d0d0d', color: '#fff' }}
          >
            {acceptLabel}
          </Button>
        </>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
