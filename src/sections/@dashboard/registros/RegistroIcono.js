import React from 'react';
import Picker, { Emoji, EmojiStyle } from 'emoji-picker-react';
import PropTypes from 'prop-types';
import {Button, IconButton} from '@mui/material';


// RegistroIcono.propTypes = {
//     selectedEmoji: PropTypes.string,
//     onClickIcono: PropTypes.func,
//     onEmojiClick: PropTypes.func,
//     showPicker: PropTypes.bool,
// };

const RegistroIcono = ({selectedEmoji,onClickIcono,onEmojiClick,showPicker}) => {
  return (
        <div>
        {selectedEmoji ? (
            <IconButton onClick={onClickIcono}>
            <Emoji
                unified={selectedEmoji}
                emojiStyle={EmojiStyle.APPLE}
                size={22}   
            />
            </IconButton>
        ) :
            <Button variant="outlined" color="inherit" onClick={onClickIcono} >
            Añadir Icono
            </Button>
        }
        {showPicker &&
            <Picker onEmojiClick={onEmojiClick}  width="100%" ></Picker>
        }
        </div>
  )
}

export default RegistroIcono