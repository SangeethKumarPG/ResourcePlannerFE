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
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { DataGrid } from "@mui/x-data-grid";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { MuiTelInput } from "mui-tel-input";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { addCustomer, fetchCustomers, editCustomer, deleteCustomer } from "../redux/customerSlice";


function CustomerInfo({
  selectedCustomer,
  setSelectedCustomer,
  setSelectedView,
}) {
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);
  const { customers, status } = useSelector((state) => state.customers);
  // console.log("Items:",items)
  useEffect(() => {
    if (status === "idle" || refresh) {
      dispatch(fetchCustomers());
      setRefresh(false);
    }
  }, [dispatch, status, refresh]);
  // console.log("Customers:", customers);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleBackNavigation = () => {
    setSelectedCustomer(null);
    setSelectedView(1);
  };


  const handleEdit = (customer) => {
    console.log(customer);
    setAddCustomerDialog(true);
    setIsEditing(true);
    setFormData({
      _id:customer._id,
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
              <div style={{ height: 500, width: "100%" }}>
                <DataGrid
                  rows={filteredRows}
                  columns={columns}
                  getRowId={(row) => row._id}
                  pageSize={6}
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
            PaperProps={{
              component: "form",
              onSubmit: handleAddorEdit,
            }}
          >
            <DialogTitle>{isEditing ? "Edit customer details":"Add new customer"}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                {isEditing ? "Edit the details of the customer" : "Enter the details of the new customer"}
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
                value={phoneNumber||formData.phone}
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
                  {isEditing? "Save Changes":"Add"}
                </Button>
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
