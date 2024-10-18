import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import LanguageIcon from "@mui/icons-material/Language";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import StorageIcon from "@mui/icons-material/Storage";
import ShieldIcon from "@mui/icons-material/Shield";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { Button, Dialog, DialogContentText, DialogContent, DialogTitle, FormControl, InputLabel, Select, MenuItem, Autocomplete } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function Orders({ setSelectedCustomer, setSelectedView }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const profileStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openDialler, setOpenDialler] = useState(false);
  const handleOpenDialler = () => setOpenDialler(true);
  const handleCloseDialler = () => setOpenDialler(false);

  const handleVisitProfile = (customer) => {
    setSelectedCustomer(customer);
    setSelectedView(2);
  };

  const [searchText, setSearchText] = useState("");
  const [rows] = useState([
    {
      id: 1,
      domainName: "example.com",
      services: ["Language", "Email", "Shield", "Storage", "Web"],
      userName: "User Name",
      expiry: "12/12/2024",
    },
    {
      id: 2,
      domainName: "example.google.com",
      services: ["Language", "Shield", "Web"],
      userName: "Demo",
      expiry: "12/12/2024",
    },
    {
      id: 3,
      domainName: "example.com",
      services: ["Language", "Shield", "Storage"],
      userName: "User Name",
      expiry: "12/12/2024",
    },
  ]);

  const filteredRows = rows.filter(
    (row) =>
      row.domainName.toLowerCase().includes(searchText.toLowerCase()) ||
      row.userName.toLowerCase().includes(searchText.toLowerCase()) ||
      row.services.some((service) =>
        service.toLowerCase().includes(searchText.toLowerCase())
      )
  );

  const columns = [
    { field: "id", headerName: "#", width: 70 },
    { field: "domainName", headerName: "Domain Name", width: 200 },
    {
      field: "services",
      headerName: "Services",
      width: 300,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <LanguageIcon />
          <AlternateEmailIcon
            style={{ opacity: params.row.services.includes("Email") ? 1 : 0.2 }}
          />
          <ShieldIcon />
          <StorageIcon
            style={{
              opacity: params.row.services.includes("Storage") ? 1 : 0.2,
            }}
          />
          <WebAssetIcon />
        </div>
      ),
    },
    {
      field: "userName",
      headerName: "User Name",
      width: 200,
      renderCell: (params) => (
        <a href="#" onClick={handleOpen}>
          {params.value}
        </a>
      ),
    },
    { field: "expiry", headerName: "Expiry", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <MoreHorizIcon />
          <AutorenewIcon />
          <LocalPhoneIcon onClick={handleOpenDialler} />
        </div>
      ),
    },
  ];

  const [addOrderDialog, setAddOrderDialog] = useState(false);
  const handleAddOrderDialog = () => {
    setAddOrderDialog(true);
  };

  const handleCloseAddOrderDialog = () => {
    setAddOrderDialog(false);
  };

  const [selectedPlan, setSeletedPlan] = useState(null);
  const planOptions = [
    {
      plan: "Basic",
      price: 100,
    },
    {
      plan: "Pro",
      price: 200,   
    },
    {
      plan: "Enterprise",
      price: 500,
    }
  ]
  const [selectedUser, setSelectedUser] = useState(null);
  const usersList = [
    {
      username: "User Name1",
      address: "123, ABC, PQR, IN",
      email: "example@user.com",
      phone: "+91-9876543210",
    },
    {
      username: "User Name2",
      address: "456, XYZ, DEF, US",
      email: "example@user.com",
      phone: "+91-9876543210",
    },
    {
      username: "User Name3",
      address: "789, PQR, DEF, UK",
      email: "example@user.com",
      phone: "+91-9876543210",
    },
    {
      username: "User Name4",
      address: "101, ABC, XYZ, AU",
      email: "example@user.com",
      phone: "+91-9876543210",
    }
  ]

  return (
    <>
      <h4>Orders</h4>
      <div className="row mb-3 mt-3">
        <div className="col-md-10 ps-0">
          <TextField
            variant="outlined"
            placeholder="Search by domain name, username or service"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        </div>
        <div className="col-md-2 ps-0">
          <Button
            variant="outlined"
            color="primary"
            sx={{ width: "100%", height: "100%", '&:hover':{
              backgroundColor:'green',
                color:'white',
            } }}
            onClick={handleAddOrderDialog}
          >
            <AddIcon />
          </Button>
        </div>
      </div>
      <div style={{ height: 400, width: "100%", marginTop: "2rem" }}>
        <DataGrid rows={filteredRows} columns={columns} pageSize={5} />
      </div>

      <div>
        <Modal open={open} onClose={handleClose}>
          <Box sx={profileStyle}>
            <Typography variant="h4">
              <div className="d-flex align-items-center justify-content-center">
                <AccountCircleRoundedIcon sx={{ fontSize: "80px" }} />
              </div>
            </Typography>
            <Typography variant="h6">
              <div className="d-flex flex-column align-items-center justify-content-center">
                User Name <br />
              </div>
            </Typography>
            <Typography sx={{ mt: 2 }}>
              <div className="container">
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <p>Contact number: +91-9876543210</p>
                  <p>Address: 123, ABC, PQR, IN</p>
                  <br />
                </div>
              </div>
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  handleVisitProfile({
                    name: "User Name",
                    email: "example@user.com",
                    phone: "+91-9876543210",
                  })
                }
                sx={{ width: "100%" }}
              >
                Visit profile
              </Button>
            </Typography>
            <Button onClick={handleClose} sx={{ width: "100%" }}>
              Close
            </Button>
          </Box>
        </Modal>
      </div>

      <div>
        <Modal open={openDialler} onClose={handleCloseDialler}>
          <Box sx={style}>
            <Typography variant="h6">
              <a
                href="tel:+91-9876543210"
                style={{ textDecoration: "none", color: "black" }}
              >
                <LocalPhoneIcon />
              </a>{" "}
              +91-9876543210
            </Typography>
          </Box>
        </Modal>
      </div>
      <Dialog open={addOrderDialog} onClose={handleCloseAddOrderDialog} fullWidth>
        <DialogTitle>Add new order</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter the details of the new order:</DialogContentText>
          <TextField
            label="Domain name"
            fullWidth
            variant="outlined"
            className="mt-2"/>
          <Autocomplete
            className="mt-2"
            value={selectedPlan}
            onChange={(event, newValue)=>setSeletedPlan(newValue)}
            options={planOptions}
            getOptionLabel={(planOptions)=>planOptions.plan}
            renderInput={(params)=>(
              <TextField variant="outlined" label="Select plan" {...params}/>
            )}
            isOptionEqualToValue={(option, value)=>option.plan===value.plan}
            />
            {selectedPlan && <Typography variant="p" className="mt-2">Price: ${selectedPlan.price}</Typography>}
            <Autocomplete
            className="mt-2"
            value={selectedUser}
            onChange={(event, newValue)=>setSelectedUser(newValue)}
            options={usersList}
            getOptionLabel={(usersList)=>usersList.username}
            renderInput={(params)=>(
              <TextField variant="outlined" label="Select the user" {...params}/>
            )}
            isOptionEqualToValue={(option,value)=>option.username===value.username}
            />
            <div className="d-flex align-items-center justify-content-between mt-3">
              <Button variant="outlined" 
              sx={{
                '&:hover':{
                  backgroundColor:'red',
                  color:'white',
                }
              }}
              onClick={handleCloseAddOrderDialog}>Cancel</Button>
              <Button variant="outlined" 
              sx={{
                '&:hover':{
                  backgroundColor:'green',
                  color:'white',
                }
              }}
              onClick={handleCloseAddOrderDialog}>Add</Button>
            </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Orders;
