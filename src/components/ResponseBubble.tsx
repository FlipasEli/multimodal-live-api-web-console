'use client';

import { FC, useEffect, useState } from 'react';
import { Box, Paper, styled } from '@mui/material';

const ResponseBubble: FC = () => {
  //const { client, outputType } = useLiveAPIContext();
  const [currentText, setCurrentText] = useState<string>('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');
  const [isVisible, setIsVisible] = useState(false);
/* 
  useEffect(() => {
    const handleResponse = (response: any) => {
      if (isModelTurn(response) && response.modelTurn.parts?.[0]?.text) {
        const text = response.modelTurn.parts[0].text;
        setCurrentText(text);
        setIsVisible(true);
        
        // Hide the bubble after 5 seconds of no new messages
        const timer = setTimeout(() => {
          setIsVisible(false);
        }, 5000);

        return () => clearTimeout(timer);
      }
    };

    client.on('content', handleResponse);
    return () => {
      client.off('content', handleResponse);
    };
  }, [client]); 

  if (!isVisible || outputType === 'audio') {
    return null;
  }*/

  return (
    <StyledBubble>
      <BubbleContent>
        {currentText}
      </BubbleContent>
    </StyledBubble>

  );
};

const StyledBubble = styled(Paper)(({ theme }) => ({
  
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[3],
  margin: theme.spacing(1),
  animation: 'fadeIn 0.5s ease-in-out',
  zIndex: 1000,
  '@keyframes fadeIn': {
    from: {
      opacity: 0,
      transform: 'translate(-50%, 20px)',
    },
    to: {
      opacity: 1,
      transform: 'translate(-50%, 0)',
    },
  },
}));

const BubbleContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  color: theme.palette.text.primary,
  fontSize: '1rem',
  lineHeight: 1.5,
  maxHeight: '200px',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: '4px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    background: theme.palette.divider,
    borderRadius: '4px',
  },
}));

export default ResponseBubble; 