import PropTypes from 'prop-types';
// @mui
import { Stack, LinearProgress } from '@mui/material';
// components
import Scrollbar from '../../../../components/scrollbar';
import EmptyContent from '../../../../components/empty-content';
//
import MailItem from './MailItem';

// ----------------------------------------------------------------------

MailList.propTypes = {
  dense: PropTypes.bool,
  isEmpty: PropTypes.bool,
  labels: PropTypes.array,
  mails: PropTypes.object,
  isLoading: PropTypes.bool,
  onSelectMail: PropTypes.func,
  selectedMails: PropTypes.func,
  onDeselectMail: PropTypes.func,
};

export default function MailList({
  mails,
  labels,
  dense,
  onSelectMail,
  onDeselectMail,
  selectedMails,
  isLoading,
  isEmpty,
}) {
  const { allIds, byId } = mails;

  return (
    <Stack
      sx={{
        position: 'relative',
        height: `calc(100% - 80px)`,
      }}
    >
      {isLoading && (
        <LinearProgress
          color="inherit"
          sx={{
            top: 0,
            width: 1,
            position: 'absolute',
          }}
        />
      )}

      {isEmpty ? (
        <EmptyContent title="There is no conversation" img="/assets/illustrations/illustration_empty_mail.svg" />
      ) : (
        <Scrollbar sx={{ height: 1 }}>
          <Stack
            sx={{
              minWidth: {
                md: 960,
              },
            }}
          >
            {allIds.map((mailId) => (
              <MailItem
                key={mailId}
                dense={dense}
                mail={byId[mailId]}
                selected={selectedMails(mailId)}
                onSelect={() => onSelectMail(mailId)}
                onDeselect={() => onDeselectMail(mailId)}
                getLabel={(labelId) => labels.filter((label) => label.id === labelId)[0]}
              />
            ))}
          </Stack>
        </Scrollbar>
      )}
    </Stack>
  );
}
