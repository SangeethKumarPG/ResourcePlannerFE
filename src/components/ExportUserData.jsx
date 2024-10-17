import { Button } from '@mui/material'
import React from 'react'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
function ExportUserData() {
  return (
    <>
      <h4 className='my-2'>Generate Report</h4>
      <hr className='my-2'/>
      <div className="row">
        <div className="col-12">
          <Button variant='contained' startIcon={<FileDownloadIcon/>} label="Export" sx={{width:'100%'}}>
            Download Report
          </Button>
        </div>
      </div>
    </>
  )
}

export default ExportUserData