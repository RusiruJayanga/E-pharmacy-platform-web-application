import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import "../../../pages/user/customer/home/home.css";

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
  const [stats, setStats] = useState({
    deliveredOrdersCount: 0,
    totalProductsCount: 0,
    customersCount: 0,
    monthlySales: [],
    inventoryData: [],
  });
  const [loading, setLoading] = useState(true);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.7,
  });

  const pieCOLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA66CC"];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/stats"
        );
        setStats(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stats:", error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* margin section 1 */}
      <div className="margin-section-container seller-home-section1"></div>
      {}
      {/* count section */}
      <div className="count-container" ref={ref}>
        <div className="count-box">
          <img src="seller-count1.png" alt="count" />
          <div className="count-content">
            <h2>
              {inView && (
                <CountUp
                  start={0}
                  end={stats.deliveredOrdersCount}
                  duration={2}
                />
              )}
              +
            </h2>
            <h4>Orders Delivered</h4>
          </div>
        </div>
        <div className="count-box">
          <img src="seller-count2.png" alt="count" />
          <div className="count-content">
            <h2>
              {inView && (
                <CountUp
                  start={0}
                  end={stats.totalProductsCount}
                  duration={2}
                />
              )}
            </h2>
            <h4>Products</h4>
          </div>
        </div>
        <div className="count-box">
          <img src="seller-count3.png" alt="count" />
          <div className="count-content">
            <h2>
              {inView && (
                <CountUp start={0} end={stats.customersCount} duration={2} />
              )}
            </h2>
            <h4>Customers</h4>
          </div>
        </div>
      </div>
      {}
      {/* chart section */}
      <div className="chart-container">
        <div className="chart-mounthly-sell">
          <h3>Monthly Sells</h3>
          <ResponsiveContainer>
            <LineChart data={stats.monthlySales}>
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
                data={stats.inventoryData}
                dataKey="quantity"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={140}
                fill="#8884d8"
                label
              >
                {stats.inventoryData.map((entry, index) => (
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
