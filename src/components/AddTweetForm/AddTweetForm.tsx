import React from 'react';
import {
  Avatar,
  Button,
  IconButton,
  makeStyles,
  TextareaAutosize,
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import EmojiIcon from '@material-ui/icons/SentimentSatisfiedOutlined';
import GifIcon from '@material-ui/icons/GifOutlined';
import ImageIcon from '@material-ui/icons/ImageOutlined';
import { fetchAddTweet } from '../../store/ducks/tweets/actionCreators';
import { useDispatch, useSelector } from 'react-redux';
import { selectAddTweetState } from '../../store/ducks/tweets/selectors';
import { AddFormState } from '../../store/ducks/tweets/contracts/state';
const useStyles = makeStyles({
  addTweetForm: { margin: '10px 16px' },
  addTweetFormWrapper: {
    display: 'flex',
    marginBottom: 5,
  },
  addTweetFormBody: {
    width: '100%',
  },
  addTweetFormTextarea: {
    width: '100%',
    border: 0,
    fontSize: 20,
    outline: 'none',
    fontFamily: 'inherit',
    resize: 'none',
    paddingTop: 16,
    paddingBottom: 16,
  },
  addTweetFormAvatar: {
    marginRight: 15,
  },
  addTweetFormBottom: {
    display: 'flex',
    justifyContent: 'space-between',
    borderTop: '1px solid rgb(235, 238, 240);',
    paddingTop: 10,
  },
  addTweetFormBottomBtns: {
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: '-15px',
  },
  addTweetFormBottomRight: {
    display: 'flex',
    alignItems: 'center',
  },
  addTweetFormCircleProgress: {
    position: 'relative',
    width: '20px',
    height: '20px',
    margin: '0 10px',
    '& .MuiCircularProgress-root': {
      position: 'absolute',
    },
  },
});
interface AddTweetFormProps {
  maxRows?: number;
}
const MAX_LENGTH = 280;
export const AddTweetForm: React.FC<AddTweetFormProps> = ({
  maxRows,
}): React.ReactElement => {
  const classes = useStyles();
  const [text, setText] = React.useState<string>('');
  const textLimitPercent = (text.length / MAX_LENGTH) * 100;
  const textCount = MAX_LENGTH - text.length;
  const handleChangeTextarea = (
    e: React.FormEvent<HTMLTextAreaElement>,
  ): void => {
    if (e.currentTarget) {
      setText(e.currentTarget.value);
    }
  };
  const addTweetState = useSelector(selectAddTweetState);

  const dispatch = useDispatch();
  const handleClickAddTweet = (): void => {
    dispatch(fetchAddTweet(text));
    setText('');
  };

  return (
    <div className={classes.addTweetForm}>
      <div className={classes.addTweetFormWrapper}>
        <Avatar
          src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mzd8fG1hbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          alt="Аватар пользователя"
          className={classes.addTweetFormAvatar}
        />
        <div className={classes.addTweetFormBody}>
          <TextareaAutosize
            onChange={handleChangeTextarea}
            className={classes.addTweetFormTextarea}
            placeholder="Что происходит?"
            value={text}
            rowsMax={maxRows}
          />
          <div className={classes['addTweetFormBottom']}>
            <div className={classes['addTweetFormBottomBtns']}>
              <IconButton color="primary">
                <ImageIcon />
              </IconButton>
              <IconButton color="primary">
                <GifIcon />
              </IconButton>
              <IconButton color="primary">
                <EmojiIcon />
              </IconButton>
            </div>
            <div className={classes.addTweetFormBottomRight}>
              {text && (
                <>
                  <span
                    style={
                      text.length >= MAX_LENGTH ? { color: 'red' } : undefined
                    }>
                    {textCount}
                  </span>
                  <div className={classes.addTweetFormCircleProgress}>
                    <CircularProgress
                      variant="determinate"
                      size={20}
                      thickness={5}
                      value={text.length >= MAX_LENGTH ? 100 : textLimitPercent}
                      style={
                        text.length >= MAX_LENGTH ? { color: 'red' } : undefined
                      }
                    />
                    <CircularProgress
                      style={{ color: 'rgba(0,0,0,0.1)' }}
                      variant="determinate"
                      size={20}
                      thickness={5}
                      value={100}
                    />
                  </div>
                </>
              )}
              <Button
                disabled={
                  addTweetState === AddFormState.LOADING ||
                  !text ||
                  text.length >= MAX_LENGTH
                }
                color="primary"
                onClick={handleClickAddTweet}
                variant="contained">
                {addTweetState === AddFormState.LOADING ? (
                  <CircularProgress color="inherit" size={16} />
                ) : (
                  'Твитнуть'
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
      {addTweetState === AddFormState.ERROR && (
        <Alert severity="error">
          Ошибка при добавлении твита{' '}
          <span aria-label="emodji-plak" role="img">
            😐
          </span>
        </Alert>
      )}
    </div>
  );
};
