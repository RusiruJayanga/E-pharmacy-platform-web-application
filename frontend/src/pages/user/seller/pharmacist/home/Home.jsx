import React, { useState, useEffect } from "react";
import "./home.css";
//margin css
import "../../../../../components/user/common/margin/margin.css";
//auto count
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import "../../../customer/home/home.css";
//chart
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Home = () => {
  //auto count
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.7,
  });
  //chart data
  const mounthlySellData = [
    { month: "Jan", sales: 1200 },
    { month: "Feb", sales: 2100 },
    { month: "Mar", sales: 800 },
    { month: "Apr", sales: 1600 },
    { month: "May", sales: 2400 },
    { month: "Jun", sales: 2800 },
    { month: "Jul", sales: 3200 },
    { month: "Aug", sales: 3000 },
    { month: "Sep", sales: 2700 },
    { month: "Oct", sales: 2000 },
    { month: "Nov", sales: 1800 },
    { month: "Dec", sales: 1500 },
  ];
  const inventoryData = [
    { name: "Painkillers", quantity: 120 },
    { name: "Vitamins", quantity: 300 },
    { name: "Antibiotics", quantity: 200 },
    { name: "Skin Care", quantity: 150 },
    { name: "Others", quantity: 100 },
  ];
  const pieCOLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA66CC"];

  return (
    <div>
      {/* margin section 1 */}
      <div className="margin-section-container seller-home-section1">
        <div className="margin-section-content">
          <h1>name</h1>
        </div>
      </div>
      {}
      {/* count section */}
      <div className="count-container" ref={ref}>
        <div className="count-box">
          <img src="seller-count1.png" alt="count" />
          <div className="count-content">
            <h2>{inView && <CountUp start={0} end={300} duration={2} />}+</h2>
            <h4>Orders Delivered</h4>
          </div>
        </div>
        <div className="count-box">
          <img src="seller-count2.png" alt="count" />
          <div className="count-content">
            <h2>{inView && <CountUp start={0} end={69669} duration={2} />}</h2>
            <h4>Products</h4>
          </div>
        </div>
        <div className="count-box">
          <img src="seller-count3.png" alt="count" />
          <div className="count-content">
            <h2>
              <i class="bi bi-star-fill"></i>
              {inView && <CountUp start={0} end={5} duration={2} />}
            </h2>
            <h4>Customers Rated</h4>
          </div>
        </div>
      </div>
      {}
      {/* chart section */}
      <div className="chart-container">
        <div className="chart-mounthly-sell">
          <h3>Monthly Sells</h3>
          <ResponsiveContainer>
            <LineChart data={mounthlySellData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-inventory">
          <h3>Inventory</h3>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={inventoryData}
                dataKey="quantity"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={140}
                fill="#8884d8"
                label
              >
                {inventoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={pieCOLORS[index % pieCOLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      {}
    </div>
  );
};

export default Home;
