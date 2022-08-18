import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { useState } from "react";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const [coinPrice, setcoinPrice] = useState([]);
  const [coinTimestamp, setcoinTimestamp] = useState([]);

  useEffect(() => {
    let temp1 = [];
    let temp2 = [];

    for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
      temp1.push(coinHistory?.data?.history[i].price);
      temp2.push(
        new Date(
          coinHistory?.data?.history[i].timestamp * 1000
        ).toLocaleString()
      );
    }
    setcoinPrice(temp1);
    setcoinTimestamp(temp2);
  }, [coinHistory]);

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
        tension: 0.4,
      },
    ],
  };

  const options = {
    scales: {
      xAxes: {
        tooltips: {
          callbacks: {
            title: function (tooltipItems, data) {
              return data.labels[tooltipItems[0].index];
            },
          },
        },
      },
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart{" "}
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            Change: {coinHistory?.data?.change}%
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price: $ {currentPrice}
          </Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
