import React from "react";
import { Container, Row } from "react-bootstrap";
import StatCards from "./Chart/StartCard";
import TopSellingTable from "./Chart/TopSellingTable";
import StatCards2 from "./Chart/StatCards2";
import { Card, Grid, styled, useTheme } from "@mui/material";
import DoughnutChart from "./Chart/Doughnut";
import RevenueChart from "./Chart/RevenueChart";

const TotalDashBoard = () => {
  const { palette } = useTheme();
  const Title = styled("span")(() => ({
    fontSize: "1rem",
    fontWeight: "500",
    marginRight: ".5rem",
    textTransform: "capitalize",
  }));
  const SubTitle = styled("span")(({ theme }) => ({
    fontSize: "0.875rem",
    color: theme.palette.text.secondary,
  }));
  return (
    <Container fluid>
      <Row style={{ marginLeft: "30px", width: "100%", marginTop: "30px" }}>
       
        <StatCards />
        <TopSellingTable />

        <Grid container spacing={3}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Card sx={{ px: 3, py: 2, mb: 3 }}>
              <RevenueChart />
            </Card>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <StatCards2 />
          </Grid>
        </Grid>
      </Row>
    </Container>
  );
};

export default TotalDashBoard;
