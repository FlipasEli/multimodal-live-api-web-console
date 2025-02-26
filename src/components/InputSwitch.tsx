import { FC, useState } from 'react';
import { Box, IconButton, Switch, TextField, styled, useTheme } from '@mui/material';
import { Send, Mic, Message } from '@mui/icons-material';



interface InputSwitchProps {
  onTextSubmit?: (text: string) => void;
  onMicToggle?: (isActive: boolean) => void;
  //onTyping?: (text: string) => void;
}

const Color = {
  flipasBrightGreen: '#00FF00',
}

export const InputSwitch: FC<InputSwitchProps> = ({ onTextSubmit, onMicToggle }) => {
  const theme = useTheme();
  const [isTextMode, setIsTextMode] = useState(true);
  const [inputText, setInputText] = useState('');

  const handleSwitchChange = () => {
    setIsTextMode(!isTextMode);
    if (onMicToggle) {
      onMicToggle(!isTextMode);
    }
  };

  const handleSubmit = () => {
    if (inputText.trim() && onTextSubmit) {
      onTextSubmit(inputText);
      setInputText('');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <StyledBox>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, justifyContent: 'center' }}>
        <IconButton onClick={() => !isTextMode || handleSwitchChange()}>
          <Mic fontSize="small" sx={{ color: !isTextMode ? Color.flipasBrightGreen : theme.palette.action.disabled }} />
        </IconButton>
      
        <IconButton onClick={() => isTextMode || handleSwitchChange()}>
          <Message fontSize="small" sx={{ color: isTextMode ? Color.flipasBrightGreen : theme.palette.action.disabled }} />
        </IconButton>
      </Box>
      
      {isTextMode && (
        <Box>
          <StyledTextField
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            size="small"
            fullWidth
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={handleSubmit}
                  disabled={!inputText.trim()}
                  color="primary"
                  edge="end"
                >
                  <Send />
                </IconButton>
              ),
            }}
          />
        </Box>
      )}
    </StyledBox>
  );
};




const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  padding: theme.spacing(1),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  flex: 1,
  transition: theme.transitions.create(['width', 'opacity']),
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.shape.borderRadius,
  }
}));

const AnimatedBox = styled(Box)(({ theme }) => ({
  transition: theme.transitions.create(['opacity', 'transform']),
  opacity: 1,
  transform: 'scale(1)',
  '&.hidden': {
    opacity: 0,
    transform: 'scale(0.8)',
  }
}));
