import React from "react";
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
  CartesianGrid
} from "recharts";
import { Card, CardContent, Typography } from "@mui/material";

const data = [
  { name: "New Issues", count: 20, fill: "red" },
  { name: "Resolved Issues", count: 50, fill: "green" },
  { name: "Pending Issues", count: 70, fill: "orange" },
];

const ordersData = [
  { provider: "Microsoft", serviceName: "domain", orders: 100, color: "#8884d8" },
  { provider: "Microsoft", serviceName: "email", orders: 50, color: "#82ca9d" },
  { provider: "Microsoft", serviceName: "server", orders: 0, color: "#ff8042" },
  { provider: "Microsoft", serviceName: "sslCertificate", orders: 30, color: "#ffbb28" },
  { provider: "Microsoft", serviceName: "webApplication", orders: 20, color: "#ffc658" },

  { provider: "GoDaddy", serviceName: "domain", orders: 120, color: "#8884d8" },
  { provider: "GoDaddy", serviceName: "email", orders: 70, color: "#82ca9d" },
  { provider: "GoDaddy", serviceName: "server", orders: 10, color: "#ff8042" },
  { provider: "GoDaddy", serviceName: "sslCertificate", orders: 40, color: "#ffbb28" },
  { provider: "GoDaddy", serviceName: "webApplication", orders: 25, color: "#ffc658" },

  { provider: "Google", serviceName: "domain", orders: 90, color: "#8884d8" },
  { provider: "Google", serviceName: "email", orders: 40, color: "#82ca9d" },
  { provider: "Google", serviceName: "server", orders: 5, color: "#ff8042" },
  { provider: "Google", serviceName: "sslCertificate", orders: 20, color: "#ffbb28" },
  { provider: "Google", serviceName: "webApplication", orders: 15, color: "#ffc658" },

  { provider: "Hostinger", serviceName: "domain", orders: 80, color: "#8884d8" },
  { provider: "Hostinger", serviceName: "email", orders: 60, color: "#82ca9d" },
  { provider: "Hostinger", serviceName: "server", orders: 20, color: "#ff8042" },
  { provider: "Hostinger", serviceName: "sslCertificate", orders: 35, color: "#ffbb28" },
  { provider: "Hostinger", serviceName: "webApplication", orders: 10, color: "#ffc658" },
];

const monthlyOrdersData = [
  { month: "Jan", orders: 100 },
  { month: "Feb", orders: 120 },
  { month: "Mar", orders: 140 },
  { month: "Apr", orders: 160 },
  { month: "May", orders: 180 },
  { month: "Jun", orders: 200 },
  { month: "Jul", orders: 220 },
  { month: "Aug", orders: 240 },
  { month: "Sep", orders: 260 },
  { month: "Oct", orders: 280 },
  { month: "Nov", orders: 300 },
  { month: "Dec", orders: 320 },
]

const agentPerformaceData=[{
  name: 'Agent 1',
  ticketsResolved:10,
  ticketsPending:5,
  ticketsAssigned:15
},{
  name: 'Agent 2',
  ticketsResolved:20,
  ticketsPending:10,
  ticketsAssigned:30
},{
  name: 'Agent 3',
  ticketsResolved:30,
  ticketsPending:15,
  ticketsAssigned:45
}]

function Dashboard() {
  return (
    <>
      <h4>Dashboard</h4>

      <div className="row mt-2">
        <div className="col-md-4">
          <Card
            variant="outlined"
            style={{ backgroundColor: "black", color: "white", height: "8rem" }}
          >
            <CardContent>
              <Typography variant="h6" component="div">
                Expired Accounts
              </Typography>
              <Typography variant="body1">10</Typography>
            </CardContent>
          </Card>
        </div>
        <div className="col-md-4">
          <Card
            variant="outlined"
            style={{ backgroundColor: "red", color: "white", height: "8rem" }}
          >
            <CardContent>
              <Typography variant="h6" component="div">
                Expiring Today
              </Typography>
              <Typography variant="body1">10</Typography>
            </CardContent>
          </Card>
        </div>
        <div className="col-md-4">
          <Card
            variant="outlined"
            style={{
              backgroundColor: "orange",
              color: "white",
              height: "8rem",
            }}
          >
            <CardContent>
              <Typography variant="h6" component="div">
                Expiring in 3 Days
              </Typography>
              <Typography variant="body1">7</Typography>
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
            Orders
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ordersData}>
              <XAxis dataKey="provider" tick={false}/>
              <YAxis />
              <Tooltip />
              <Legend layout="vertical"/>
              <Bar dataKey="orders" fill="#8884d8" />
              <Bar dataKey="serviceName" fill="red" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-12">
          <Typography variant="h6" className="mt-3 d-inline-block">Monthly Orders</Typography>
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
        <Typography variant="h6" className="mt-3 d-inline-block">Agent Performance</Typography>
        <div className="col-md-12">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={agentPerformaceData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend layout="vertical" verticalAlign="bottom"/>
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
