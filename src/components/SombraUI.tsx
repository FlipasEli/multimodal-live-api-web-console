  import { SombraVisualizer } from './SombraVisualizer';
import { InputSwitch } from './InputSwitch';
import { OutputSwitch } from './OutputSwitch';
import ResponseBubble from './ResponseBubble';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export const SombraUI = () => {
  const theme = useTheme();
  return (
    <>
      <SombraVisualizer volume={0.5} isUserSpeaking={false} />
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center',gap: 0.5}}>
        <ResponseBubble />
        <OutputSwitch />
      </Box> 
      <InputSwitch />
    </>
  );
};
