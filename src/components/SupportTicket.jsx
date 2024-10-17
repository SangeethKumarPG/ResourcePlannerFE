import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
  Box,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText
} from "@mui/material";
import { React, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MessageIcon from "@mui/icons-material/Message";
import TickIcon from "@mui/icons-material/CheckCircle";
import AssignIcon from "@mui/icons-material/AssignmentInd";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
function SupportTicket() {
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 3;
  const tickets = [
    {
      id: 12345,
      title: "Issue Title 1",
      status: "Open",
      description: "This is a sample ticket",
      createdOn: "12/12/2021",
      createdBy: "User 1",
    },
    {
      id: 12346,
      title: "Issue Title 2",
      status: "Closed",
      description: "Lorem ipsum...",
      createdOn: "12/11/2021",
      createdBy: "User 2",
    },
    {
      id: 12347,
      title: "Issue Title 3",
      status: "Open",
      description: "Lorem ipsum...",
      createdOn: "12/10/2021",
      createdBy: "User 3",
    },
    {
      id: 12348,
      title: "Issue Title 4",
      status: "In Progress",
      description: "Lorem ipsum...",
      createdOn: "12/09/2021",
      createdBy: "User 4",
    },
    {
      id: 12349,
      title: "Issue Title 5",
      status: "Open",
      description: "Lorem ipsum...",
      createdOn: "12/08/2021",
      createdBy: "User 5",
    },
    {
      id: 12350,
      title: "Issue Title 6",
      status: "Open",
      description: "Lorem ipsum...",
      createdOn: "12/07/2021",
      createdBy: "User 6",
    },
    {
      id: 12351,
      title: "Issue Title 7",
      status: "Open",
      description: "Lorem ipsum...",
      createdOn: "12/06/2021",
      createdBy: "User 7",
    },
    {
      id: 12352,
      title: "Issue Title 8",
      status: "Open",
      description: "Lorem ipsum...",
      createdOn: "12/05/2021",
      createdBy: "User 8",
    },
    {
      id: 12353,
      title: "Issue Title 9",
      status: "Open",
      description: "Lorem ipsum...",
      createdOn: "12/04/2021",
      createdBy: "User 9",
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("recent");
  const filteredTickets = tickets
    .filter((ticket) => {
      const matchFilter =
        filter === "all" ||
        (filter === "open" && ticket.status === "Open") ||
        (filter === "closed" && ticket.status === "Closed") ||
        (filter === "pending" && ticket.status === "Pending");

      const matchSearch =
        ticket.id.toString().includes(searchQuery) ||
        ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchFilter && matchSearch;
    })
    .sort((a, b) => {
      const dateA = new Date(a.createdOn);
      const dateB = new Date(b.createdOn);
      if (sortOrder === "recent") {
        return dateB - dateA;
      } else {
        return dateA - dateB;
      }
    });
  const indexOfLastTicker = currentPage * ticketsPerPage;
  const indexOfFirstTicker = indexOfLastTicker - ticketsPerPage;
  const currentTickets = filteredTickets.slice(
    indexOfFirstTicker,
    indexOfLastTicker
  );
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);
  const moveToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const moveToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const [openNewTicketDialog, setOpenNewTicketDialog] = useState(false);
  const handleOpenNewTicketDialog = () => {
    setOpenNewTicketDialog(true);
  };
  const handleCloseNewTicketDialog = () => {
    setOpenNewTicketDialog(false);
  };

  return (
    <>
      <h4 className="my-2">Support Tickets</h4>
      <div className="row my-3">
        <div className="col-md-10 p-0">
          <TextField
            id="searchTickets"
            label="Search tickets by Id, title"
            variant="outlined"
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
          />
        </div>
        <div className="col-md-2">
          <Button
            variant="outlined"
            startIcon={<NoteAddIcon />}
            sx={{
              width: "100%",
              height: "100%",
              "&:hover": {
                backgroundColor: "green",
                color: "white",
              },
            }}
            onClick={handleOpenNewTicketDialog}
          ></Button>
        </div>
      </div>
      <div className="container">
        <div className="my-2 d-flex align-items-center justify-content-between">
          <Button
            variant="outlined"
            sx={{
              "&:hover": {
                backgroundColor: "red",
                color: "white",
              },
            }}
            className="mx-2"
            onClick={() => handleFilterChange("open")}
          >
            Open
          </Button>
          <Button
            variant="outlined"
            sx={{
              "&:hover": {
                backgroundColor: "green",
                color: "white",
              },
            }}
            className="mx-2"
            onClick={() => handleFilterChange("closed")}
          >
            Closed
          </Button>
          <Button
            variant="outlined"
            sx={{
              "&:hover": {
                backgroundColor: "orange",
                color: "white",
              },
            }}
            className="mx-2"
            onClick={() => handleFilterChange("pending")}
          >
            Pending
          </Button>
          <Button
            variant="outlined"
            sx={{
              "&:hover": {
                backgroundColor: "blue",
                color: "white",
              },
            }}
            onClick={() => setSortOrder("recent")}
          >
            Recent
          </Button>
          <Button
            variant="outlined"
            sx={{
              "&:hover": {
                backgroundColor: "purple",
                color: "white",
              },
            }}
            className="mx-2"
            onClick={() => setSortOrder("oldest")}
          >
            Oldest
          </Button>
        </div>
      </div>

      {currentTickets.map((ticket) => (
        <div className="row my-3" key={ticket.id}>
          <div className="col-12">
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                style={{ padding: "0 10px" }}
              >
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
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<MessageIcon />}
                      style={{ width: "100%" }}
                    >
                      Reply
                    </Button>
                  </div>
                  <div className="col-md-4">
                    <Button
                      variant="contained"
                      color="success"
                      startIcon={<TickIcon />}
                      style={{ width: "100%" }}
                    >
                      Mark as closed
                    </Button>
                  </div>
                  <div className="col-md-4">
                    <Button
                      variant="contained"
                      color="warning"
                      startIcon={<AssignIcon />}
                      style={{ width: "100%" }}
                    >
                      Assign to agent
                    </Button>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      ))}
      <div className="d-flex align-items-center justify-content-between my-3 p-0">
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={moveToPreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
        </div>
        <div>
          <Typography>
            Page {currentPage} of {totalPages}
          </Typography>
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={moveToNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
      <Dialog open={openNewTicketDialog} onClose={handleCloseNewTicketDialog}>
        <DialogTitle>New Support Ticket</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a new support ticket, please enter the required details
          </DialogContentText>
          <TextField
            autoFocus
            label="Title"
            variant="outlined"
            fullWidth
            className="mt-2"
            required
            />
            <TextField
            label="Issue Description"
            variant="outlined"
            fullWidth
            multiline
            required
            rows={6}
            className="mt-2"/>
            <TextField
            label="User Id"
            fullWidth
            variant="outlined"
            required
            className="mt-2"
            />
            <div className="d-flex align-items-center justify-content-between mt-3">
              <Button varaint="outlined" sx={{
                '&:hover':{
                  backgroundColor:'red',
                  color: 'white'
                }
              }}
              onClick={handleCloseNewTicketDialog}
              >Cancel</Button>
              <Button variant="outlined" sx={{
                '&:hover':{
                  backgroundColor: 'green',
                  color: 'white'
                }
              }}>Create</Button>
            </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SupportTicket;
