import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  IconButton,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Autocomplete,
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

import { fetchProductsServices, addProductsServices, editProductsServices, deleteProductsServices } from "../redux/productsAndServicesSlice";
import { useDispatch, useSelector } from "react-redux";

function ProductsAndServices() {
  const [open, setOpen] = useState(false);
  const [showSSL, setShowSSL] = useState(false);
  const [showWebsite, setShowWebsite] = useState(false);
  const [showServer, setShowServer] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedRow, setEditedRow] = useState(null);
  const dispatch = useDispatch();
  const {items, status} = useSelector((state)=>state.productsAndServices);

  const [filteredRows, setFilteredRows] = useState(items);
  
  const handleClickOpen = () => {
    setOpen(true);
    setIsEditing(false);
    setEditedRow(null);
    setFormData({
      serviceName: "",
      domain: "",
      sslCert: false,
      website: false,
      server: false,
      emailServer: false,
      duration: "",
      price: "",
    });
  };

  const handleClose = () => {
    setOpen(false);
    setShowEmail(false);
    setShowServer(false);
    setShowWebsite(false);
    setShowSSL(false);
    setIsEditing(false);
  };
  const [sslCertProviders, setSslCertProviders] = useState([]);
  const [websiteHostProviders, setWebsiteHostProviders] = useState([]);
  const [serverProviders, setServerProviders] = useState([]);
  const [emailProviders, setEmailProviders] = useState([]);

  
  useEffect(()=>{
    dispatch(fetchProductsServices());
   
  }, [dispatch])
  useEffect(()=>{
    setFilteredRows(items);
  },[items])
  useEffect(()=>{
    if(items && items.length>0){
      setSslCertProviders([...new Set(items.map((item) => item.sslCertProvider).filter((item)=>item !== undefined && item!== null && item!==""))])
      setWebsiteHostProviders([...new Set(items.map((item) => item.websiteHostProvider).filter((item)=>item !== undefined && item!== null && item!==""))])
      setServerProviders([...new Set(items.map((item) => item.serverProvider).filter((item)=>item !== undefined && item!== null && item!==""))])
      setEmailProviders([...new Set(items.map((item) => item.emailProvider).filter((item)=>item !== undefined && item!== null && item!==""))])
    }
  },[items])
  // console.log("SSL Cert Providers",sslCertProviders);
  // console.log("Website Host Providers",websiteHostProviders);
  // console.log("Server Providers",serverProviders);
  // console.log("Email Providers",emailProviders);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    serviceName : "",
    domain:"",
    sslCert : false,
    website: false,
    server:false,
    emailServer: false,
    duration:"",
    price:""
  })

  const columns = [
    { field: "serviceName", headerName: "Service Name", minWidth: 150 },
    { field: "domain", headerName: "Domain", minWidth: 50 },
    { field: "server", headerName: "Server", minWidth: 50 , type:"boolean", },
    { field: "sslCert", headerName: "SSL Certificate", minWidth: 50 , type:"boolean",},
    { field: "website", headerName: "Website", minWidth: 50 , type:"boolean",},
    { field : "emailServer", headerName: "Email", minWidth: 50 , type:"boolean",},
    { field: "serverProvider", headerName : "Server Provider", minWidth: 150 , renderCell: (params) => (<span>{params.value || "N/A"}</span>)},
    {field: "serverCapacity", headerName: "Server Capacity", minWidth: 150, renderCell: (params) => (<span>{params.value || "N/A"}</span>)},
    { field: "sslCertProvider", headerName : "SSL Certificate Provider", minWidth: 150 , renderCell: (params) => (<span>{params.value || "N/A"}</span>)},
    { field: "websiteHostProvider", headerName : "Website Hosting Provider", minWidth: 150, renderCell: (params) => (<span>{params.value || "N/A"}</span>) },
    
    { field: "emailProvider", headerName: "Email Service Provider", minWidth: 150, renderCell: (params) => (<span>{params.value || "N/A"}</span>) },
    { field: "numberOfUsers", headerName: "Number of Users", minWidth: 150, renderCell: (params) => (<span>{params.value || "N/A"}</span>) },
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
    // console.log("Edit:", row);
    setOpen(true);
    setIsEditing(true);
    setEditedRow(row);
    setFormData({
      serviceName: row.serviceName,
      domain: row.domain,
      sslCert: row.sslCert,
      website: row.website,
      server: row.server,
      emailServer: row.emailServer,
      duration: row.duration,
      price: row.price,
      sslCertProvider: row.sslCertProvider || "",
      websiteHostProvider: row.websiteHostProvider || "",
      serverProvider: row.serverProvider || "",
      emailProvider: row.emailProvider || "",
      numberOfUsers: row.numberOfUsers || 0,
      serverCapacity: row.serverCapacity || "",
    });
    setShowSSL(row.sslCert);
    setShowWebsite(row.website);
    setShowServer(row.server);
    setShowEmail(row.emailServer);
  };

  const handleDelete = (row) => {
    // console.log("Delete:", row);
    dispatch(deleteProductsServices(row._id));
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filteredRows = items.filter((row) => {
      return Object.values(row).some((field) =>
        String(field).toLowerCase().includes(value)
      );
    });

    setFilteredRows(filteredRows);
  };

  const handleAddOrEditProducts = (e) => { 
    e.preventDefault();
    if(isEditing){
      // console.log("Edit:", editedRow._id, "formdata:",formData)
      dispatch(editProductsServices({id:editedRow._id, updatedProduct:formData}))
      
    }else{
      setShowSSL(false);
      setShowWebsite(false);
      setShowServer(false);
      setShowEmail(false);
      // console.log("Add:", formData);
      dispatch(addProductsServices(formData))
    }
    handleClose();
  }

  return (
    <>
      <h4>Products and Services</h4>
      <Box display={"flex"} sx={{paddingRight:"10px"}}>
          <Box sx={{width:"95%"}}>
          <TextField
            variant="outlined"
            label="Search for products and services"
            sx={{ width: "100%" }}
            value={searchTerm}
            onChange={handleSearch}
          />
          </Box>
          <Box>
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
        </Box>
      </Box>
      <Box sx={{
              height: 500,
              width: "100%",
              maxWidth: "95vw",
              margin: "0 auto",
              overflow: "hidden",
            }}>
      <DataGrid
            rows={filteredRows}
            getRowId={(row)=>row._id}
            columns={columns}
            pageSize={20}
            rowsPerPageOptions={[5]}
            checkboxSelection={false}
            disableSelectionOnClick
          />
      </Box>
      {/* <div className="row mt-2">
        <div className="col-md-10">
          
        </div>
        <div className="col-md-2">

        </div>
      </div>

      <div className="row mt-2">
        <div className="col-md-12" style={{ height: 500, width: "100%" }}>

        </div>
      </div> */}

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleAddOrEditProducts
        }}
      >
        <DialogTitle>{isEditing ? "Edit Product/Service" : "Add Products and Services"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {isEditing? "Edit the details of the product or service you want to edit.":" Add the details of the product or service you want to add."}
           
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
            value={formData.serviceName}
            onChange={(e)=> setFormData({...formData, serviceName:e.target.value})}
          />
          <TextField
            required
            margin="dense"
            variant="outlined"
            fullWidth
            id="domain"
            name="domain"
            label="Domain Extension"
            type="text"
            className="mt-2"
            value={formData.domain}
            onChange={(e)=> setFormData({...formData, domain:e.target.value})}
          />

          <div className="d-flex flex-column flex-md-row mt-2">
            <div>
              <Checkbox
                name="sslCert"
                checked={formData.sslCert}
                onChange={(e) =>{
                setFormData({...formData, sslCert: e.target.checked, sslCertProvider:""});
                setShowSSL(e.target.checked)}}
              />
              SSL Certificate
            </div>
            <div>
              <Checkbox
                name="website"
                checked={formData.website}
                onChange={(e) => {setShowWebsite(!showWebsite);
                  setFormData({...formData, website: e.target.checked, websiteHostProvider:""});
                  setShowWebsite(e.target.checked)
                }}
              />
              Website
            </div>
            <div>
              <Checkbox
                name="server"
                checked={formData.server}

                onChange={(e) => {setShowServer(!showServer);
                  setFormData({...formData, server: e.target.checked, serverProvider:"", serverCapacity:""});
                  setShowServer(e.target.checked)
                }}
              />
              Server
            </div>
            <div>
              <Checkbox
                name="email"
                checked={formData.emailServer}

                onChange={(e) => {setShowEmail(!showEmail);
                  setFormData({...formData, emailServer: e.target.checked, emailProvider:"", numberOfUsers:0});
                  setShowEmail(e.target.checked)
                }}
              />
              Email Server
            </div>
          </div>

          {showSSL && (
            <>
              <Autocomplete
                freeSolo
                id="sslcert-provider"
                options={sslCertProviders}
                fullWidth
                className="mt-2"
                value={formData.sslCertProvider}
                onInputChange={(e, newValue) => {
                  if(newValue){
                    // console.log(newValue);
                    setFormData({...formData, sslCertProvider: newValue || ""})
                  }
                }}
                renderInput={(params) => (
                  <TextField {...params} label="SSL Certificate Provider" variant="outlined" />
                )}/>
            </>
          )}

          {showWebsite && (
            <>

            <Autocomplete
              id="website-host-provider"
              options={websiteHostProviders}
              fullWidth
              freeSolo
              className="mt-2"
              value={formData.websiteHostProvider}
              onInputChange={(e, value) =>{
                if(value){
                 setFormData({...formData, websiteHostProvider: value || ""})}
                }
              }
              renderInput={(params) => (
                <TextField {...params} label="Website Hosting Provider" variant="outlined" />
              )}/>
            </>
          )}

          {showServer && (
            <>

            <Autocomplete
              id="server-provider"
              options={serverProviders}
              fullWidth
              freeSolo
              className="mt-2"
              value={formData.serverProvider}
              onInputChange={(e, value) => {
                if(value){
                  setFormData({...formData, serverProvider: value || ""})}
                }
              }
              renderInput={(params) => (
                <TextField {...params} label="Server Provider" variant="outlined" />
              )}/>
              

              <TextField
                variant="outlined"
                fullWidth
                id="serverCapacity"
                name="serverCapacity"
                label="Server Capacity/Specifications"
                type="text"
                className="mt-2"
                value={formData.serverCapacity}
                onChange={(e) => setFormData({...formData, serverCapacity: e.target.value})}
              />
            </>
          )}

          {showEmail && (
            <>

            <Autocomplete
              id="email-provider"
              options={emailProviders}
              fullWidth
              freeSolo
              className="mt-2"
              value={formData.emailProvider}
              onInputChange={(e, value) => {
                if(value){
                  setFormData({...formData, emailProvider: value || ""})}
                }
              }
              renderInput={(params) => (
                <TextField {...params} label="Email Server Provider" variant="outlined" />
              )}/>
              
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
                value={formData.numberOfUsers}
                onChange={(e) => setFormData({...formData, numberOfUsers: parseInt(e.target.value) || 0})}
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
            value={formData.duration}
            onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value) || 0})}
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
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: parseInt(e.target.value)})}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">{isEditing? "Save Changes" : "Add Product/Service"}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ProductsAndServices;
