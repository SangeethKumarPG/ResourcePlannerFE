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
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import TrashIcon from "@mui/icons-material/Delete";

const initialAgents = [
  {
    id: 1,
    name: "John Doe",
    contactNumber: "123-456-7890",
    email: "john.doe@example.com",
    ticketsResolved: 25,
    ticketsPending: 5,
    ticketsAssigned: 10,
    permissions: {
      orders: { read: true, write: true, delete: false },
      customers: { read: true, write: false, delete: false },
      productsAndServices: { read: true, write: false, delete: false },
      supportTicketsAll: false,
    },
  },
  {
    id: 2,
    name: "Jane Smith",
    contactNumber: "987-654-3210",
    email: "jane.smith@example.com",
    ticketsResolved: 30,
    ticketsPending: 2,
    ticketsAssigned: 12,
    permissions: {
      orders: { read: true, write: false, delete: true },
      customers: { read: true, write: true, delete: true },
      productsAndServices: { read: true, write: true, delete: false },
      supportTicketsAll: true,
    },
  },
];

function AgentInfo() {
  const [agents, setAgents] = useState(initialAgents);
  const [editAgentId, setEditAgentId] = useState(null);

  const handlePermissionChange = (agentId, category, permission) => (event) => {
    setAgents((prevAgents) =>
      prevAgents.map((agent) =>
        agent.id === agentId
          ? {
              ...agent,
              permissions: {
                ...agent.permissions,
                [category]: {
                  ...agent.permissions[category],
                  [permission]: event.target.checked,
                },
              },
            }
          : agent
      )
    );
  };

  const handleEditClick = (agentId) => {
    setEditAgentId(agentId);
  };

  const handleSaveClick = () => {
    setEditAgentId(null);
  };

  const [addAgentDialog, setAddAgentDialog] = useState(false);
  const handleAddAgentClick = () => {
    setAddAgentDialog(true);
  };
  const handleAddAgentClose = () => {
    setAddAgentDialog(false);
  };

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
      {agents.map((agent) => (
        <Accordion key={agent.id} className="my-2">
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              width={"100%"}
              flex={"wrap"}
            >
              <Typography className="me-2" variant="h6">{`Agent ID: ${agent.id}`}</Typography>
              <Typography className="me-2" variant="h6">{`Agent Name: ${agent.name}`}</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              display={"flex"}
              justifyContent={"centerspaced-between"}
              width={"100%"}
              className="mt-1 mb-3"
            >
              <Typography
                className="me-2"
                variant="body1"
              >{`Contact Number:${agent.contactNumber}`}</Typography>
              <Typography variant="body1">{`Email : ${agent.email}`}</Typography>
            </Box>

            <Box
              display={"flex"}
              justifyContent={"space-between"}
              width={"100%"}
            >
              <Typography>{`Tickets Resolved: ${agent.ticketsResolved}`}</Typography>
              <Typography>{`Tickets Pending: ${agent.ticketsPending}`}</Typography>
              <Typography>{`Tickets Assigned: ${agent.ticketsAssigned}`}</Typography>
            </Box>
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
                  id={`order-permission-read-${agent.id}`}
                  checked={agent.permissions.orders.read}
                  onChange={handlePermissionChange(agent.id, "orders", "read")}
                  disabled={editAgentId !== agent.id}
                />
              </div>
              <div>
                <Typography className="me-0 d-inline-block" variant="body2">
                  Customers Read
                </Typography>
                <Checkbox
                  id={`customer-permission-read-${agent.id}`}
                  checked={agent.permissions.customers.read}
                  onChange={handlePermissionChange(
                    agent.id,
                    "customers",
                    "read"
                  )}
                  disabled={editAgentId !== agent.id}
                />
              </div>
              <div>
                <Typography className="me-0 d-inline-block" variant="body2">
                  Products and Services Read
                </Typography>
                <Checkbox
                  id={`product-permission-read-${agent.id}`}
                  checked={agent.permissions.productsAndServices.read}
                  onChange={handlePermissionChange(
                    agent.id,
                    "productsAndServices",
                    "read"
                  )}
                  disabled={editAgentId !== agent.id}
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
                  id={`order-permission-write-${agent.id}`}
                  checked={agent.permissions.orders.write}
                  onChange={handlePermissionChange(agent.id, "orders", "write")}
                  disabled={editAgentId !== agent.id}
                />
              </div>
              <div>
                <Typography className="me-0 d-inline-block" variant="body2">
                  Customers Write
                </Typography>
                <Checkbox
                  id={`customer-permission-write-${agent.id}`}
                  checked={agent.permissions.customers.write}
                  onChange={handlePermissionChange(
                    agent.id,
                    "customers",
                    "write"
                  )}
                  disabled={editAgentId !== agent.id}
                />
              </div>
              <div>
                <Typography className="me-0 d-inline-block" variant="body2">
                  Products and Services Write
                </Typography>
                <Checkbox
                  id={`product-permission-write-${agent.id}`}
                  checked={agent.permissions.productsAndServices.write}
                  onChange={handlePermissionChange(
                    agent.id,
                    "productsAndServices",
                    "write"
                  )}
                  disabled={editAgentId !== agent.id}
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
                  id={`order-permission-delete-${agent.id}`}
                  checked={agent.permissions.orders.delete}
                  onChange={handlePermissionChange(
                    agent.id,
                    "orders",
                    "delete"
                  )}
                  disabled={editAgentId !== agent.id}
                />
              </div>
              <div>
                <Typography className="me-0 d-inline-block" variant="body2">
                  Customers Delete
                </Typography>
                <Checkbox
                  id={`customer-permission-delete-${agent.id}`}
                  checked={agent.permissions.customers.delete}
                  onChange={handlePermissionChange(
                    agent.id,
                    "customers",
                    "delete"
                  )}
                  disabled={editAgentId !== agent.id}
                />
              </div>
              <div>
                <Typography className="me-0 d-inline-block" variant="body2">
                  Products and Services Delete
                </Typography>
                <Checkbox
                  id={`product-permission-delete-${agent.id}`}
                  checked={agent.permissions.productsAndServices.delete}
                  onChange={handlePermissionChange(
                    agent.id,
                    "productsAndServices",
                    "delete"
                  )}
                  disabled={editAgentId !== agent.id}
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
                  id={`support-ticket-all-permission-${agent.id}`}
                  checked={agent.permissions.supportTicketsAll}
                  onChange={handlePermissionChange(
                    agent.id,
                    "supportTicketsAll",
                    "supportTicketsAll"
                  )}
                  disabled={editAgentId !== agent.id}
                />
              </div>
            </Box>

            <Box display={"flex"} justifyContent={"center"} className="mt-2">
              {editAgentId === agent.id ? (
                <Button variant="contained" onClick={handleSaveClick}>
                  Save Permissions
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={() => handleEditClick(agent.id)}
                >
                  Update Permissions
                </Button>
              )}
              {editAgentId !== agent.id && (
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
                />
              )}
            </Box>
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
            email, and any initial permissions.
          </DialogContentText>
          <TextField label="Agent Name" fullWidth className="mt-2" required />
          <TextField
            label="Contact Number"
            fullWidth
            className="mt-2"
            required
          />
          <TextField label="Email" fullWidth className="mt-2" required />
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            className="mt-2"
          >
            <div>
              <p className="me-0 d-inline-block">Orders Read</p>
              <Checkbox id="order-permission-read-new" />
            </div>
            <div>
              <p className="me-0 d-inline-block">Customers Read</p>
              <Checkbox id="customer-permission-read-new" />
            </div>
            <div>
              <p className="me-0 d-inline-block">Products and Services Read</p>
              <Checkbox id="product-permission-read-new" />
            </div>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <div>
              <p className="me-0 d-inline-block">Orders Write</p>
              <Checkbox id="order-permission-write-new" />
            </div>
            <div>
              <p className="me-0 d-inline-block">Customers Write</p>
              <Checkbox id="customer-permission-write-new" />
            </div>
            <div>
              <p className="me-0 d-inline-block">Products and Services Write</p>
              <Checkbox id="product-permission-write-new" />
            </div>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <div>
              <p className="me-0 d-inline-block">Orders Delete</p>
              <Checkbox id="order-permission-delete-new" />
            </div>
            <div>
              <p className="me-0 d-inline-block">Customers Delete</p>
              <Checkbox id="customer-permission-delete-new" />
            </div>
            <div>
              <p className="me-0 d-inline-block">
                Products and Services Delete
              </p>
              <Checkbox id="product-permission-delete-new" />
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
              onClick={handleAddAgentClose}
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
