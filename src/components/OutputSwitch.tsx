'use client';

import { FC, useState } from 'react';
import { Box, IconButton, styled, useTheme } from '@mui/material';
import { VolumeUp, Message } from '@mui/icons-material';

import { useLiveAPIContext } from '../contexts/LiveAPIContext';

const Color = {
  flipasBrightGreen: '#00FF00',
}

export const OutputSwitch: FC = () => {
  const theme = useTheme();
  const { connected} = useLiveAPIContext();

  const [outputType, setOutputType] = useState<'audio' | 'text'>('audio');
  const isAudioMode = outputType === 'audio';

  const handleSwitchMode = (mode: 'audio' | 'text') => {
    setOutputType(mode);
  };

  return (
    <StyledBox>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
        <IconButton onClick={() => handleSwitchMode('audio')}>
          <VolumeUp fontSize="small" sx={{ color: isAudioMode ? Color.flipasBrightGreen : theme.palette.action.disabled }} />
        </IconButton>
      
        <IconButton onClick={() => handleSwitchMode('text')}>
          <Message fontSize="small" sx={{ color: !isAudioMode ? Color.flipasBrightGreen : theme.palette.action.disabled }} />
        </IconButton>
      </Box>
    </StyledBox>
  );
};



const StyledBox = styled(Box)(({ theme }) => ({
 
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  
}));