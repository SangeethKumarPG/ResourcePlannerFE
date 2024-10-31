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
  DialogContentText,
  Autocomplete,
  IconButton,
} from "@mui/material";
import { React, useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MessageIcon from "@mui/icons-material/Message";
import TickIcon from "@mui/icons-material/CheckCircle";
import AssignIcon from "@mui/icons-material/AssignmentInd";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { useSelector } from "react-redux";
import { fetchCustomers } from "../redux/customerSlice";
import { fetchOrders } from "../redux/ordersSlice";
import { useDispatch } from "react-redux";
import { addTicket, fetchTickets, addComment } from "../redux/ticketSlice";
import SendIcon from '@mui/icons-material/Send';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import dayjs from "dayjs";


function SupportTicket() {
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 3;
  const { customers } = useSelector((state) => state.customers);
  const { orders } = useSelector((state) => state.orders);
  const { tickets, status } = useSelector((state) => state.tickets);
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCustomers());
    dispatch(fetchOrders());
    dispatch(fetchTickets());
    setRefresh(false);
  }, [dispatch, refresh]);

  // console.log("Customers:", customers);
  // console.log("Orders:", orders);
  console.log("Tickets:", tickets);
  // const tickets = [
  //   {
  //     id: 12345,
  //     title: "Issue Title 1",
  //     status: "Open",
  //     description: "This is a sample ticket",
  //     createdOn: "12/12/2021",
  //     createdBy: "User 1",
  //   },
  //   {
  //     id: 12346,
  //     title: "Issue Title 2",
  //     status: "Closed",
  //     description: "Lorem ipsum...",
  //     createdOn: "12/11/2021",
  //     createdBy: "User 2",
  //   },
  //   {
  //     id: 12347,
  //     title: "Issue Title 3",
  //     status: "Open",
  //     description: "Lorem ipsum...",
  //     createdOn: "12/10/2021",
  //     createdBy: "User 3",
  //   },
  //   {
  //     id: 12348,
  //     title: "Issue Title 4",
  //     status: "In Progress",
  //     description: "Lorem ipsum...",
  //     createdOn: "12/09/2021",
  //     createdBy: "User 4",
  //   },
  //   {
  //     id: 12349,
  //     title: "Issue Title 5",
  //     status: "Open",
  //     description: "Lorem ipsum...",
  //     createdOn: "12/08/2021",
  //     createdBy: "User 5",
  //   },
  //   {
  //     id: 12350,
  //     title: "Issue Title 6",
  //     status: "Open",
  //     description: "Lorem ipsum...",
  //     createdOn: "12/07/2021",
  //     createdBy: "User 6",
  //   },
  //   {
  //     id: 12351,
  //     title: "Issue Title 7",
  //     status: "Open",
  //     description: "Lorem ipsum...",
  //     createdOn: "12/06/2021",
  //     createdBy: "User 7",
  //   },
  //   {
  //     id: 12352,
  //     title: "Issue Title 8",
  //     status: "Open",
  //     description: "Lorem ipsum...",
  //     createdOn: "12/05/2021",
  //     createdBy: "User 8",
  //   },
  //   {
  //     id: 12353,
  //     title: "Issue Title 9",
  //     status: "Open",
  //     description: "Lorem ipsum...",
  //     createdOn: "12/04/2021",
  //     createdBy: "User 9",
  //   },
  // ];

  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("recent");
  const [expandedTicket, setExpandedTicket] = useState(null);
  const [commentText, setCommentText] = useState({
    comment:"",
    addedDate: null
  })

  const handleReplyClick = (ticketId)=>{
    console.log("Reply Clicked");
    setExpandedTicket(expandedTicket === ticketId ? null : ticketId);
  }
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [activeOrders, setActiveOrders] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const handleAddOrEdit = (e) => {
    e.preventDefault();
    if (isEditing) {
      //handleEdit
    } else {
      // console.log("FormData:", formData);
      dispatch(addTicket(formData)).then(() => setRefresh(true));
      setFormData({});
      setActiveOrders([]);
    }
    handleCloseNewTicketDialog();
  };

  const addCommentToTicket = ()=>{
    console.log("Comment Text: ", commentText);
    dispatch(addComment(commentText)).then(() => setRefresh(true));
    setCommentText({
      comment:"",
      addedDate: null
    })
  }

  const filteredTickets = tickets
    .filter((ticket) => {
      const matchFilter =
        filter === "all" ||
        (filter === "open" && ticket.status === "open") ||
        (filter === "closed" && ticket.status === "Closed") ||
        (filter === "pending" && ticket.status === "Pending");

      const matchSearch =
        ticket._id.toString().includes(searchQuery) ||
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
        <div className="row my-3" key={ticket._id}>
          <div className="col-12">
            <Accordion
            expanded={expandedTicket === ticket._id}
            onChange={() => setExpandedTicket(ticket._id === expandedTicket ? null : ticket._id)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                style={{ padding: "0 10px" }}
              >
                <Box display="flex" justifyContent="space-between" width="100%">
                  <Typography>ID: {ticket?._id}</Typography>
                  <Typography>{ticket?.title}</Typography>
                  <Typography>Status: {ticket?.status}</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Box display={"flex"} justifyContent={"space-between"} sx={{
                  backgroundColor:"Highlight",
                  WebkitTapHighlightColor: "transparent",
                  borderRadius: "5px",
                }}>
                  <p>
                    Created For:{" "}
                    {
                      customers.find((c) => c._id === ticket?.createdFor)
                        ?.username
                    }
                  </p>
                  <p>
                    Order :{" "}
                    {orders.find((o) => o._id === ticket?.order)?.domainName}
                  </p>
                </Box>
                <Box display={"flex"} justifyContent={"center"} className="mt-2">
                  <Typography variant="body1">Description:</Typography>
                </Box>
                <Box display={"flex"} justifyContent={"center"} className="mt-2"
                sx={{
                  backgroundColor:"Highlight",
                  WebkitTapHighlightColor: "transparent",
                  borderRadius: "5px",
                }}>
                    <p>

                    {ticket?.description}
                    </p>
                </Box>

                <br />
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  className="mt-2"
                >
                  <p>
                    Created on:{" "}
                    {ticket?.createdDate
                      ? dayjs(ticket?.createdDate).format("DD/MM/YYYY HH:mm:ss")
                      : "N/A"}
                  </p>
                  <p>Created By : {ticket?.createdBy}</p>
                  <p>Assigned To: {ticket?.assignedTo ? ticket?.assignedTo : "N/A"}</p>
                </Box>

                <div className="row my-2">
                  {/* <div className="col-md-4">
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<MessageIcon />}
                      style={{ width: "100%" }}
                      onClick={()=>handleReplyClick(ticket._id)}
                    >
                      Reply
                    </Button>
                  </div> */}
                  <div className="col-md-6">
                    <Button
                      variant="contained"
                      color="success"
                      startIcon={<TickIcon />}
                      style={{ width: "100%" }}
                    >
                      Mark as closed
                    </Button>
                  </div>
                  <div className="col-md-6">
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
                <Accordion
                expanded={expandedTicket === ticket._id}>
                  <AccordionSummary>
                    <Typography>Comments</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                  <Box display={"flex"} justifyContent={"space-between"} className="my-2" width={"100%"}>
                      <TextField variant="filled" fullWidth label="Add a comment" 
                      value={commentText.comment}
                      onChange={(e)=>{
                        e.preventDefault();
                        setCommentText({...commentText, comment:e.target.value, addedDate:dayjs(),
                          ticketId:ticket._id
                         })
                      }}
                      />
                      <Button variant="outlined" startIcon={<SendIcon/>} className="ms-1" onClick={addCommentToTicket}/>
                      {/* <IconButton variant="outlined" startIcon={<SendIcon/>} onClick={()=>console.log("Send")}/> */}
                    </Box>
                    {ticket?.comments?.length > 0? (
                      ticket?.comments?.map((comment) => (
                        <Box display={"flex"} flexDirection={"column"} className="my-2" sx={{
                          backgroundColor:"lightgrey",
                          WebkitTapHighlightColor: "transparent",
                          borderRadius: "5px",
                          padding:"1rem"
                        }}>
  
                          <Box display={"flex"}>
                            <AccountCircleIcon sx={{color:"green", fontSize:"1.5rem"}}/>
                            <Typography variant="p" sx={{ml:1, fontWeight:"bold"}}>{comment?.userId}</Typography>
                            <Typography variant="p" className="ms-2" sx={{color:"gray", fontSize:"0.8rem"}}>{comment?.addedDate ? dayjs(comment?.addedDate).format("DD/MM/YYYY HH:mm:ss") : "N/A"}</Typography>
                          </Box>
                          <Box display={"flex"} className="mt-2">
                            <Typography variant="body1" sx={{ml:1}}>{comment?.comment}  </Typography>
                          </Box>
                        </Box>
                      )
                    )) : (<Typography variant="body1">No comments yet</Typography>)}
                   
                     

                  </AccordionDetails>
                </Accordion>
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
      <Dialog
        open={openNewTicketDialog}
        onClose={handleCloseNewTicketDialog}
        PaperProps={{
          component: "form",
          onSubmit: handleAddOrEdit,
        }}
      >
        <DialogTitle>New Support Ticket</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a new support ticket, please enter the required details
          </DialogContentText>
          <TextField
            autoFocus
            value={formData.title}
            label="Title"
            variant="outlined"
            fullWidth
            className="mt-2"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
          <TextField
            label="Issue Description"
            variant="outlined"
            fullWidth
            multiline
            required
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows={6}
            className="mt-2"
          />
          <Autocomplete
            id="user-name"
            className="mt-2"
            value={
              formData.createdFor
                ? customers.find((c) => c._id === formData.createdFor)
                : null
            }
            options={customers}
            getOptionLabel={(option) => option.username || ""}
            onChange={(e, newValue) => {
              e.preventDefault();
              if (newValue) {
                setFormData({ ...formData, createdFor: newValue._id });
                setActiveOrders(
                  orders.filter((order) => order.userId === newValue._id)
                );
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Created For..."
                variant="outlined"
                fullWidth
                required
              />
            )}
          />

          <Autocomplete
            id="order-name"
            className="mt-2"
            value={
              activeOrders.find((order) => order._id === formData.order) || null
            }
            options={activeOrders}
            getOptionLabel={(option) => option.domainName}
            onChange={(e, newValue) => {
              e.preventDefault();
              if (newValue) {
                setFormData({
                  ...formData,
                  order: newValue._id,
                  createdDate: dayjs(),
                });
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Order..."
                variant="outlined"
                fullWidth
                required
              />
            )}
          />
          <div className="d-flex align-items-center justify-content-between mt-3">
            <Button
              varaint="outlined"
              sx={{
                "&:hover": {
                  backgroundColor: "red",
                  color: "white",
                },
              }}
              onClick={handleCloseNewTicketDialog}
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              sx={{
                "&:hover": {
                  backgroundColor: "green",
                  color: "white",
                },
              }}
              type="submit"
            >
              Create
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SupportTicket;
