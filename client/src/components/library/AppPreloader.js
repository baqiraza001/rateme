import { Box, CircularProgress, Typography } from "@mui/material";

export default function AppPreloader({ message }) {
  return (
    <Box display={'flex'} flexDirection="column" textAlign="center" justifyContent={'center'} alignItems={'center'} height="100%" >
      <CircularProgress />
      <Typography mt={3}>{message}</Typography>
    </Box>
  )
}
