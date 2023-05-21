import { Box } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

export default function BlockInterface() {

  const loading = useSelector( ({progressBar}) => progressBar.loading )
  if(!loading) return null;
  return (
    <Box height="100%" width="100%" bgcolor={'#ffffff8a'} top="0" left="0" zIndex={1} position="absolute"></Box>
  )
}
