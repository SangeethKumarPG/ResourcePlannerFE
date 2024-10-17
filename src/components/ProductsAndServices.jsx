import React, { useState } from "react";
import {
  TextField,
  Button,
  IconButton,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

function ProductsAndServices() {
  const [open, setOpen] = useState(false);
  const [showSSL, setShowSSL] = useState(false);
  const [showWebsite, setShowWebsite] = useState(false);
  const [showServer, setShowServer] = useState(false);
  const [showEmail, setShowEmail] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const initialRows = [
    {
      id: 1,
      serviceName: "Service A",
      domain: "servicea.com",
      server: "AWS",
      sslCert: "✅",
      website: "https://servicea.com",
      serviceProvider: "AWS",
      numberOfUsers: 100,
      duration: "12 months",
      price: "$500",
    },
    {
      id: 2,
      serviceName: "Service B",
      domain: "serviceb.com",
      server: "Google Cloud",
      sslCert: "❌",
      website: "https://serviceb.com",
      serviceProvider: "Google",
      numberOfUsers: 50,
      duration: "6 months",
      price: "$300",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [rows, setRows] = useState(initialRows);

  const columns = [
    { field: "serviceName", headerName: "Service Name", minWidth: 150 },
    { field: "domain", headerName: "Domain", minWidth: 150 },
    { field: "server", headerName: "Server", minWidth: 150 },
    { field: "sslCert", headerName: "SSL Certificate", minWidth: 150 },
    { field: "website", headerName: "Website", minWidth: 200 },
    { field: "serviceProvider", headerName: "Service Provider", minWidth: 150 },
    { field: "numberOfUsers", headerName: "Number of Users", minWidth: 150 },
    { field: "duration", headerName: "Duration", minWidth: 150 },
    { field: "price", headerName: "Price", minWidth: 150 },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      renderCell: (params) => (
        <>
          <IconButton color="primary" onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton
            color="secondary"
            onClick={() => handleDelete(params.row)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
      sortable: false,
      filterable: false,
    },
  ];

  const handleEdit = (row) => {
    console.log("Edit:", row);
  };

  const handleDelete = (row) => {
    console.log("Delete:", row);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filteredRows = initialRows.filter((row) => {
      return Object.values(row).some((field) =>
        String(field).toLowerCase().includes(value)
      );
    });

    setRows(filteredRows);
  };

  return (
    <>
      <h4>Products and Services</h4>
      <div className="row mt-2">
        <div className="col-md-10">
          <TextField
            variant="outlined"
            label="Search for products and services"
            sx={{ width: "100%" }}
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="col-md-2">
          <Button
            variant="outlined"
            sx={{
              width: "100%",
              height: "100%",
              "&:hover": {
                backgroundColor: "green",
                color: "white",
              },
            }}
            onClick={handleClickOpen}
          >
            <AddBusinessIcon />
          </Button>
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-md-12" style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection={false}
            disableSelectionOnClick
          />
        </div>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            console.log(formJson);
            handleClose();
          },
        }}
      >
        <DialogTitle>Add Products and Services</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add the details of the product or service you want to add.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="serviceName"
            label="Service Name"
            type="text"
            fullWidth
            variant="outlined"
            className="mt-2"
          />
          <TextField
            required
            margin="dense"
            variant="outlined"
            fullWidth
            id="domain"
            name="domain"
            label="Domain"
            type="text"
            className="mt-2"
          />

          <div className="d-flex flex-column flex-md-row mt-2">
            <div>
              <Checkbox
                name="sslCert"
                checked={showSSL}
                onChange={() => setShowSSL(!showSSL)}
              />
              SSL Certificate
            </div>
            <div>
              <Checkbox
                name="website"
                checked={showWebsite}
                onChange={() => setShowWebsite(!showWebsite)}
              />
              Website
            </div>
            <div>
              <Checkbox
                name="server"
                checked={showServer}
                onChange={() => setShowServer(!showServer)}
              />
              Server
            </div>
            <div>
              <Checkbox
                name="email"
                checked={showEmail}
                onChange={() => setShowEmail(!showEmail)}
              />
              Email Server
            </div>
          </div>

          {showSSL && (
            <>
            <FormControl   variant="outlined"   fullWidth>
            <InputLabel id="sslCertProvider" className="mt-2">
                SSL Certificate Provider
              </InputLabel>
              <Select
                labelId="sslCertProvider"
                id="sslCertProvider"
                label="SSL Certificate Provider"
                variant="outlined"
                fullWidth
              >
                <MenuItem value="godaddy">GoDaddy</MenuItem>
                <MenuItem value="comodo">Comodo</MenuItem>
                <MenuItem value="symantec">Symantec</MenuItem>
                <MenuItem value="cloudflare">Cloud Flare</MenuItem>
              </Select>
            </FormControl>
              
            </>
          )}

          {showWebsite && (
            <>
              <TextField
                variant="outlined"
                fullWidth
                id="website"
                name="website"
                label="Website URL"
                className="mt-2"
              />
            </>
          )}

          {showServer && (
            <>
            <FormControl   variant="outlined"   fullWidth className="mt-2">
            <InputLabel id="serverProvider" className="mt-2">
                Server Provider
              </InputLabel>
              <Select
                labelId="serverProvider"
                id="serverProvider"
                variant="outlined"
                label="Server Provider"
                fullWidth
              >
                <MenuItem value="aws">AWS</MenuItem>
                <MenuItem value="azure">Azure</MenuItem>
                <MenuItem value="google">Google</MenuItem>
                <MenuItem value="hostinger">Hostinger</MenuItem>
                <MenuItem value="godaddy">GoDaddy</MenuItem>
                <MenuItem value="digitalocean">Digital Ocean</MenuItem>
                <MenuItem value="rackspace">Rackspace</MenuItem>
                <MenuItem value="linode">Linode</MenuItem>
              </Select>
            </FormControl>
              

              <TextField
                variant="outlined"
                fullWidth
                id="serverCapacity"
                name="serverCapacity"
                label="Server Capacity/Specifications"
                type="text"
                className="mt-2"
              />
            </>
          )}

          {showEmail && (
            <>
            <FormControl   variant="outlined"   fullWidth className="mt-2">
            <InputLabel id="emailServerProvider" className="mt-2">
                Email Server Provider
              </InputLabel>
              <Select
                labelId="emailServerProvider"
                id="emailServerProvider"
                variant="outlined"
                name="emailServerProvider"
                fullWidth
                className="mt-2"
              >
                <MenuItem value="microsoft">Microsoft</MenuItem>
                <MenuItem value="google">Google</MenuItem>
                <MenuItem value="hostinger">Hostinger</MenuItem>
              </Select>

            </FormControl>
              
              <TextField
                margin="dense"
                required
                id="numberOfUsers"
                name="numberOfUsers"
                label="Number of Users"
                type="number"
                fullWidth
                variant="outlined"
                className="mt-2"
              />
            </>
          )}

          <TextField
            margin="dense"
            required
            id="duration"
            name="duration"
            label="Duration (Months)"
            type="number"
            fullWidth
            variant="outlined"
            className="mt-2"
          />
          <TextField
            margin="dense"
            required
            id="price"
            name="price"
            label="Price"
            type="number"
            fullWidth
            variant="outlined"
            className="mt-2"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add Product/Service</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ProductsAndServices;
