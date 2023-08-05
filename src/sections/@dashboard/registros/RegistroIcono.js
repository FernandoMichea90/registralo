import React from 'react';
import PropTypes from 'prop-types'; // Importa prop-types
import Picker, { Emoji, EmojiStyle } from 'emoji-picker-react';
import { Button, IconButton } from '@mui/material';

const RegistroIcono = ({ selectedEmoji, onClickIcono, onEmojiClick, showPicker }) =>
   (
    <div>
      {selectedEmoji ? (
        <IconButton onClick={onClickIcono}>
          <Emoji unified={selectedEmoji} emojiStyle={EmojiStyle.APPLE} size={22} />
        </IconButton>
      ) : (
        <Button variant="outlined" color="inherit" onClick={onClickIcono}>
          Añadir Icono
        </Button>
      )}
      {showPicker && <Picker onEmojiClick={onEmojiClick} width="100%" />}
    </div>
  );

  // Agrega la validación de propiedades
RegistroIcono.propTypes = {
  selectedEmoji: PropTypes.string,
  onClickIcono: PropTypes.func.isRequired,
  onEmojiClick: PropTypes.func.isRequired,
  showPicker: PropTypes.bool.isRequired,
};


export default RegistroIcono;
