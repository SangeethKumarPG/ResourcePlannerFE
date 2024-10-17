import React from 'react'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { Accordion, Button } from '@mui/material';
import {AccordionDetails} from '@mui/material';
import {AccordionSummary} from '@mui/material';
import {Typography} from '@mui/material';
import {Box} from '@mui/system';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

function UserInfo() {
  return (
    <>
      <h4 className='my-2'>Find User Information</h4>
      <hr className='my-2'/>
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <TextField
            variant='outlined'
            placeholder='search by domain name or email'
            slotProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            />
        </div>
        <div className="col-md-2"></div>
      </div>
      <div className='container mt-2'>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Sample Domain Name</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="row">
                  <div className="col-md-4">Websites:www.example.com</div>
                  <div className="col-md-4">Email Servers:NA</div>
                  <div className="col-md-4">Expiry : 12/12/2024</div>
                </div>
                <div className="row mt-2">
                  <div className="col-md-4">
                    Contact Number : <a href='tel:1234567890'><PhoneIcon /></a>
                  </div>
                  <div className="col-md-4">
                    Send Email : <a href='mailto:example@example.com'><EmailIcon /></a>
                  </div>
                  <div className="col-md-4">
                    <Button variant='contained' color='success'>Renew</Button>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
      </div>

      <h5 className='my-2'>Action Required</h5>
      <hr className='my-2'/>
      <div className='container mt-2'>
      <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Sample Domain Name</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="row">
                  <div className="col-md-4">Websites:www.example.com</div>
                  <div className="col-md-4">Email Servers:NA</div>
                  <div className="col-md-4">Expiry : 12/12/2024</div>
                </div>
                <div className="row mt-2">
                  <div className="col-md-4">
                    Contact Number : <a href='tel:1234567890'><PhoneIcon /></a>
                  </div>
                  <div className="col-md-4">
                    Send Email : <a href='mailto:example@example.com'><EmailIcon /></a>
                  </div>
                  <div className="col-md-4">
                    <Button variant='contained' color='success'>Renew</Button>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
      </div>


    
    </>
  )
}

export default UserInfo