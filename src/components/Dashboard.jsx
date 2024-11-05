import React, { useEffect, useState } from "react";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  PolarAngleAxis,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Bar,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import { Card, CardContent, Typography } from "@mui/material";
import dayjs from "dayjs";
import { fetchOrders } from "../redux/ordersSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchTickets } from "../redux/ticketSlice";
import { fetchAgents } from "../redux/agentSlice";
import './Dashboard.css';

function Dashboard() {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orders);
  const { tickets } = useSelector((state) => state.tickets);
  const {agents} = useSelector((state)=>state.agents);
  const [expiringToday, setExpiringToday] = useState([]);
  const [expiringSoon, setExpiringSoon] = useState([]);
  const [expiredAccounts, setExpiredAccounts] = useState([]);
  const [agentPerformaceData, setAgentPerformaceData] = useState([]);
  const [monthlyOrdersData, setMonthlyOrdersData] = useState([]);
  const [mostSoldPlans, setMostSoldPlans] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchTickets());
    dispatch(fetchAgents());
  }, [dispatch]);
  useEffect(() => {
    setExpirationCard();
    setIssuesCard();
    setAgentPerformanceCard();
    setMonthlyOrdersCard();
    setPlanDataCard();
  }, [tickets, orders, agents]);
  console.log("Tickets : ", tickets);
  const setIssuesCard = () => {
    const open = [];
    const pending = [];
    const closed = [];
    tickets.forEach((ticket) => {
      if (ticket.status === "pending") {
        pending.push(ticket);
      } else if (ticket.status === "closed") {
        closed.push(ticket);
      } else if (ticket.status === "open") {
        open.push(ticket);
      }
    });
    setData([
      {
        name: "Open Issues",
        count: open.length,
        fill: "red",
      },
      {
        name: "Pending Issues",
        count: pending.length,
        fill: "orange",
      },
      { name: "Resolved Issues", count: closed.length, fill: "green" },
    ]);
    console.log(data);
  };

  const setExpirationCard = () => {
    const expired = [];
    const expiringSoon = [];
    const today = [];

    orders.forEach((order) => {
      const date = dayjs(order.expiryDate);
      if (date.isValid()) {
        const diffInDays = date.diff(dayjs(), "days");
        if (diffInDays < 0) expired.push(order);
        else if (diffInDays <= 3) expiringSoon.push(order);
        else if (diffInDays === 0) today.push(order);
      }
    });

    setExpiredAccounts(expired);
    setExpiringSoon(expiringSoon);
    setExpiringToday(today);
  };

  const setAgentPerformanceCard = () => {
    const agentData = tickets.filter((ticket)=>ticket?.assignedTo).map(ticket=>({
      agentId: ticket.assignedTo,
      resolvedBy : ticket.resolvedBy,
      status :ticket.status
    }))
    // console.log(agentData);

    const agentPerformanceMap = {}
    agentData.forEach(({agentId, resolvedBy, status})=>{
      if(!agentPerformanceMap[agentId]){
        agentPerformanceMap[agentId] = { assigned: 0, resolved: 0, pending: 0 }
      }
      agentPerformanceMap[agentId].assigned+=1;
      if(status === "pending"){
        agentPerformanceMap[agentId].pending+=1;
      }
      if(resolvedBy){
        agentPerformanceMap[agentId].resolved+=1;
      }
    })
    const cardData = agents.map((agent)=>{
      const {assigned = 0, resolved = 0, pending = 0} = agentPerformanceMap[agent._id] || {};
      return({
        name: agent.username,
        ticketsResolved: resolved,
        ticketsPending: pending,
        ticketsAssigned: assigned
      })
    })
    // console.log(cardData);
    setAgentPerformaceData(cardData);
  };

  const setMonthlyOrdersCard = ()=>{
    const orderMap = {}
    const monthlyOrders = orders.forEach((order)=>{
      const monthName = dayjs(order.startDate).format("MMM");
      if(!orderMap[monthName]){
        orderMap[monthName] = 0;
      }
      orderMap[monthName]+=1;
    })
    // console.log(orderMap);
    let formattedMonthlyData = [];
    Object.keys(orderMap).map(month=>{
      formattedMonthlyData.push({
        month:month,
        orders:orderMap[month]
      })
    })
    // console.log("formatted monthly data : ",formattedMonthlyData);
    setMonthlyOrdersData(formattedMonthlyData);
  }

  const setPlanDataCard = ()=>{
    const planDataMap = {};
    orders.map((order)=>{
      if(!planDataMap[order.planName]){
        planDataMap[order.planName] = 0;
      }
      planDataMap[order.planName]+=1;
    })
    // console.log("Plan Data Map : ", planDataMap);
    const sortedPlans = Object.keys(planDataMap).sort((a,b)=>{
      return planDataMap[b]-planDataMap[a]
    })
    // console.log("Sorted Plans : ", sortedPlans);
    let topPlans = [];
    sortedPlans.forEach((planName)=>{
      topPlans.push({
        plan:planName,
        count:planDataMap[planName]
      })
    })
    console.log("Top Plans : ", topPlans);
    setMostSoldPlans(topPlans);
  }


  return (
    <>
      <h4>Dashboard</h4>

      <div className="row mt-2">
        <div className="col-md-4">
          <Card
            className="indexCard"
            variant="outlined"
            style={{ backgroundColor: "black", color: "white", height: "12rem" }}
          >
            <CardContent className="d-flex align-items-center justify-content-center flex-column p-2 mt-5">
              <Typography variant="h6" component="div">
                Expired Accounts
              </Typography>
              <Typography variant="body1">{expiredAccounts?.length}</Typography>
            </CardContent>
          </Card>
        </div>
        <div className="col-md-4">
          <Card
            className="indexCard"
            variant="outlined"
            style={{ backgroundColor: "red", color: "white", height: "12rem" }}
          >
            <CardContent className="d-flex align-items-center justify-content-center flex-column p-3 mt-5">
              <Typography variant="h6" component="div">
                Expiring Today
              </Typography>
              <Typography variant="body1">{expiringToday?.length}</Typography>
            </CardContent>
          </Card>
        </div>
        <div className="col-md-4">
          <Card
            className="indexCard"
            variant="outlined"
            style={{
              backgroundColor: "orange",
              color: "white",
              height: "12rem",
            }}
          >
            <CardContent className="d-flex align-items-center justify-content-center flex-column p-2 mt-5">
              <Typography variant="h6" component="div">
                Expiring in 3 Days
              </Typography>
              <Typography variant="body1">{expiringSoon?.length}</Typography>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6 d-flex justify-content-center">
          <Typography variant="h6" className="mt-3 d-inline-block">
            Issues Status
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius={20}
              outerRadius={140}
              barSize={20}
              data={data}
              startAngle={180}
              endAngle={0}
            >
              <PolarAngleAxis
                type="number"
                domain={[0, 100]}
                angleAxisId={0}
                tick={false}
              />
              <RadialBar
                minAngle={15}
                background
                clockWise
                dataKey="count"
                label={{ position: "end", fontSize: 10, fill: "#000" }}
              />
              <Legend
                iconSize={10}
                width={120}
                height={140}
                layout="vertical"
                horizontalAlign="center"
                verticalAlign="bottom"
              />
              <Tooltip />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
        <div className="col-md-6">
          <Typography variant="h6" className="mt-3 d-inline-block">
            Orders by Plan
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mostSoldPlans} barSize={20} barGap={1}>
              <XAxis dataKey="plan" tick={false} />
              <YAxis scale="linear" domain={[0, 'dataMax+1']} 
              tickFormatter={(tick)=>Math.round(tick)}
              allowDecimals={false}/> 
              <Tooltip />
              <Legend layout="vertical" />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-12">
          <Typography variant="h6" className="mt-3 d-inline-block">
            Monthly Orders
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyOrdersData}>
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="orders" stroke="limegreen" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="row mt-4">
        <Typography variant="h6" className="mt-3 d-inline-block">
          Agent Performance
        </Typography>
        <div className="col-md-12">
          <ResponsiveContainer width="100%" height={500}>
            <BarChart data={agentPerformaceData} barSize={30}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend layout="vertical" verticalAlign="bottom" />
              <Bar dataKey="ticketsResolved" fill="#8884d8" />
              <Bar dataKey="ticketsPending" fill="red" />
              <Bar dataKey="ticketsAssigned" fill="orange" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
