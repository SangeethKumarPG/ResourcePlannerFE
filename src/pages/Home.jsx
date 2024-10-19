import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import UserInfo from "../components/UserInfo";
import AddUser from "../components/AddUser";
import ImportUserData from "../components/ImportUserData";
import ExportUserData from "../components/ExportUserData";
import SupportTicket from "../components/SupportTicket";
import AgentInfo from "../components/AgentInfo";

import Billing from "../components/Billing";
import Dashboard from "../components/Dashboard";
import Orders from "../components/Orders";
import CustomerInfo from "../components/CustomerInfo";
import ProductsAndServices from "../components/ProductsAndServices";
import Settings from "../components/Settings";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Home() {
  const [selectedView, setSelectedView] = useState(0);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem("userData")) {
      setIsLoggedIn(true);
    } else {
      toast.error("Please login to access this page", {
        position: "top-center",
      });
      navigate("/");
    }
  },[]);

  const renderMainView = () => {
    switch (selectedView) {
      case 0:
        return <Dashboard />;
      case 1:
        return (
          <Orders
            setSelectedCustomer={setSelectedCustomer}
            setSelectedView={setSelectedView}
          />
        );
      case 2:
        return (
          <CustomerInfo
            selectedCustomer={selectedCustomer}
            setSelectedCustomer={setSelectedCustomer}
            setSelectedView={setSelectedView}
          />
        );
      case 3:
        return <ProductsAndServices />;
      case 4:
        return <SupportTicket />;
      case 5:
        return <Settings />;
      default:
        return (
          <div>
            <h3>No View Selected</h3>
          </div>
        );
    }
  };

  return (
    <>
      {isLoggedIn && (
        <div className="row ms-0">
          <div
            className={isCollapsed ? `col-md-1 mt-2 p-0` : `col-md-3 mt-2 p-0`}
          >
            <SideBar
              setSelectedView={setSelectedView}
              setIsCollapsed={setIsCollapsed}
              isCollapsed={isCollapsed}
            />
          </div>
          <div className={isCollapsed ? `col-md-11 mt-2` : `col-md-9 mt-2`}>
            {renderMainView()}
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
