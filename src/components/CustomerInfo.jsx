import React, { useEffect, useState } from "react";
import {
  Button,
  Select,
  MenuItem,
  TextField,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  FormControl,
  InputLabel,
  Autocomplete,
  Box,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { DataGrid } from "@mui/x-data-grid";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { MuiTelInput } from "mui-tel-input";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  addCustomer,
  fetchCustomers,
  editCustomer,
  deleteCustomer,
} from "../redux/customerSlice";
import { fetchOrders } from "../redux/ordersSlice";
import { fetchProductsServices } from "../redux/productsAndServicesSlice";
import dayjs from "dayjs";

function CustomerInfo({
  selectedCustomer,
  setSelectedCustomer,
  setSelectedView,
}) {
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);
  const { customers, status } = useSelector((state) => state.customers);
  const { orders } = useSelector((state) => state.orders);
  const { items } = useSelector((state) => state.productsAndServices);
  // const [activeOrder, setActiveOrder] = useState([]);
  const [orderRows, setOrderRows] = useState([]);
  const [orderColumns, setOrderColumns] = useState([]);
  // console.log("Items:",items)
  useEffect(() => {
    if (status === "idle" || refresh) {
      dispatch(fetchCustomers());
      dispatch(fetchOrders());
      dispatch(fetchProductsServices());
      setRefresh(false);
    }
  }, [dispatch, status, refresh]);
  // console.log("Customers:", customers);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  // const [activePlans, setActivePlans] = useState([]);

  const handleBackNavigation = () => {
    setSelectedCustomer(null);
    setSelectedView(1);
  };
  useEffect(() => {
    if (selectedCustomer !== null) {
      const activeOrders = orders.filter(
        (order) => order.userId === selectedCustomer.userId
      );

      // setActiveOrder(activeOrders);

      const plans = activeOrders.map((order) => {
        return items.find((item) => item._id === order.plan);
      });
      // setActivePlans(plans);

      if (activeOrders.length > 0 && plans.length > 0) {
        mapDataToGrid(activeOrders, plans);
      } else {
        console.log("No active orders found for this customer");
      }
    }
  }, [selectedCustomer, orders, items]);

  const mapDataToGrid = (activeOrder, activePlans) => {
    // console.log("Active orders:", activeOrder);
    // console.log("Plans:", activePlans);
    const orderColumn = [
      { field: "domainName", headerName: "Domain", width: 150 },
      { field: "planName", headerName: "Plan Name", width: 200 },
      {
        field: "sslCert",
        headerName: "SSL Cert",
        width: 100,
        renderCell: (params) => (params.value ? "✅" : "❌"),
      },
      {
        field: "emailServer",
        headerName: "Email",
        width: 100,
        renderCell: (params) => (params.value ? "✅" : "❌"),
      },
      {
        field: "server",
        headerName: "Server",
        width: 100,
        renderCell: (params) => (params.value ? "✅" : "❌"),
      },
      {
        field: "website",
        headerName: "Application",
        width: 100,
        renderCell: (params) => (params.value ? "✅" : "❌"),
      },
      { field: "paymentStatus", headerName: "Payment Status", width: 150 },
      {
        field: "paymentDate",
        headerName: "Payment Date",
        width: 150,
        renderCell: (params) =>
          params.row.paymentDate
            ? dayjs(params.row.paymentDate).format("DD/MM/YYYY")
            : "N/A",
      },
      {
        field: "startDate",
        headerName: "Start Date",
        width: 150,
        renderCell: (params) =>
          params.row.startDate
            ? dayjs(params.row.startDate).format("DD/MM/YYYY")
            : "N/A",
      },
      {
        field: "expiryDate",
        headerName: "Expiry Date",
        width: 150,
        renderCell: (params) =>
          params.row.expiryDate
            ? dayjs(params.row.expiryDate).format("DD/MM/YYYY")
            : "N/A",
      },
    ];
    const orderRow = activeOrder.map((order) => ({
      id: order._id,
      domainName: order.domainName,
      planName: activePlans.find((item) => item._id === order.plan)
        ?.serviceName,
      sslCert: activePlans.find((item) => item._id === order.plan)?.sslCert,
      emailServer: activePlans.find((item) => item._id === order.plan)
        ?.emailServer,
      server: activePlans.find((item) => item._id === order.plan)?.server,
      website: activePlans.find((item) => item._id === order.plan)?.website,
      paymentStatus: order.paymentStatus,
      paymentDate: order.paymentDate,
      startDate: order.startDate,
      expiryDate: order.expiryDate,
    }));

    // console.log("Order Rows:", orderRow);
    setOrderRows(orderRow);

    setOrderColumns(orderColumn);
    // console.log("Order Columns:", orderColumns);
  };

  const handleEdit = (customer) => {
    console.log(customer);
    setAddCustomerDialog(true);
    setIsEditing(true);
    setFormData({
      _id: customer._id,
      username: customer.username,
      address: customer.address,
      phone: customer.phone,
      email: customer.email,
    });
  };

  const handleDelete = (customer) => {
    // console.log(customer);
    dispatch(deleteCustomer(customer._id)).then(() => setRefresh(true));
  };

  const columns = [
    { field: "username", headerName: "Username", width: 150 },
    { field: "address", headerName: "Address", width: 250 },
    { field: "phone", headerName: "Phone Number", width: 150 },
    { field: "email", headerName: "Email Address", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 200,
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

  const filteredRows = customers.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  const [addCustomerDialog, setAddCustomerDialog] = useState(false);
  const openAddCustomerDialog = () => {
    setIsEditing(false);
    setAddCustomerDialog(true);
    setFormData({
      username: "",
      address: "",
      phone: "",
      email: "",
    });
  };
  const handleAddorEdit = (event) => {
    event.preventDefault();
    if (isEditing) {
      console.log(formData);
      dispatch(editCustomer(formData)).then(() => setRefresh(true));
    } else {
      // console.log(formData);
      dispatch(addCustomer(formData)).then(() => setRefresh(true));
    }
    closeAddCustomerDialog();
  };

  const closeAddCustomerDialog = () => {
    setIsEditing(false);
    setPhoneNumber("");
    setAddCustomerDialog(false);
  };

  const [phoneNumber, setPhoneNumber] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    address: "",
    phone: "",
    email: "",
  });
  return (
    <>
      <h4>Customer Details</h4>
      {selectedCustomer === null ? (
        <Box>
          <Box>
            <h4>All customers:</h4>
          </Box>
          <Box
            display={"flex"}
            sx={{
              paddingRight: "10px",
            }}
          >
            <Box sx={{ width: "95%" }}>
              <TextField
                variant="outlined"
                placeholder="Search all columns"
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Box>
            <Box>
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
            </Box>
          </Box>
          <Box
            sx={{
              height: 500,
              width: "100%",
              maxWidth: "95vw",
              margin: "0 auto",
              overflow: "hidden",
            }}
          >
            <DataGrid
              rows={filteredRows}
              columns={columns}
              getRowId={(row) => row._id}
              pageSize={6}
              rowsPerPageOptions={[5]}
            />
          </Box>
          <Dialog
            open={addCustomerDialog}
            onClose={closeAddCustomerDialog}
            aria-labelledby="add-customer-dialog-title"
            aria-describedby="add-customer-dialog-description"
            PaperProps={{
              component: "form",
              onSubmit: handleAddorEdit,
            }}
          >
            <DialogTitle>
              {isEditing ? "Edit customer details" : "Add new customer"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                {isEditing
                  ? "Edit the details of the customer"
                  : "Enter the details of the new customer"}
              </DialogContentText>
              <TextField
                label="user name"
                variant="outlined"
                fullWidth
                value={formData.username}
                className="mt-2"
                onChange={(e) => {
                  e.preventDefault();
                  setFormData({ ...formData, username: e.target.value });
                }}
              />
              <TextField
                label="address"
                variant="outlined"
                value={formData.address}
                fullWidth
                className="mt-2"
                onChange={(e) => {
                  e.preventDefault();
                  setFormData({ ...formData, address: e.target.value });
                }}
              />
              <MuiTelInput
                label="phone number"
                variant="outlined"
                fullWidth
                value={phoneNumber || formData.phone}
                onChange={(newValue) => {
                  setPhoneNumber(newValue);
                  setFormData({ ...formData, phone: newValue });
                }}
                className="mt-2"
              />
              <TextField
                label="email"
                variant="outlined"
                className="mt-2"
                value={formData.email}
                onChange={(e) => {
                  e.preventDefault();
                  setFormData({ ...formData, email: e.target.value });
                }}
                fullWidth
              />

              <div className="d-flex align-items-center justify-content-between mt-3">
                <Button
                  variant="outlined"
                  onClick={closeAddCustomerDialog}
                  sx={{
                    "&:hover": {
                      backgroundColor: "red",
                      color: "white",
                    },
                  }}
                >
                  close
                </Button>
                <Button
                  variant="outlined"
                  type="submit"
                  sx={{
                    "&:hover": {
                      backgroundColor: "green",
                      color: "white",
                    },
                  }}
                >
                  {isEditing ? "Save Changes" : "Add"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </Box>
      ) : (
        <div className="row">
          <div className="col-md-12 d-flex flex-column justify-content-center align-items-center mt-5 shadow border rounded p-3">
            <AccountCircleRoundedIcon sx={{ fontSize: 70 }} />
            <p>{selectedCustomer?.name}</p>
            <p>{selectedCustomer?.email}</p>
            <p>{selectedCustomer?.phone}</p>
            <Box sx={{ width: "100%" }} className="mt-2">
              <DataGrid
                rows={orderRows}
                columns={orderColumns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                getRowId={(row) => row.id}
              />
            </Box>

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
