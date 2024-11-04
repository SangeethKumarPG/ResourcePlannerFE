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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { React, useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MessageIcon from "@mui/icons-material/Message";
import TickIcon from "@mui/icons-material/CheckCircle";
import AssignIcon from "@mui/icons-material/AssignmentInd";
import DeleteIcon from "@mui/icons-material/Delete";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { useSelector } from "react-redux";
import { fetchCustomers } from "../redux/customerSlice";
import { fetchOrders } from "../redux/ordersSlice";
import { fetchAgents } from "../redux/agentSlice";
import { useDispatch } from "react-redux";
import {
  addTicket,
  fetchTickets,
  addComment,
  changeTicketStatus,
  assignAgent,
  deleteTicket,
} from "../redux/ticketSlice";
import SendIcon from "@mui/icons-material/Send";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import dayjs from "dayjs";

function SupportTicket() {
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 3;
  const { customers } = useSelector((state) => state.customers);
  const { orders } = useSelector((state) => state.orders);
  const { tickets, status } = useSelector((state) => state.tickets);
  const { agents } = useSelector((state) => state.agents);
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCustomers());
    dispatch(fetchOrders());
    dispatch(fetchTickets());
    dispatch(fetchAgents());
    setRefresh(false);
  }, [dispatch, refresh]);

  // console.log("Customers:", customers);
  // console.log("Orders:", orders);
  // console.log("Tickets:", tickets);
  console.log("Agents:", agents);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("recent");
  const [expandedTicket, setExpandedTicket] = useState(null);
  const [commentText, setCommentText] = useState({
    comment: "",
    addedDate: null,
  });

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

  const addCommentToTicket = () => {
    console.log("Comment Text: ", commentText);
    dispatch(addComment(commentText)).then(() => setRefresh(true));
    setCommentText({
      comment: "",
      addedDate: null,
    });
  };

  const filteredTickets = tickets
    .filter((ticket) => {
      const matchFilter =
        filter === "all" ||
        (filter === "open" && ticket.status === "open") ||
        (filter === "closed" && ticket.status === "closed") ||
        (filter === "pending" && ticket.status === "pending");
      const createdOn = ticket?.createdDate
        ? dayjs(ticket.createdDate).format("DD/MM/YYYY")
        : "";
      const resolvedOn = ticket?.resolutionDate
        ? dayjs(ticket.resolutionDate).format("DD/MM/YYYY")
        : "";
      const matchSearch =
        ticket._id.toString().includes(searchQuery) ||
        ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        createdOn.includes(searchQuery) ||
        resolvedOn.includes(searchQuery);
      return matchFilter && matchSearch;
    })
    .sort((a, b) => {
      const dateA = dayjs(a.createdDate);
      const dateB = dayjs(b.createdDate);

      if (sortOrder === "recent") {
        return dateB.isAfter(dateA) ? 1 : -1;
      } else if (sortOrder === "oldest") {
        return dateA.isAfter(dateB) ? 1 : -1;
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
  const [ticketStatusUpdate, setTicketStatusUpdate] = useState({
    ticketId: "",
    status: "",
  });

  const handleAssignAgent = (e, inputValue, ticketId) => {
    e.preventDefault();
    console.log("Assign Agent: ", inputValue);
    console.log("Ticket id: ", ticketId);
    dispatch(assignAgent({ agentId: inputValue._id, ticketId: ticketId }));
  };
  const handleUpdateTicketStatus = () => {
    console.log("Ticket Status Update: ", ticketStatusUpdate);
    dispatch(changeTicketStatus(ticketStatusUpdate)).then(() =>
      setRefresh(true)
    );
    setTicketStatusUpdate({
      ticketId: "",
      status: "",
    });
  };

  const handleDeleteTicket = (ticketId) => {
    // console.log("Delete Ticket: ", ticketId);
    dispatch(deleteTicket(ticketId));
  };
  return (
    <>
      <h4 className="my-2">Support Tickets</h4>
      <Box 
  display="flex" 
  flexDirection={{ xs: "column", md: "row" }} 
  justifyContent="space-between" 
  className="my-3"
>
  <Box flex="1" pr={{ xs: 0, md: 2 }}>
    <TextField
      id="searchTickets"
      label="Search tickets by Id, title, created date, or resolved date(DD/MM/YYYY)"
      variant="outlined"
      onChange={(e) => setSearchQuery(e.target.value)}
      fullWidth
    />
  </Box>
  <Box>
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
    >
      
    </Button>
  </Box>
</Box>

      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        justifyContent="evenly"
      >
        <Box
          display="flex"
          justifyContent="space-between"
          flex="1"
        >
          <Button
            variant="outlined"
            sx={{
              "&:hover": {
                backgroundColor: "cyan",
                color: "black",
              },
            }}
            onClick={() => handleFilterChange("all")}
          >
            All
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
            onClick={() => setSortOrder("oldest")}
          >
            Oldest
          </Button>
        </Box>

        <Box display="flex" justifyContent="space-between" flex="1"
        sx={{ml:{xs:0, md:2}}}
        >
          <Button
            variant="outlined"
            sx={{
              "&:hover": {
                backgroundColor: "red",
                color: "white",
              },
            }}
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
            onClick={() => handleFilterChange("pending")}
          >
            Pending
          </Button>
        </Box>
      </Box>

      {currentTickets.map((ticket, index) => (
        <div className="row my-3" key={ticket._id}>
          <div className="col-12">
            <Accordion
              expanded={expandedTicket === ticket._id}
              onChange={() =>
                setExpandedTicket(
                  ticket._id === expandedTicket ? null : ticket._id
                )
              }
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                style={{ padding: "0 10px" }}
              >
                <Box display="flex" justifyContent="space-between" width="100%">
                  <Typography>{index + 1}</Typography>
                  <Typography>{ticket?.title}</Typography>
                  <Typography>Status: {ticket?.status}</Typography>
                  <Typography>
                    <IconButton>
                      <DeleteIcon
                        onClick={() => handleDeleteTicket(ticket._id)}
                      />
                    </IconButton>
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                {ticket?.resolutionDate && (
                  <Box
                    display={"flex"}
                    justifyContent={"flex-start"}
                    className="mt-1 mb-1"
                    sx={{
                      backgroundColor: "lightgreen",
                    }}
                  >
                    <p>
                      Resolution Date:
                      {ticket?.resolutionDate
                        ? dayjs(ticket?.resolutionDate).format(
                            "DD/MM/YYYY HH:mm:ss"
                          )
                        : "N/A"}
                    </p>
                  </Box>
                )}
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  sx={{
                    backgroundColor: "Highlight",
                    WebkitTapHighlightColor: "transparent",
                    borderRadius: "5px",
                  }}
                >
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

                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  className="mt-2"
                >
                  <Typography variant="body1">Description:</Typography>
                </Box>
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  className="mt-2"
                  sx={{
                    backgroundColor: "Highlight",
                    WebkitTapHighlightColor: "transparent",
                    borderRadius: "5px",
                  }}
                >
                  <p>{ticket?.description}</p>
                </Box>

                <br />
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  className="mt-2"
                  sx={{
                    backgroundColor: "Highlight",
                    borderRadius: "5px",
                  }}
                >
                  <p>
                    Created on:{" "}
                    {ticket?.createdDate
                      ? dayjs(ticket?.createdDate).format("DD/MM/YYYY HH:mm:ss")
                      : "N/A"}
                  </p>
                  <p>
                    Created By :{" "}
                    {agents.find((a) => a._id === ticket?.createdBy)?.username}
                  </p>
                  <p>
                    Assigned To:{" "}
                    {ticket?.assignedTo
                      ? agents.find((a) => a._id === ticket?.assignedTo)
                          ?.username
                      : "N/A"}
                  </p>
                </Box>
                <Box display={"flex"} className="mt-3">
                  <FormControl fullWidth variant="outlined" className="p-2">
                    <InputLabel id="status-select-label">
                      Ticket Status
                    </InputLabel>
                    <Select
                      labelId="status-select-label"
                      value={ticketStatusUpdate?.status || ticket?.status}
                      onChange={(e) => {
                        e.preventDefault();
                        console.log("Status: ", e.target.value);
                        setTicketStatusUpdate({
                          ...ticketStatusUpdate,
                          ticketId: ticket._id,
                          status: e.target.value,
                        });
                      }}
                      aria-label="status-select"
                    >
                      <MenuItem value="open">Open</MenuItem>
                      <MenuItem value="closed">Closed</MenuItem>
                      <MenuItem value="pending">Pending</MenuItem>
                    </Select>
                  </FormControl>
                  <Button
                    variant="contained"
                    color="secondary"
                    className="ms-2 mt-2"
                    sx={{
                      height: "3.2rem",
                    }}
                    onClick={handleUpdateTicketStatus}
                  >
                    Update
                  </Button>
                </Box>
                <Box display={"flex"} className="mt-2 mb-2">
                  <Autocomplete
                    id="assigned-to"
                    fullWidth
                    getOptionLabel={(option) => option.username}
                    options={agents}
                    value={agents.find((a) => a._id === ticket?.assignedTo)}
                    onChange={(e, newValue) => {
                      e.preventDefault();
                      if (newValue) {
                        handleAssignAgent(e, newValue, ticket._id);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Assign to agent..."
                        variant="outlined"
                        fullWidth
                      />
                    )}
                  />
                </Box>
                <Accordion expanded={expandedTicket === ticket._id}>
                  <AccordionSummary>
                    <Typography>Comments</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box
                      display={"flex"}
                      justifyContent={"space-between"}
                      className="my-2"
                      width={"100%"}
                    >
                      <TextField
                        variant="filled"
                        fullWidth
                        label="Add a comment"
                        value={commentText.comment}
                        onChange={(e) => {
                          e.preventDefault();
                          setCommentText({
                            ...commentText,
                            comment: e.target.value,
                            addedDate: dayjs(),
                            ticketId: ticket._id,
                          });
                        }}
                      />
                      <Button
                        variant="outlined"
                        startIcon={<SendIcon />}
                        className="ms-1"
                        onClick={addCommentToTicket}
                      />
                      {/* <IconButton variant="outlined" startIcon={<SendIcon/>} onClick={()=>console.log("Send")}/> */}
                    </Box>
                    {ticket?.comments?.length > 0 ? (
                      ticket?.comments?.map((comment) => (
                        <Box
                          display={"flex"}
                          flexDirection={"column"}
                          className="my-2"
                          sx={{
                            backgroundColor: "lightgrey",
                            WebkitTapHighlightColor: "transparent",
                            borderRadius: "5px",
                            padding: "1rem",
                          }}
                        >
                          <Box display={"flex"}>
                            <AccountCircleIcon
                              sx={{ color: "green", fontSize: "1.5rem" }}
                            />
                            <Typography
                              variant="p"
                              sx={{ ml: 1, fontWeight: "bold" }}
                            >
                              {
                                agents.find((a) => a._id === comment?.userId)
                                  ?.username
                              }
                            </Typography>
                            <Typography
                              variant="p"
                              className="ms-2"
                              sx={{ color: "gray", fontSize: "0.8rem" }}
                            >
                              {comment?.addedDate
                                ? dayjs(comment?.addedDate).format(
                                    "DD/MM/YYYY HH:mm:ss"
                                  )
                                : "N/A"}
                            </Typography>
                          </Box>
                          <Box display={"flex"} className="mt-2">
                            <Typography variant="body1" sx={{ ml: 1 }}>
                              {comment?.comment}{" "}
                            </Typography>
                          </Box>
                        </Box>
                      ))
                    ) : (
                      <Typography variant="body1">No comments yet</Typography>
                    )}
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
