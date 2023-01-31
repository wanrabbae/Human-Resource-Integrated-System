import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import React, { useState } from "react";
import Document from "./Document";
import Finance from "./Finance";
import TimeManagement from "./TimeManagement";

function TemplateApprovalList() {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <div className="d-flex justify-content-between mb-4">
        <div className="row">
          <h3 style={{ fontSize: "20px", fontWeight: "600" }}>Approval List</h3>
          <span
            style={{ fontSize: "10px", fontWeight: "400", color: "#737373" }}
          >
            list of Approval
          </span>
        </div>
      </div>
      <div
        className="w-100 p-4"
        style={{ backgroundColor: "#FFFFFF", borderRadius: "10px" }}
      >
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              textColor="inherit"
              TabIndicatorProps={{
                style: {
                  color: "#C1121F",
                  backgroundColor: "#C1121F",
                },
              }}
            >
              <Tab style={{ minWidth: "200px" }} label="Document" value="1" />
              <Tab
                style={{ minWidth: "200px" }}
                label="Time Management"
                value="2"
              />
              <Tab style={{ minWidth: "200px" }} label="Finance" value="3" />
            </TabList>
          </Box>
          <TabPanel className="py-5 px-0" value="1">
            <Document />
          </TabPanel>
          <TabPanel className="py-5 px-0" value="2">
            <TimeManagement />
          </TabPanel>
          <TabPanel className="py-5 px-0" value="3">
            <Finance />
          </TabPanel>
        </TabContext>
        {/* <Tab.Container id="left-tabs-example" defaultActiveKey="first" eventKey="home" title="Job Grade">
        <Nav className="flex">
          <Nav.Item>
            <Nav.Link eventKey="first">Tab 1</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="second">Tab 2</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="first">
          <div>tes1</div>
          </Tab.Pane>
          <Tab.Pane eventKey="second">
          <div>tes2</div>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container> */}
      </div>
    </>
  );
}

export default TemplateApprovalList;
