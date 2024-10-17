import { Button, FormControl, FormControlLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material'
import React, { useState } from 'react'
import {MuiTelInput} from 'mui-tel-input'
function AddUser() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [provider, setProvider] = useState('');
  
  return (
   <>
    <div className="row">
      <h4>User Basic Details</h4>
      <hr className='my-2'/>
      <div className="col-md-6 mt-2">
        <TextField label="First Name" variant='outlined' style={{width: '100%'}}/>
      </div>
      <div className="col-md-6 mt-2">
        <TextField label="Last Name" variant='outlined' style={{width: '100%'}}/>
      </div>
    </div>
    <div className="row mt-2">
      <div className="col-md-12">
        <MuiTelInput label="Phone Number" value={phoneNumber} variant='outlined' style={{width: '100%'}}
        onChange={(value)=>setPhoneNumber(value)}/>
      </div>
    </div>
    <div className="row mt-2">
      <div className="col-md-3">
        <FormControl variant='outlined' style={{width: '100%'}}>
          <InputLabel id="provider-label">Select Provider</InputLabel>
          <Select
            labelId="se-lect-provider-label"
            value={provider}
            onChange={(event)=>setProvider(event.target.value)}
            label="Select Provider">
              
              <MenuItem value="Microsoft">Microsoft</MenuItem>
              <MenuItem value="GoogleWorkspace">Google Workspace</MenuItem>
              <MenuItem value="CloudFlare">CloudFlare</MenuItem>
              <MenuItem value="Hostinger">Hostinger</MenuItem>
            </Select>
        </FormControl>
      </div>
      <div className="col-md-9">
        <TextField label="Domain Name" variant='outlined' 
        type='email'
        style={{width: '100%'}}/>
      </div>
     
    </div>
    <div className="row mt-2">
        <div className="col-md-6">
          <TextField type='date' label="Start Date"  style={{width: '100%'}}
          InputLabelProps={{shrink: true}}
          />
        </div>
        <div className="col-md-6">
          <TextField type='date' label="End date" style={{width: '100%'}}
          InputLabelProps={{shrink: true}}
          />
        </div>
    </div>
    <div className="row mt-2">
      <div className="col-12">
        <p>Has Email Server</p>
        <RadioGroup aria-label="email-server" name="email-server" className='d-flex flex-row w-100' sx={{width: '100%'}}>
          <FormControlLabel value="yes" control={<Radio/>} label="Yes"/>
          <FormControlLabel value="no" control={<Radio/>} label="No"/>
        </RadioGroup>
      </div>
    </div>
    <div className="row mt-2">
      <div className="col-12">
        <Button variant='contained' color='primary' sx={{width: '100%'}}>Save</Button>
      </div>
    </div>

   </>
  )
}

export default AddUser