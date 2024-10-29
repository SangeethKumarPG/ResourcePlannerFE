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
import DeleteIcon from "@mui/icons-material/Delete";
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
import { addOrder, fetchOrders, renewOrder, deleteOrder } from "../redux/ordersSlice";
import dayjs from "dayjs";
import "./Orders.css";

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

  const [isEditing, setIsEditing] = useState(false);
  const [isRenew, setIsRenew] = useState(false);
  const [renewState, setRenewState] = useState(false);
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
 
  const handleAddOrEditOrder = (e) => {
    e.preventDefault();
    if (isEditing) {
      //Editing logic
      // console.log("Editing order : ", formData);
      dispatch(renewOrder(formData)).then(() => setRefresh(true));
      setIsEditing(false);
      setIsRenew(false);
      setRenewState(false);
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
    } else {
      //Add logic
      // console.log("Submitting form data : ", formData);
      dispatch(addOrder(formData)).then(() => setRefresh(true));
    }
    handleCloseAddOrderDialog();
  };

  const handleDelete=(order)=>{
    dispatch(deleteOrder(order._id)).then(() => setRefresh(true));
  }

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
  const handleOpen = (user) => {
    const userDetails = customers.filter((customer) => customer._id === user.userId)
    setCurrentUser(userDetails[0])
    setOpen(true);
  }
  const handleClose = () => {
    setCurrentUser(null);
    setOpen(false);
  }
  const [currentUser, setCurrentUser]= useState(null);
  const [openDialler, setOpenDialler] = useState(false);
  const handleOpenDialler = (order) => {
    const user = customers.filter((customer) => customer._id === order.userId)
    setCurrentUser(user[0])
    // console.log("Current user : ", user);
    setOpenDialler(true);
  }
  const handleCloseDialler = () =>{
    setCurrentUser(null);
    setOpenDialler(false);
  } 

  const handleVisitProfile = (customer) => {
    setSelectedCustomer(customer);
    setSelectedView(2);
  };

  const [searchText, setSearchText] = useState("");

  const filteredRows = orders.filter((row) => {
    const formattedPaymentDate = row.paymentDate?dayjs(row.paymentDate).format('DD/MM/YYYY') : '';
    const formattedOrderDate = row.startDate ?dayjs(row.startDate).format('DD/MM/YYYY') : '';
    const formattedExpiryDate = row.expiryDate?dayjs(row.expiryDate).format('DD/MM/YYYY') : '';
    return (
      row.domainName.toLowerCase().includes(searchText.toLowerCase()) ||
      row.userName.toLowerCase().includes(searchText.toLowerCase()) ||
      row.planName.toLowerCase().includes(searchText.toLowerCase()) ||
      formattedPaymentDate.includes(searchText) ||
      formattedOrderDate.includes(searchText) ||
      formattedExpiryDate.includes(searchText)
    );
  });
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
        <a href="#" onClick={()=> handleOpen(params.row)}>
          {params.value}
        </a>
      ),
    },
    {
      field: "startDate",
      headerName: "Start Date",
      width: 150,
      renderCell: (params) => {
        const date = dayjs(params.value);
        if (date.isValid()) {
          return date.format("DD/MM/YYYY");
        } else {
          return "Invalid date";
        }
      },
    },
    {
      field: "expiryDate",
      headerName: "Expiry",
      width: 150,
      renderCell: (params) => {
        const date = dayjs(params.value);
        if (date.isValid()) {
          return date.format("DD/MM/YYYY");
        } else {
          return "Invalid date";
        }
      },
    },
    {
      field:"paymentStatus",
      headerName: "Payment Status",
      width: 150
    },
    {
      field:"paymentDate",
      headerName: "Payment Date",
      width: 150,
      renderCell: (params) => {
        if(!params.value){
          return "Not Paid";
        }
        const date = dayjs(params.value);
        if (date.isValid()) {
          return date.format("DD/MM/YYYY");
        } else {
          return "Invalid date";
        }
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <DeleteIcon onClick={()=>handleDelete(params.row)} />
          <AutorenewIcon onClick={() => handleRenew(params.row)} />
          <LocalPhoneIcon onClick={()=>handleOpenDialler(params.row)} />
        </div>
      ),
    },
  ];

  const [addOrderDialog, setAddOrderDialog] = useState(false);
  const handleAddOrderDialog = () => {
    setAddOrderDialog(true);
  };


  const handleRenew = (order) => {
    setIsEditing(true);
    setAddOrderDialog(true);
    const date = dayjs(order.expiryDate);
    if (date.isValid()) {
      const differrence_in_days = date.diff(dayjs(), "days");
      if (differrence_in_days < 7) {
        setIsRenew(true);
        setFormData({
          _id: order._id,
          domainName: order.domainName,
          userName: order.userName,
          userId: order.userId,
          plan: order.plan,
          planName: order.planName,
          price: order.price,
          duration: order.duration,
          thirdPartyDomain: order.thirdPartyDomain,
          startDate: dayjs(order.startDate),
          expiryDate: dayjs(order.expiryDate),
        });
      }else{
        setFormData({
          _id : order._id,
          domainName: order.domainName,
          userName: order.userName,
          userId: order.userId,
          plan: order.plan,
          planName: order.planName,
          price: order.price,
          duration: order.duration,
          thirdPartyDomain: order.thirdPartyDomain,
          startDate: dayjs(order.startDate),
          expiryDate: dayjs(order.expiryDate),
        });
      }
    }
  };

  const handleCloseAddOrderDialog = () => {
    if(isEditing){
      setIsEditing(false);
      setIsRenew(false);
      setRenewState(false);
    }
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
          getRowClassName={(params) => {
            const date = dayjs(params.row.expiryDate);
            if (date.isValid()) {
              const differrence_in_days = date.diff(dayjs(), "days");
              if (differrence_in_days < 0) {
                return "expired-row";
              } else if (differrence_in_days > 0 && differrence_in_days <= 3) {
                return "expiring-soon-row";
              } else if (differrence_in_days == 0) {
                return "expiring-today-row";
              }
            }
            return "";
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
                {currentUser?.username} <br />
              </div>
            </Typography>
            <Typography sx={{ mt: 2 }}>
              <div className="container">
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <p>Contact number: {currentUser?.phone}</p>
                  <p>Address: {currentUser?.address}</p>
                  <br />
                </div>
              </div>
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  handleVisitProfile({
                    name: `${currentUser.username}`,
                    email: `${currentUser.email}`,
                    phone: `${currentUser.phone}`,
                    userId : `${currentUser._id}`,
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
                href={currentUser?.phone}
                style={{ textDecoration: "none", color: "black" }}
              >
                <LocalPhoneIcon />
              </a>{" "}
              {currentUser?.phone}
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
        <DialogTitle>
          {" "}
          {isEditing ? "Renew Order/Edit Order" : "Add new order"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {isEditing
              ? isRenew
                ? "Renew the order with the selected plan"
                : "Update the order with new plan"
              : "Add the details of the new order"}
          </DialogContentText>
          {isRenew && 
            <div>
              <Checkbox
                checked={renewState}
                onChange={(e) => {
                  e.preventDefault();
                  setRenewState(e.target.checked);
                  setFormData({
                    ...formData,
                    startDate: dayjs(),
                    expiryDate: dayjs().add(formData.duration, "month"),
                  });
                }}
              />
              <Typography variant="p" className="mt-2">Renew Existing Plan</Typography>
            </div>
          }
          <TextField
            label="Domain name"
            fullWidth
            value={formData.domainName}
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
              {isEditing ? "Update" : "Add"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Orders;
