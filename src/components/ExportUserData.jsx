import { Button } from '@mui/material'
import React from 'react'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
function ExportUserData() {
  return (
    <>
      <h5 className='my-2'>Generate Report</h5>
          <Button variant='contained' startIcon={<FileDownloadIcon/>} label="Export" sx={{width:'100%'}}>
            Download Report
          </Button>
    </>
  )
}

export default ExportUserData