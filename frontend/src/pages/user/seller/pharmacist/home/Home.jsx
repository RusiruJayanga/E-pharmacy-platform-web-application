import React, { useState, useEffect } from "react";
import axios from "axios";
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
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.7 });

  const [counts, setCounts] = useState({
    deliveredOrders: 0,
    totalProducts: 0,
    rating: 0,
  });

  //fetch data
  const [inventoryData, setInventoryData] = useState([]);
  const [monthlySales, setMonthlySales] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("pharmacistToken");
        const decoded = JSON.parse(atob(token.split(".")[1]));
        const sellerId = decoded.pharmacistId;
        const { data } = await axios.get(
          `http://localhost:5000/api/pharmacist/home/${sellerId}`
        );
        setCounts({
          deliveredOrders: data.deliveredOrders,
          totalProducts: data.totalProducts,
          rating: data.rating,
        });
        setInventoryData(data.inventory);
        setMonthlySales(data.monthlySales);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const pieCOLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA66CC"];

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
                <CountUp start={0} end={counts.deliveredOrders} duration={2} />
              )}
            </h2>
            <h4>Orders Delivered</h4>
          </div>
        </div>
        <div className="count-box">
          <img src="seller-count2.png" alt="count" />
          <div className="count-content">
            <h2>
              {" "}
              {inView && (
                <CountUp start={0} end={counts.totalProducts} duration={2} />
              )}
            </h2>
            <h4>Products</h4>
          </div>
        </div>
        <div className="count-box">
          <img src="seller-count3.png" alt="count" />
          <div className="count-content">
            <h2>
              <i className="bi bi-star-fill"></i>
              {inView && (
                <CountUp start={0} end={2} duration={2} decimals={1} />
              )}
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
            <LineChart data={monthlySales}>
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
                label
              >
                {inventoryData.map((entry, index) => (
                  <Cell
                    key={entry.name}
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
