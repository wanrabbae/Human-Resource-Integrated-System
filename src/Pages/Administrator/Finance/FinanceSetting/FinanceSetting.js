import { ListItemButton, ListItemText, Typography } from "@mui/material";
import React, { useState } from "react";
import CashAdvance from "./Components/CashAdvance";
import Loan from "./Components/Loan";
import Reimbursment from "./Components/Reimbursment";

function FinanceSetting() {
  const [index, setIndex] = useState(0);
  return (
    <>
      <div className="mb-5">
        <div>
          <h1 style={{ fontSize: "20px", fontWeight: "600" }}>
            Finance Setting
          </h1>
          <span
            style={{ fontSize: "10px", fontWeight: "400", color: "#737373" }}
          >
            Setting Menu for Finance
          </span>
        </div>
      </div>
      <div
        className="d-flex flex-nowrap h-screen"
        style={{ backgroundColor: "white", borderRadius: "15px" }}
      >
        <aside
          className="p-4 flex-shrink-0 w-3/12 z-0"
          style={{
            backgroundColor: "#FFFFFF",
            borderTopLeftRadius: "15px",
            borderBottomLeftRadius: "15px",
            boxShadow: "2px 0px 20px rgba(0, 0, 0, 0.15)",
          }}
        >
          <div className="">
            <ListItemButton
              style={{
                borderRadius: "7px",
                backgroundColor: index == 0 ? "#EFF9FF" : "white",
                borderRight: index == 0 ? "7px solid #219EBC" : "none",
                color: index == 0 ? "#454545" : "#00000080",
              }}
              className="mt-2"
              onClick={() => setIndex(0)}
            >
              <ListItemText
                primary={
                  <Typography style={{ fontSize: "14px", fontWeight: "600" }}>
                    Reimbursment
                  </Typography>
                }
              />
            </ListItemButton>
            <ListItemButton
              style={{
                borderRadius: "7px",
                backgroundColor: index == 1 ? "#EFF9FF" : "white",
                borderRight: index == 1 ? "7px solid #219EBC" : "none",
                color: index == 1 ? "#454545" : "#00000080",
              }}
              className="mt-2"
              onClick={() => setIndex(1)}
            >
              <ListItemText
                primary={
                  <Typography style={{ fontSize: "14px", fontWeight: "600" }}>
                    Cash Advance
                  </Typography>
                }
              />
            </ListItemButton>
            <ListItemButton
              style={{
                borderRadius: "7px",
                backgroundColor: index == 2 ? "#EFF9FF" : "white",
                borderRight: index == 2 ? "7px solid #219EBC" : "none",
                color: index == 2 ? "#454545" : "#00000080",
              }}
              className="mt-2"
              onClick={() => setIndex(2)}
            >
              <ListItemText
                primary={
                  <Typography style={{ fontSize: "14px", fontWeight: "600" }}>
                    Loan
                  </Typography>
                }
              />
            </ListItemButton>
          </div>
        </aside>
        <div className="ml-auto w-9/12 p-5 space-y-5">
          {index == 0 ? (
            <Reimbursment />
          ) : index == 1 ? (
            <CashAdvance />
          ) : index == 2 ? (
            <Loan/>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default FinanceSetting;
