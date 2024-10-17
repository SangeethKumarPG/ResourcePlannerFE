import { Accordion, AccordionDetails, AccordionSummary, Button, Typography, Box } from '@mui/material'
import {React, useState} from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MessageIcon from '@mui/icons-material/Message'
import TickIcon from '@mui/icons-material/CheckCircle'
import AssignIcon from '@mui/icons-material/AssignmentInd'

function SupportTicket() {
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 3;
  const tickets=[
    { id: 12345, title: 'Issue Title 1', status: 'Open', description: 'This is a sample ticket', createdOn: '12/12/2021', createdBy: 'User 1' },
    { id: 12346, title: 'Issue Title 2', status: 'Closed', description: 'Lorem ipsum...', createdOn: '12/11/2021', createdBy: 'User 2' },
    { id: 12347, title: 'Issue Title 3', status: 'Open', description: 'Lorem ipsum...', createdOn: '12/10/2021', createdBy: 'User 3' },
    { id: 12348, title: 'Issue Title 4', status: 'In Progress', description: 'Lorem ipsum...', createdOn: '12/09/2021', createdBy: 'User 4' },
    { id: 12349, title: 'Issue Title 5', status: 'Open', description: 'Lorem ipsum...', createdOn: '12/08/2021', createdBy: 'User 5' },
    { id: 12350, title: 'Issue Title 6', status: 'Open', description: 'Lorem ipsum...', createdOn: '12/07/2021', createdBy: 'User 6' },
    { id: 12351, title: 'Issue Title 7', status: 'Open', description: 'Lorem ipsum...', createdOn: '12/06/2021', createdBy: 'User 7' },
    { id: 12352, title: 'Issue Title 8', status: 'Open', description: 'Lorem ipsum...', createdOn: '12/05/2021', createdBy: 'User 8' },
    { id: 12353, title: 'Issue Title 9', status: 'Open', description: 'Lorem ipsum...', createdOn: '12/04/2021', createdBy: 'User 9' },
  ];

  const indexOfLastTicker = currentPage * ticketsPerPage;
  const indexOfFirstTicker = indexOfLastTicker - ticketsPerPage;
  const currentTickets = tickets.slice(indexOfFirstTicker, indexOfLastTicker)

  const totalPages = Math.ceil(tickets.length /ticketsPerPage)
  const moveToNextPage = ()=>{
    if(currentPage < totalPages){
      setCurrentPage((prevPage)=>prevPage+1);
    }
  }

  const moveToPreviousPage = ()=>{
    if(currentPage > 1){
      setCurrentPage((prevPage)=>prevPage-1);
    }
  }

  return (
    <>
      <h4 className='my-2'>Support Tickets</h4>
      <hr className='my-2'/>
      {currentTickets.map((ticket)=>(
        <div className="row my-3" key={ticket.id}>
          <div className="col-12">
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0 10px' }}>
                <Box display="flex" justifyContent="space-between" width="100%">
                  <Typography>ID: {ticket?.id}</Typography>
                  <Typography>{ticket?.title}</Typography>
                  <Typography>Status: {ticket?.status}</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <p>Description: {ticket?.description}</p>
                <br />
                <div className="row my-2">
                  <div className="col-md-6">
                    <p>Created on: {ticket?.createdOn}</p>
                  </div>
                  <div className="col-md-6">
                    <p>Created By : {ticket?.createdBy}</p>
                  </div>
                </div>
                
                <div className="row my-2">
                  <div className="col-md-4">
                    <Button variant="contained" color="primary" startIcon={<MessageIcon/>} style={{width: '100%'}}>Reply</Button>
                  </div>
                  <div className="col-md-4">
                    <Button variant="contained" color="success" startIcon={<TickIcon/>} style={{width: '100%'}}>Mark as closed</Button>
                  </div>
                  <div className="col-md-4">
                    <Button variant="contained" color="warning" startIcon={<AssignIcon/>} style={{width: '100%'}}>Assign to agent</Button>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      ))}
      <div className="d-flex align-items-center justify-content-between my-3 p-0">
        <div>
          <Button variant="contained" color="primary" onClick={moveToPreviousPage} disabled={currentPage === 1}>Previous</Button>
        </div>
        <div>
          <Typography>Page {currentPage} of {totalPages}</Typography>
        </div>
        <div>
          <Button variant="contained" color="primary" onClick={moveToNextPage} disabled={currentPage === totalPages}>Next</Button>
        </div>
      </div>
    </>
  )
}

export default SupportTicket;
