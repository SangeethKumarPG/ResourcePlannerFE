import React, { useState, useEffect } from "react";
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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Button,
  Dialog,
  DialogContentText,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  Checkbox,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { fetchCustomers } from "../redux/customerSlice";
import { fetchProductsServices } from "../redux/productsAndServicesSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addOrder, fetchOrders } from "../redux/ordersSlice";
import dayjs from "dayjs";
import './Orders.css'

function Orders({ setSelectedCustomer, setSelectedView }) {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.productsAndServices);
  const { customers } = useSelector((state) => state.customers);
  const [refresh, setRefresh] = useState(false);
  const { orders } = useSelector((state) => state.orders);
  useEffect(() => {
    if (status === "idle" || refresh) {
      dispatch(fetchProductsServices());
      dispatch(fetchCustomers());
      dispatch(fetchOrders());
      setRefresh(false);
    }
  }, [status, refresh, dispatch]);

  const currentDate = new Date();
  const date = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const dateString = date + "/" + month + "/" + year;
  const [formData, setFormData] = useState({
    domainName: "",
    userName: "",
    userId: "",
    plan: "",
    planName: "",
    price: "",
    duration: "",
    thirdPartyDomain: false,
    startDate: dayjs(),
  });
  const [isEditing, setIsEditing] = useState(false);
  const handleAddOrEditOrder = (e) => {
    e.preventDefault();
    if (isEditing) {
      //Editing logic
    } else {
      //Add logic
      // console.log("Submitting form data : ", formData);
      dispatch(addOrder(formData)).then(() => setRefresh(true));
    }
    handleCloseAddOrderDialog();
  };

  // console.log("Customers : ", customers);
  // console.log("Form data : ",formData);
  // console.log("Formatted Date : ",formData.startDate.format('DD/MM/YYYY'));
  // console.log("Orders : ", orders);

  // console.log("Items : ", items);
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

  const filteredRows = orders.filter(
    (row) =>
      row.domainName.toLowerCase().includes(searchText.toLowerCase()) ||
      row.userName.toLowerCase().includes(searchText.toLowerCase()) ||
      row.planName.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    { field: "domainName", headerName: "Domain Name", width: 200 },
    {
      field: "services",
      headerName: "Services",
      width: 300,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <LanguageIcon
            style={{ opacity: params.row.thirdPartyDomain ? 0.2 : 1 }}
          />
          <AlternateEmailIcon
            style={{ opacity: params.row.emailServer ? 1 : 0.2 }}
          />
          <ShieldIcon style={{ opacity: params.row.sslCert ? 1 : 0.2 }} />
          <StorageIcon
            style={{
              opacity: params.row.server ? 1 : 0.2,
            }}
          />
          <WebAssetIcon style={{ opacity: params.row.website ? 1 : 0.2 }} />
        </div>
      ),
    },
    { field: "planName", headerName: "Plan Name", width: 160 },
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
    { field: "startDate", headerName: "Start Date", width: 150,
      renderCell :(params)=>{
       const date = dayjs(params.value)
       if(date.isValid()){
        return date.format('DD/MM/YYYY');
       }else{
        return "Invalid date";
       }
      }
     },
    { field: "expiryDate", headerName: "Expiry", width: 150,
      renderCell : (params)=>{
        const date = dayjs(params.value);
        if(date.isValid()){
          return date.format('DD/MM/YYYY');
        }else{
          return "Invalid date";
        }
      }

     },
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
    setFormData({
      domainName: "",
      userName: "",
      userId: "",
      plan: "",
      planName: "",
      price: "",
      duration: "",
      thirdPartyDomain: false,
      startDate: dayjs(),
    });
  };

  const [selectedPlan, setSeletedPlan] = useState(null);

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
    },
  ];

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
            sx={{
              width: "100%",
              height: "100%",
              "&:hover": {
                backgroundColor: "green",
                color: "white",
              },
            }}
            onClick={handleAddOrderDialog}
          >
            <AddIcon />
          </Button>
        </div>
      </div>
      <div style={{ height: 500, width: "100%", marginTop: "2rem" }}>
        <DataGrid
          rows={filteredRows}
          getRowId={(row) => row._id}
          columns={columns}
          pageSize={5}
          getRowClassName={(params)=>{
            const date = dayjs(params.row.expiryDate);
            if(date.isValid()){
              const differrence_in_days = date.diff(dayjs(), 'days');
              if(differrence_in_days < 0){
                return 'expired-row'
              }else if(differrence_in_days > 0 && differrence_in_days <= 3){
                return 'expiring-soon-row'
              }else if(differrence_in_days == 0){
                return 'expiring-today-row'
              }
            }
            return '';
           

          }}
        />
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
      <Dialog
        open={addOrderDialog}
        onClose={handleCloseAddOrderDialog}
        fullWidth
        PaperProps={{
          component: "form",
          onSubmit: handleAddOrEditOrder,
        }}
      >
        <DialogTitle>Add new order</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the details of the new order:
          </DialogContentText>
          <TextField
            label="Domain name"
            fullWidth
            onChange={(e) => {
              setFormData({ ...formData, domainName: e.target.value });
            }}
            variant="outlined"
            className="mt-2"
          />
          <div className="d-flex mt-2 align-items-center justify-content-start">
            <Typography variant="p">
              Domain belongs to a third party vendor?
            </Typography>
            <Checkbox
              id="thrid-party-domain"
              checked={formData.thirdPartyDomain}
              onChange={(e) =>
                setFormData({ ...formData, thirdPartyDomain: e.target.checked })
              }
            />
          </div>

          <Autocomplete
            className="mt-2"
            value={
              formData.planName
                ? { serviceName: formData.planName, _id: formData.plan }
                : null
            }
            onChange={(event, newValue) => {
              if (newValue) {
                setFormData({
                  ...formData,
                  planName: newValue.serviceName,
                  plan: newValue._id,
                  price: newValue.price,
                  duration: newValue.duration,
                  expiryDate: formData.startDate
                    ? formData.startDate.add(newValue.duration, "month")
                    : null,
                  sslCert: newValue.sslCert ? newValue.sslCert : false,
                  website: newValue.website ? newValue.website : false,
                  emailServer: newValue.emailServer
                    ? newValue.emailServer
                    : false,
                  server: newValue.server ? newValue.server : false,
                });
              } else {
                setFormData({
                  ...formData,
                  planName: "",
                  plan: "",
                  price: 0,
                  duration: 0,
                  expiryDate: null,
                });
              }
            }}
            options={items}
            getOptionLabel={(planOptions) => planOptions.serviceName}
            renderInput={(params) => (
              <TextField variant="outlined" label="Select plan" {...params} />
            )}
            isOptionEqualToValue={(option, value) => option._id === value._id}
          />

          {formData?.price && (
            <Typography variant="p" className="mt-2">
              Price: ${formData?.price},
            </Typography>
          )}
          {formData?.expiryDate && (
            <Typography variant="p" className="mt-2">
              {" "}
              Plan Expiry Date:{" "}
              {typeof formData.expiryDate === "string"
                ? formData.expiryDate
                : formData.expiryDate.format("DD/MM/YYYY")}
            </Typography>
          )}

          <Autocomplete
            className="mt-2 mb-2"
            value={
              formData.userName
                ? { username: formData.userName, _id: formData.userId }
                : null
            }
            onChange={(event, newValue) => {
              if (newValue) {
                setFormData({
                  ...formData,
                  userName: newValue.username,
                  userId: newValue._id,
                });
              } else {
                setFormData({ ...formData, userName: "", userId: "" });
              }
            }}
            options={customers}
            getOptionLabel={(usersList) => usersList.username}
            renderInput={(params) => (
              <TextField
                variant="outlined"
                label="Select the user"
                {...params}
              />
            )}
            isOptionEqualToValue={(option, value) => option._id === value._id}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start date"
              value={formData.startDate}
              onChange={(newValue) => {
                setFormData({
                  ...formData,
                  startDate: newValue,
                  expiryDate: newValue
                    ? dayjs(newValue).add(formData.duration, "month")
                    : null,
                });
              }}
              format="DD/MM/YYYY"
              sx={{ width: "100%" }}
            />
          </LocalizationProvider>
          <div className="d-flex align-items-center justify-content-between mt-3">
            <Button
              variant="outlined"
              sx={{
                "&:hover": {
                  backgroundColor: "red",
                  color: "white",
                },
              }}
              onClick={handleCloseAddOrderDialog}
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
              Add
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Orders;
