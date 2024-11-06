import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Checkbox,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import TrashIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  fetchAgents,
  addAgent,
  changeAgentPassword,
  updateAgentPermission,
  deleteAgent,
} from "../redux/agentSlice";

// const initialAgents = [
//   {
//     id: 1,
//     name: "John Doe",
//     contactNumber: "123-456-7890",
//     email: "john.doe@example.com",
//     ticketsResolved: 25,
//     ticketsPending: 5,
//     ticketsAssigned: 10,
//     permissions: {
//       orders: { read: true, write: true, delete: false },
//       customers: { read: true, write: false, delete: false },
//       productsAndServices: { read: true, write: false, delete: false },
//       supportTicketsAll: false,
//     },
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     contactNumber: "987-654-3210",
//     email: "jane.smith@example.com",
//     ticketsResolved: 30,
//     ticketsPending: 2,
//     ticketsAssigned: 12,
//     permissions: {
//       orders: { read: true, write: false, delete: true },
//       customers: { read: true, write: true, delete: true },
//       productsAndServices: { read: true, write: true, delete: false },
//       supportTicketsAll: true,
//     },
//   },
// ];

function AgentInfo() {
  const dispatch = useDispatch();
  const allAgents = useSelector((state) => state.agents.agents);
  // const [agents, setAgents] = useState(initialAgents);
  const [editedPermissions, setEditedPermissions] = useState({});
  const [editAgentId, setEditAgentId] = useState(false);
  useEffect(() => {
    dispatch(fetchAgents());
  }, [dispatch]);
  // console.log(allAgents);

  const handlePermissionChange = (agentId, category, permission) => (event) => {
    const updatedPermissions = {
      ...editedPermissions,
      [category]: {
        ...editedPermissions[category],
        [permission]: event.target.checked,
      },
    };
  
    setEditedPermissions(updatedPermissions);
    // console.log("Updated Permissions State:", updatedPermissions);
  };

  const handleEditClick = (agentId) => {
    setEditAgentId(true);
    const currentAgent = allAgents.find((agent) => agent._id === agentId);
    setEditedPermissions({...currentAgent.permissions});
  };

  const handleSaveClick = (agentId) => {

    dispatch(updateAgentPermission({agentId:agentId, permissions:editedPermissions }));
    setEditAgentId(false);
    setEditedPermissions({});
  };

  const [addAgentDialog, setAddAgentDialog] = useState(false);
  const handleAddAgentClick = () => {
    setAddAgentDialog(true);
  };

  const [userName, setUserName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [permissions, setPermissions] = useState({
    orders: { read: true, write: true, delete: false },
    customers: { read: true, write: true, delete: false },
    productsAndServices: { read: true, write: false, delete: false },
    supportTickets: true,
  });

  const [userNameError, setUserNameError] = useState(false);
  const [contactNumberError, setContactNumberError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const handleUserNameChange = (event) => {
    event.preventDefault();
    const username = event.target.value;
    // console.log(username);
    if (/^[a-zA-Z0-9]+$/.test(username)) {
      setUserName(username);
      setUserNameError(false);
    } else {
      setUserNameError(true);
    }
  };

  const handleEmailChange = (event) => {
    event.preventDefault();
    const email = event.target.value;
    if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      setEmail(email);
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  };

  const handleContactNumberChange = (event) => {
    event.preventDefault();
    const contactNumber = event.target.value;
    if (/^[0-9]{10}$/.test(contactNumber)) {
      setContactNumber(contactNumber);
      setContactNumberError(false);
    } else {
      setContactNumberError(true);
    }
  };

  const setInitialPermissions = (event) => {
    event.preventDefault();
    switch (event.target.id) {
      case "order-permission-read-new":
        setPermissions({
          ...permissions,
          orders: {
            ...permissions.orders,
            read: event.target.checked,
          },
        });
        break;
      case "customer-permission-read-new":
        setPermissions({
          ...permissions,
          customers: {
            ...permissions.customers,
            read: event.target.checked,
          },
        });
        break;
      case "product-permission-read-new":
        setPermissions({
          ...permissions,
          productsAndServices: {
            ...permissions.productsAndServices,
            read: event.target.checked,
          },
        });
        break;
      case "order-permission-write-new":
        setPermissions({
          ...permissions,
          orders: {
            ...permissions.orders,
            write: event.target.checked,
          },
        });
        break;
      case "customer-permission-write-new":
        setPermissions({
          ...permissions,
          customers: {
            ...permissions.customers,
            write: event.target.checked,
          },
        });
        break;
      case "product-permission-write-new":
        setPermissions({
          ...permissions,
          productsAndServices: {
            ...permissions.productsAndServices,
            write: event.target.checked,
          },
        });
        break;
      case "order-permission-delete-new":
        setPermissions({
          ...permissions,
          orders: {
            ...permissions.orders,
            delete: event.target.checked,
          },
        });
        break;
      case "customer-permission-delete-new":
        setPermissions({
          ...permissions,
          customers: {
            ...permissions.customers,
            delete: event.target.checked,
          },
        });
        break;
      case "product-permission-delete-new":
        setPermissions({
          ...permissions,
          productsAndServices: {
            ...permissions.productsAndServices,
            delete: event.target.checked,
          },
        });
        break;
      case "support-ticket-all-permission-new":
        setPermissions({
          ...permissions,
          supportTicketsAll: event.target.checked,
        });
        break;
      default:
        break;
    }
    // console.log(permissions);
  };

  const handleAddAgentClose = () => {
    setAddAgentDialog(false);
    setUserName("");
    setContactNumber("");
    setEmail("");
    setPermissions({
      orders: { read: true, write: true, delete: false },
      customers: { read: true, write: true, delete: false },
      productsAndServices: { read: true, write: false, delete: false },
      supportTicketsAll: true,
    });
    setUserNameError(false);
    setContactNumberError(false);
    setEmailError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userNameError || contactNumberError || emailError) {
      toast.error("Please enter valid details");
      return;
    }
    if (userName === "" || contactNumber === "" || email === "") {
      toast.error("Please enter all required fields");
      return;
    }
    // console.log(contactNumber);
    const newAgent = {
      username: userName,
      email: email,
      contactNumber: contactNumber,
      permissions: permissions,
    };
    dispatch(addAgent(newAgent));
    handleAddAgentClose();
  };

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPasswordError, setCurrentPasswordError] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const handleCurrentPasswordChange = (event) => {
    event.preventDefault();
    const currentPassword = event.target.value;
    if (currentPassword === "") {
      setCurrentPasswordError(true);
    } else {
      setCurrentPassword(currentPassword);
      setCurrentPasswordError(false);
    }
  };
  const handleNewPasswordChange = (event) => {
    event.preventDefault();
    const newPassword = event.target.value;
    if (/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{12,20}$/.test(newPassword)) {
      setNewPassword(newPassword);
      setNewPasswordError(false);
    } else {
      setNewPasswordError(true);
    }
  };

  const handleConfirmPasswordChange = (event) => {
    event.preventDefault();
    const confirmPassword = event.target.value;
    if (confirmPassword === "" || confirmPassword !== newPassword) {
      setConfirmPasswordError(true);
    } else {
      setConfirmPassword(confirmPassword);
      setConfirmPasswordError(false);
    }
  };

  const handlePasswordReset = (event, agentId) => {
    event.preventDefault();
    if (currentPasswordError || newPasswordError || confirmPasswordError) {
      toast.error("Please enter valid details");
      return;
    } else {
      // console.log(currentPassword, newPassword, confirmPassword);
      // console.log(agentId);
      dispatch(changeAgentPassword({ agentId, currentPassword, newPassword }));
    }
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setCurrentPasswordError(false);
    setNewPasswordError(false);
    setConfirmPasswordError(false);
  };

  const handleDeleteClick = (agentId) => {
    dispatch(deleteAgent(agentId));
  }

  return (
    <>
      <Box
        className="my-2 p-0"
        display={"flex"}
        justifyContent={"space-between"}
      >
        <h5>Support Agents</h5>
        <Button
          variant="oulined"
          startIcon={<GroupAddIcon />}
          sx={{
            "&:hover": {
              backgroundColor: "green",
              color: "white",
            },
            fontSize: "3rem",
          }}
          onClick={handleAddAgentClick}
        />
      </Box>
      {allAgents?.map((agent, index) => (
        <Accordion key={agent._id} className="my-2">
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box
              display={"flex"}
              justifyContent={"center"}
              width={"100%"}
              flex={"wrap"}
            >
              {/* <Typography className="me-2" variant="h6">{index+1}</Typography> */}
              <Typography
                className="me-2"
                variant="h6"
              >{`${agent.username}`}</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              width={"100%"}
              className="mt-1 mb-3"
            >
              <Typography
                className="me-2"
                variant="body1"
              >{`Contact Number:${agent?.contactNumber ? agent.contactNumber : "N/A"}`}</Typography>
              <Typography variant="body1">{`Email : ${agent?.email ? agent.email : "N/A"}`}</Typography>
            </Box>

            {/* <Box
              display={"flex"}
              justifyContent={"space-between"}
              width={"100%"}
            >
              <Typography>{`Tickets Resolved: `}</Typography>
              <Typography>{`Tickets Pending: `}</Typography>
              <Typography>{`Tickets Assigned: `}</Typography>
            </Box> */}
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              width={"100%"}
              className="mt-2"
            >
              <div>
                <Typography className="me-0 d-inline-block" variant="body2">
                  Orders Read
                </Typography>
                <Checkbox
                  id={`order-permission-read-${agent._id}`}
                  checked={editAgentId ? editedPermissions.orders.read : agent.permissions.orders.read}
                  onChange={handlePermissionChange(agent.id, "orders", "read")}
                  disabled={!editAgentId}
                />
              </div>
              <div>
                <Typography className="me-0 d-inline-block" variant="body2">
                  Customers Read
                </Typography>
                <Checkbox
                  id={`customer-permission-read-${agent._id}`}
                  checked={editAgentId ? editedPermissions.customers.read : agent.permissions.customers.read}
                  onChange={handlePermissionChange(
                    agent.id,
                    "customers",
                    "read"
                  )}
                  disabled={!editAgentId}
                />
              </div>
              <div>
                <Typography className="me-0 d-inline-block" variant="body2">
                  Products and Services Read
                </Typography>
                <Checkbox
                  id={`product-permission-read-${agent._id}`}
                  checked={editAgentId ? editedPermissions.productsAndServices.read : agent.permissions.productsAndServices.read }
                  onChange={handlePermissionChange(
                    agent.id,
                    "productsAndServices",
                    "read"
                  )}
                  disabled={!editAgentId}
                />
              </div>
            </Box>

            <Box
              display={"flex"}
              justifyContent={"space-between"}
              width={"100%"}
              className="mt-2"
            >
              <div>
                <Typography className="me-0 d-inline-block" variant="body2">
                  Orders Write
                </Typography>
                <Checkbox
                  id={`order-permission-write-${agent._id}`}
                  checked={editAgentId? editedPermissions.orders.write : agent.permissions.orders.write}
                  onChange={handlePermissionChange(
                    agent._id,
                    "orders",
                    "write"
                  )}
                  disabled={!editAgentId}
                />
              </div>
              <div>
                <Typography className="me-0 d-inline-block" variant="body2">
                  Customers Write
                </Typography>
                <Checkbox
                  id={`customer-permission-write-${agent._id}`}
                  checked={editAgentId ? editedPermissions.customers.write : agent.permissions.customers.write }
                  onChange={handlePermissionChange(
                    agent._id,
                    "customers",
                    "write"
                  )}
                  disabled={!editAgentId}
                />
              </div>
              <div>
                <Typography className="me-0 d-inline-block" variant="body2">
                  Products and Services Write
                </Typography>
                <Checkbox
                  id={`product-permission-write-${agent._id}`}
                  checked={editAgentId? editedPermissions.productsAndServices.write : agent.permissions.productsAndServices.write }
                  onChange={handlePermissionChange(
                    agent._id,
                    "productsAndServices",
                    "write"
                  )}
                  disabled={!editAgentId}
                />
              </div>
            </Box>

            <Box
              display={"flex"}
              justifyContent={"space-between"}
              width={"100%"}
              className="mt-2"
            >
              <div>
                <Typography className="me-0 d-inline-block" variant="body2">
                  Orders Delete
                </Typography>
                <Checkbox
                  id={`order-permission-delete-${agent._id}`}
                  checked={editAgentId? editedPermissions?.orders?.delete: agent.permissions.orders.delete}
                  onChange={handlePermissionChange(
                    agent._id,
                    "orders",
                    "delete"
                  )}
                  disabled={!editAgentId}
                />
              </div>
              <div>
                <Typography className="me-0 d-inline-block" variant="body2">
                  Customers Delete
                </Typography>
                <Checkbox
                  id={`customer-permission-delete-${agent._id}`}
                  checked={editAgentId? editedPermissions?.customers?.delete: agent.permissions.customers.delete }
                  onChange={handlePermissionChange(
                    agent._id,
                    "customers",
                    "delete"
                  )}
                  disabled={!editAgentId}
                />
              </div>
              <div>
                <Typography className="me-0 d-inline-block" variant="body2">
                  Products and Services Delete
                </Typography>
                <Checkbox
                  id={`product-permission-delete-${agent._id}`}
                  checked={editAgentId? editedPermissions?.productsAndServices?.delete: agent.permissions.productsAndServices.delete }
                  onChange={handlePermissionChange(
                    agent._id,
                    "productsAndServices",
                    "delete"
                  )}
                  disabled={!editAgentId}
                />
              </div>
            </Box>

            <Box
              fullWidth
              className="mt-2"
              display={"flex"}
              justifyContent={"center"}
            >
              <div>
                <Typography className="me-0 d-inline-block" variant="body2">
                  All Support Ticket Permissions
                </Typography>
                <Checkbox
                  id={`support-ticket-all-permission-${agent._id}`}
                  checked={ editAgentId ? editedPermissions.supportTickets : agent.permissions.supportTickets}
                  onChange={handlePermissionChange(
                    agent._id,
                    "supportTickets",
                    "supportTickets"
                  )}
                  disabled={!editAgentId}
                />
              </div>
            </Box>

            <Box display={"flex"} justifyContent={"center"} className="mt-2">
              {editAgentId ? (
                <Button variant="contained" onClick={()=>handleSaveClick(agent._id)}>
                  Save Permissions
                </Button>
              ) : (
                <Button variant="contained" onClick={()=>handleEditClick(agent._id)}>
                  Update Permissions
                </Button>
              )}

              <Button
                variant="outlined"
                startIcon={<TrashIcon />}
                className="ms-2"
                sx={{
                  "&:hover": {
                    backgroundColor: "red",
                    color: "white",
                  },
                  color: "red",
                }}
                onClick={()=>handleDeleteClick(agent._id)}
              />
            </Box>
            <Accordion className="mt-2">
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className="me-2" variant="h6">
                  ChangePassword
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box
                  display={"flex"}
                  justifyContent={"space-evenly"}
                  sx={{
                    flexDirection: {
                      xs: "column",
                      sm: "row",
                    },
                  }}
                >
                  <Box display={"flex"} flexDirection={"column"}>
                    <TextField
                      label="Current Password"
                      className="mt-2"
                      variant="outlined"
                      type="password"
                      fullWidth
                      onChange={handleCurrentPasswordChange}
                    />
                    {currentPasswordError && (
                      <p className="text-danger">
                        Please enter a valid current password
                      </p>
                    )}
                  </Box>
                  <Box display={"flex"} flexDirection={"column"}>
                    <TextField
                      label="New Password"
                      className="mt-2"
                      variant="outlined"
                      type="password"
                      fullWidth
                      onChange={handleNewPasswordChange}
                    />
                    {newPasswordError && (
                      <p className="text-danger">
                        invalid new password, add a strong password
                      </p>
                    )}
                  </Box>
                  <Box display={"flex"} flexDirection={"column"}>
                    <TextField
                      label="Confirm Password"
                      className="mt-2"
                      variant="outlined"
                      type="password"
                      fullWidth
                      onChange={handleConfirmPasswordChange}
                    />
                    {confirmPasswordError && (
                      <p className="text-danger">Passwords do not match</p>
                    )}
                  </Box>
                  <Box
                    sx={{
                      marginTop: {
                        xs: "10px",
                        sm: "0px",
                      },
                      padding: {
                        sm: "10px 0px",
                      },
                    }}
                  >
                    <Button
                      variant="contained"
                      label="save"
                      fullWidth
                      disabled={
                        currentPasswordError ||
                        newPasswordError ||
                        confirmPasswordError
                      }
                      onClick={(e) => {
                        handlePasswordReset(e, agent._id);
                      }}
                    >
                      UPDATE PASSWORD
                    </Button>
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
          </AccordionDetails>
        </Accordion>
      ))}
      <Dialog
        open={addAgentDialog}
        onClose={handleAddAgentClose}
        aria-labelledby="form-add-agent"
      >
        <DialogTitle>Add New Support Agent</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new support agent, please enter their name, contact number,
            email, and any initial permissions. A password will be generated and
            sent to the agent's email
          </DialogContentText>
          <TextField
            label="User Name"
            fullWidth
            className="mt-2"
            required
            onChange={handleUserNameChange}
          />
          {userNameError && (
            <p className="text-danger">Please enter a valid user name</p>
          )}
          <TextField
            label="Contact Number"
            fullWidth
            className="mt-2"
            required
            onChange={handleContactNumberChange}
          />
          {contactNumberError && (
            <p className="text-danger">Please enter a valid contact number</p>
          )}
          <TextField
            label="Email"
            fullWidth
            className="mt-2"
            required
            onChange={handleEmailChange}
          />
          {emailError && (
            <p className="text-danger">Please enter a valid email</p>
          )}
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            className="mt-2"
          >
            <div>
              <p className="me-0 d-inline-block">Orders Read</p>
              <Checkbox
                id="order-permission-read-new"
                checked={permissions.orders.read}
                onChange={setInitialPermissions}
              />
            </div>
            <div>
              <p className="me-0 d-inline-block">Customers Read</p>
              <Checkbox
                id="customer-permission-read-new"
                checked={permissions.customers.read}
                onChange={setInitialPermissions}
              />
            </div>
            <div>
              <p className="me-0 d-inline-block">Products and Services Read</p>
              <Checkbox
                id="product-permission-read-new"
                checked={permissions.productsAndServices.read}
                onChange={setInitialPermissions}
              />
            </div>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <div>
              <p className="me-0 d-inline-block">Orders Write</p>
              <Checkbox
                id="order-permission-write-new"
                checked={permissions.orders.write}
                onChange={setInitialPermissions}
              />
            </div>
            <div>
              <p className="me-0 d-inline-block">Customers Write</p>
              <Checkbox
                id="customer-permission-write-new"
                checked={permissions.customers.write}
                onChange={setInitialPermissions}
              />
            </div>
            <div>
              <p className="me-0 d-inline-block">Products and Services Write</p>
              <Checkbox
                id="product-permission-write-new"
                checked={permissions.productsAndServices.write}
                onChange={setInitialPermissions}
              />
            </div>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <div>
              <p className="me-0 d-inline-block">Orders Delete</p>
              <Checkbox
                id="order-permission-delete-new"
                checked={permissions.orders.delete}
                onChange={setInitialPermissions}
              />
            </div>
            <div>
              <p className="me-0 d-inline-block">Customers Delete</p>
              <Checkbox
                id="customer-permission-delete-new"
                checked={permissions.customers.delete}
                onChange={setInitialPermissions}
              />
            </div>
            <div>
              <p className="me-0 d-inline-block">
                Products and Services Delete
              </p>
              <Checkbox
                id="product-permission-delete-new"
                checked={permissions.productsAndServices.delete}
                onChange={setInitialPermissions}
              />
            </div>
          </Box>
          <Box
            fullWidth
            className="mt-2"
            display={"flex"}
            justifyContent={"space-between"}
          >
            <Button
              variant="outlined"
              label="cancel"
              onClick={handleAddAgentClose}
              sx={{
                "&:hover": {
                  backgroundColor: "red",
                  color: "white",
                },
              }}
            >
              cancel
            </Button>
            <Button
              variant="outlined"
              label="add"
              onClick={handleSubmit}
              sx={{
                "&:hover": {
                  backgroundColor: "green",
                  color: "white",
                },
              }}
            >
              add
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AgentInfo;
