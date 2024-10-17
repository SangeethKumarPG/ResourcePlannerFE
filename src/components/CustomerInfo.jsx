import React, { useState } from "react";
import { Button, Select, MenuItem, TextField, Dialog, DialogTitle, DialogContentText, DialogContent, FormControl, InputLabel } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { DataGrid } from "@mui/x-data-grid";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { MuiTelInput } from "mui-tel-input";

function CustomerInfo({
  selectedCustomer,
  setSelectedCustomer,
  setSelectedView,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [services, setServices] = useState({
    1: ["Web Hosting", "Email", "SSL Certificate"],
    2: ["Web Hosting", "Backup"],
    3: ["Domain Registration", "SSL Certificate"],
  });

  const handleBackNavigation = () => {
    setSelectedCustomer(null);
    setSelectedView(1);
  };

  const handleServiceChange = (customerId, event) => {
    setServices((prevServices) => ({
      ...prevServices,
      [customerId]: event.target.value,
    }));
  };

  const columns = [
    { field: "username", headerName: "Username", width: 150 },
    { field: "address", headerName: "Address", width: 250 },
    { field: "phone", headerName: "Phone Number", width: 150 },
    { field: "email", headerName: "Email Address", width: 250 },
    { field: "isActive", headerName: "Is Active", width: 100, type: "boolean" },
    { field: "domainName", headerName: "Domain Name", width: 250 },
    {
      field: "services",
      headerName: "Selected Services",
      width: 250,
      renderCell: (params) => (
        <Select
          multiple
          value={services[params.row.id] || []}
          onChange={(event) => handleServiceChange(params.row.id, event)}
          renderValue={(selected) => selected.join(", ")}
          fullWidth
        >
          <MenuItem value="Web Hosting">Web Hosting</MenuItem>
          <MenuItem value="Email">Email</MenuItem>
          <MenuItem value="SSL Certificate">SSL Certificate</MenuItem>
          <MenuItem value="Backup">Backup</MenuItem>
          <MenuItem value="Domain Registration">Domain Registration</MenuItem>
        </Select>
      ),
    },
  ];

  const rows = [
    {
      id: 1,
      username: "JohnDoe",
      address: "123 Street, City",
      phone: "9876543210",
      email: "john@example.com",
      isActive: true,
      domainName: "www.test.com",
    },
    {
      id: 2,
      username: "JaneDoe",
      address: "456 Avenue, City",
      phone: "8765432109",
      email: "jane@example.com",
      isActive: false,
      domainName: "www.test2.com",
    },
    {
      id: 3,
      username: "MikeSmith",
      address: "789 Road, City",
      phone: "7654321098",
      email: "mike@example.com",
      isActive: true,
      domainName: "www.test3.com",
    },
  ];

  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  const [addCustomerDialog, setAddCustomerDialog] = useState(false);
  const openAddCustomerDialog=()=>{
    setAddCustomerDialog(true);
  }

  const closeAddCustomerDialog = () => {
    setAddCustomerDialog(false);
  }

  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <>
      <h4>Customer Details</h4>
      {selectedCustomer === null ? (
        <div className="container p-0 mx-0 mt-2">
          <div className="row mt-2">
            <div className="col-md-3">
              {" "}
              <h4>All customers:</h4>
            </div>
            <div className="col-md-3"></div>
            <div className="col-md-3"></div>
            <div className="col-md-3"></div>
          </div>
          <div className="row mt-2">
            <div className="col-md-10">
              <TextField
                variant="outlined"
                placeholder="Search all columns"
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <Button
                variant="outlined"
                startIcon={<PersonAddIcon />}
                sx={{
                  "&:hover": {
                    backgroundColor: "green",
                    color: "white",
                  },
                  width: "100%",
                  height: "100%",
                }}
                onClick={openAddCustomerDialog}
              ></Button>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-md-12">
              <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                  rows={filteredRows}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                />
              </div>
            </div>
          </div>
          <Dialog
            open={addCustomerDialog}
            onClose={closeAddCustomerDialog}
            aria-labelledby="add-customer-dialog-title"
            aria-describedby="add-customer-dialog-description"
            >
              <DialogTitle>Add new customer</DialogTitle>
              <DialogContent>
                <DialogContentText>Enter the details of the new customer:</DialogContentText>
                <TextField
                  label="user name"
                  variant="outlined"
                  fullWidth
                  className="mt-2"
                />
                <TextField
                  label="address"
                  variant="outlined"
                  fullWidth
                  className="mt-2"
                />
                <MuiTelInput
                  label="phone number"
                  variant="outlined"
                  fullWidth
                  value={phoneNumber}
                  onChange={(value) => setPhoneNumber(value)}
                  className="mt-2"/>
                <TextField
                  label="email"
                  variant="outlined"
                  className="mt-2"
                  fullWidth/>
                <TextField
                  label="domain name"
                  variant="outlined"
                  fullWidth
                  className="mt-2"/>
                <FormControl label="plan" fullWidth variant="outlined" className="mt-2">
                  <InputLabel id="plan-label">Select Plan</InputLabel>
                  <Select
                    labelId="plan-label"
                    id="plan-select"
                    fullWidth
                    className="mt-2"
                    label="plan">
                      <MenuItem value="plana">Plan A</MenuItem>
                      <MenuItem value="planb">Plan B</MenuItem>
                      <MenuItem value="planc">Plan C</MenuItem>
                    </Select>

                </FormControl>
                 <div className="d-flex align-items-center justify-content-between mt-3">
                  <Button variant="outlined" onClick={closeAddCustomerDialog}
                  sx={{
                    '&:hover':{
                      backgroundColor: 'red',
                      color: 'white'
                    }
                  }}
                  >close</Button>
                  <Button variant="outlined" onClick={closeAddCustomerDialog}
                  sx={{
                    '&:hover':{
                      backgroundColor: 'green',
                      color: 'white'
                    }
                  }}
                  >add</Button>
                 </div>
                  
              </DialogContent>
            </Dialog>
        </div>
      ) : (
        <div className="row">
          <div className="col-md-12 d-flex flex-column justify-content-center align-items-center mt-5 shadow border rounded p-3">
            <AccountCircleRoundedIcon sx={{ fontSize: 70 }} />
            <p>{selectedCustomer?.name}</p>
            <p>{selectedCustomer?.email}</p>
            <p>{selectedCustomer?.phone}</p>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Domain</th>
                  <th>Provider</th>
                  <th>SSL Cert</th>
                  <th>Email</th>
                  <th>Server</th>
                  <th>Application</th>
                  <th>Start Date</th>
                  <th>Expiry Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>domain a</td>
                  <td>Cloudflare</td>
                  <td>✅</td>
                  <td>❌</td>
                  <td>✅</td>
                  <td>❌</td>
                  <td>01/01/2022</td>
                  <td>01/01/2023</td>
                </tr>
              </tbody>
            </table>

            <Button
              variant="contained"
              onClick={handleBackNavigation}
              sx={{ width: "100%", height: "100%" }}
              className="mt-2"
            >
              GO BACK
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default CustomerInfo;
