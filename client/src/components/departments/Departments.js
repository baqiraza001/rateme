
import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Departments() {
  return (
    <div>
        <Button component={Link} to="/admin/departments/edit/646ca273df72a7be5a2d38ea">Edit Department</Button>
    </div>
  )
}
