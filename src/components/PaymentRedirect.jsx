import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Dialog,
  Checkbox,
  FormControl,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { fetchOrderByIdAPI, changePaymentStatusAPI } from "../services/allAPI";
import tickIcon from "../assets/tickicon.svg";
import pendingIcon from "../assets/pendingicon.svg";
import { toast } from "react-toastify";


function PaymentRedirect() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [card, setCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [nameError, setNameError] = useState(false);
  const [mobileError, setMobileError] = useState(false);
  const [cardError, setCardError] = useState(false);
  const [expiryError, setExpiryError] = useState(false);
  const [cvvError, setCvvError] = useState(false);
  const [order, setOrder] = useState({});
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const { id } = useParams();
  const [refresh, setRefresh] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setFormData({});
    setOpen(false);
  };

  const fetchOrder = async () => {
    const response = await fetchOrderByIdAPI(id);
    if (response.status === 200) {
      setOrder(response.data);
      console.log(response.data);
    } else {
      toast.error("Error fetching order details");
    }
  };

  const checkPaymentStatus = () => {
    if (order.paymentStatus === "paid") {
      setPaymentSuccess("paid");
    } else if (order.paymentStatus === "debitedfromsource") {
      setPaymentStatus("debitedfromsource");
    }else{
      setPaymentStatus("error");
    }
  };

  useEffect(() => {
    fetchOrder();
    checkPaymentStatus();
  }, [order.paymentStatus ]);

  const handleNameChange = (event) => {
    const value = event.target.value;
    if (/^[A-Za-z\s]*$/.test(value)) {
      setName(value);
      setNameError(false);
    } else {
      setNameError(true);
    }
  };

  const handleMobileChange = (event) => {
    const value = event.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setMobile(value);
      setMobileError(false);
    } else {
      setMobileError(true);
    }
  };

  const handleCardChange = (event) => {
    const digitsOnly = event.target.value.replace(/\s+/g, "");
    if (/^\d{0,16}$/.test(digitsOnly)) {
      setCard(digitsOnly.replace(/(\d{4})(?=\d)/g, "$1 "));
      setCardError(false);
    } else {
      setCardError(true);
    }
  };

  const handleExpiryChange = (event) => {
    const value = event.target.value;
    if (/^(0[1-9]|1[0-2]|[0-9]?)\/?\d{0,2}$/.test(value)) {
      setExpiry(value);
      setExpiryError(false);
    } else {
      setExpiryError(true);
    }
  };

  const handleCvvChange = (event) => {
    const value = event.target.value;
    if (/^\d{0,3}$/.test(value)) {
      setCvv(value);
      setCvvError(false);
    } else {
      setCvvError(true);
    }
  };

  const handleSubmit = async () => {
    if (formData.status === "success") {
      setPaymentSuccess(true);
      const response = await changePaymentStatusAPI(id, {paymentStatus:"paid"}).then(()=>{
        setRefresh(!refresh)      
      });
      toast.success("Payment successful");
      
    } else if (formData.status === "debitedfromsource") {
      setPaymentStatus("debitedfromsource");
      const response = await changePaymentStatusAPI(id, {paymentStatus:"debitedfromsource"}).then(()=>{
        setRefresh(!refresh);
      });
    } else {
      toast.error("Payment failed kindly retry or contact support");
      const response = await changePaymentStatusAPI(id, {paymentStatus:"error"}).then(()=>setRefresh(!refresh));
    }
    setPaymentStatus("");
    handleClose();
  };
  useEffect(() => {
    fetchOrder();
  },[refresh]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="background.default"
    >
      <Container maxWidth="xs">
        {paymentSuccess === "paid" ? (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            p={3}
            gap={2}
            sx={{ bgcolor: "background.paper", borderRadius: 1, boxShadow: 3 }}
          >
            <img src={tickIcon} alt="Payment Successful" />
            <Typography variant="h4" sx={{ textAlign: "center" }}>
              Payment already completed!
            </Typography>
          </Box>
        ) : paymentStatus === "debitedfromsource" ? (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            p={3}
            gap={2}
            sx={{ bgcolor: "background.paper", borderRadius: 1, boxShadow: 3 }}
          >
            <img src={pendingIcon} alt="Payment Pending" />
            <Typography variant="h4" sx={{ textAlign: "center" }}>
              Payment is pending!
            </Typography>
            <Typography variant="body1" sx={{ textAlign: "center" }}>
              We will notify you once the payment is completed.
            </Typography>
          </Box>
        ) : (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            p={3}
            gap={2}
            sx={{ bgcolor: "background.paper", borderRadius: 1, boxShadow: 3 }}
          >
            <Typography variant="h4" sx={{ textAlign: "center" }}>
              Payment Details
            </Typography>
            <Typography variant="body1" sx={{ textAlign: "left" }}>
              Make a payment of Rs.{order.price} for the plan: {order.planName}{" "}
              for {order.duration} months
            </Typography>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              required
              value={name}
              onChange={handleNameChange}
            />
            {nameError && (
              <Typography variant="body2" color="error">
                Please enter a valid name
              </Typography>
            )}
            <TextField
              label="Mobile Number"
              variant="outlined"
              fullWidth
              required
              value={mobile}
              onChange={handleMobileChange}
            />
            {mobileError && (
              <Typography variant="body2" color="error">
                Please enter a valid mobile number
              </Typography>
            )}
            <TextField
              label="Credit/Debit Card"
              variant="outlined"
              fullWidth
              required
              value={card}
              onChange={handleCardChange}
            />
            {cardError && (
              <Typography variant="body2" color="error">
                Please enter a valid credit/debit card number
              </Typography>
            )}
            <Box display="flex" gap={2} width="100%">
              <TextField
                label="Expiry Month/Year"
                variant="outlined"
                fullWidth
                required
                value={expiry}
                onChange={handleExpiryChange}
              />
              {expiryError && (
                <Typography variant="body2" color="error">
                  Please enter a valid expiry date
                </Typography>
              )}
              <TextField
                label="CVV"
                variant="outlined"
                fullWidth
                required
                value={cvv}
                onChange={handleCvvChange}
              />
              {cvvError && (
                <Typography variant="body2" color="error">
                  Please enter a valid CVV
                </Typography>
              )}
            </Box>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              sx={{ mt: 2 }}
              onClick={handleClickOpen}
              disabled={nameError || mobileError || cardError || expiryError || cvvError}
            >
              Make Payment
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth>
              <DialogTitle>Set the payment status</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Check the box to set the payment status.
                </DialogContentText>
                <Box display="flex" flexDirection="row" gap={2} sx={{alignItems: "center", justifyContent:"center"}}>
                  <FormControl>
                    <Checkbox
                      onClick={() => setFormData({ status: "success" })}
                    />
                    <Typography variant="body2">Success</Typography>
                  </FormControl>
                  <FormControl>
                    <Checkbox
                      onClick={() =>
                        setFormData({ status: "debitedfromsource" })
                      }
                    />
                    <Typography variant="body2">Debited from source</Typography>
                  </FormControl>
                  <FormControl>
                    <Checkbox
                      onClick={() => setFormData({ status: "error" })}
                    />
                    <Typography variant="body2">Error</Typography>
                  </FormControl>
                </Box>
                <Button onClick={handleSubmit} color="primary" className="mt-2" fullWidth>
                  Submit
                </Button>
              </DialogContent>
            </Dialog>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default PaymentRedirect;
