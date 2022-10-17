import PropTypes from 'prop-types';
import { useEffect } from 'react';
import ReactLightbox from 'react-image-lightbox';
// @mui
import { Typography } from '@mui/material';
//
import StyledLightbox from './styles';

// ----------------------------------------------------------------------

Lightbox.propTypes = {
  open: PropTypes.bool,
  images: PropTypes.array,
  photoIndex: PropTypes.number,
  setPhotoIndex: PropTypes.func,
};

export default function Lightbox({ images, photoIndex, setPhotoIndex, open, ...other }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [open]);

  const showIndex = (
    <Typography>
      <strong> {photoIndex + 1} </strong> {'/'} {images.length}
    </Typography>
  );

  const toolbarButtons = [showIndex];

  const customStyles = {
    overlay: {
      zIndex: 9999,
    },
  };

  return (
    <>
      <StyledLightbox />

      {open && (
        <ReactLightbox
          animationDuration={160}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          onMovePrevRequest={() => setPhotoIndex((photoIndex + images.length - 1) % images.length)}
          onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % images.length)}
          toolbarButtons={toolbarButtons}
          reactModalStyle={customStyles}
          wrapperClassName="react-lightbox"
          {...other}
        />
      )}
    </>
  );
}
