import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MapContainer from "./map";
import logo from "./logo.png";

let tzName = Intl.DateTimeFormat().resolvedOptions().timeZone;
console.log("timezone", tzName);
// font: calc(16px + (26 - 16) * ((100vw - 300px) / (1600 - 300))) "Mulish",
//     sans-serif;
const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  font-family: "Mulish", sans-serif;
  line-height: 1.5;
`;

const StyledButton = styled.button`
  padding: 8px 20px 8px 20px;
  z-index: 0;
  font: inherit;
  color: #fffbf5;
  background-color: #4c42b7;
  border: 0.5px solid #4c42b7;
  border-radius: 30px;
  &:hover {
    background-color: #928ae8;
    border: 0.5px solid #928ae8;
  }
  cursor: pointer;
  margin-left: 20px;
`;

const StyledInput = styled.textarea`
  padding: 5px 5px 5px 5px;
  width: 90%;
  z-index: 0;
  font: inherit;
  border-radius: 10px;
`;

const StyledHeaderText = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  color: black;
  font-size: 14px;
  padding: 10px 5px 10px 0px;
  margin: 0 10px 0 10px;
`;

const StyledText = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  color: black;
  border-bottom: 0.5px solid lightgrey;
  padding: 0 5px 20px 5px;
  font-size: 12px;
  margin: 0 5px 0 5px;
`;

const Logo = () => {
  return <img src={logo} alt="Gesture Logo" height="50px" />;
};

const App = () => {
  const [sendName, setsendName] = useState("");
  const [recName, setrecName] = useState("");
  const [total, setTotal] = useState(0);
  const [delTime, setdelTime] = useState(0);
  const [runLoc, setRunLoc] = useState("");
  const [dropLoc, setdropLoc] = useState("");
  const [statusText, setstatusText] = useState("");

  setInterval(() => {
    fetch(
      "https://us-central1-gesture-dev.cloudfunctions.net/track/runners/runner123"
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.data.runnerLocation !== runLoc) {
          //create clear interval logic

          setRunLoc(res.data.runnerLocation);
        }
      });
  }, 10000);

  useEffect(() => {
    fetch(
      "https://us-central1-gesture-dev.cloudfunctions.net/track/orders/order123"
    )
      .then((res) => res.json())
      .then((res) => {
        setsendName(res.data.senderName);
        setrecName(res.data.recipientName);
        setTotal(res.data.totalPrice);
        setdelTime(res.data.deliveryTime);
        setRunLoc(res.data.runnerLocation); //res.data.runnerLocation
        setdropLoc(res.data.dropoffLocation);

        setstatusText(res.data.statusText);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <StyledPage>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          flexBasis: 1,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          margin: "10px 0 10px 0",
        }}
      >
        <Logo />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "50vh",
          minWidth: "50vw",
          minHeight: "50vh",
        }}
      >
        <MapContainer runLoc={runLoc} dropLoc={dropLoc} />
      </div>
      <StyledHeaderText>
        <img
          width="20"
          height="15"
          padding="0 20 0 0"
          src="https://www.svgrepo.com/show/101623/clock.svg"
          alt="clock"
        />
        &nbsp;
        <b>Order Status</b>
      </StyledHeaderText>
      <StyledText>{statusText}</StyledText>
      <StyledHeaderText>
        <img
          width="20"
          height="20"
          padding="0 20 0 0"
          src="https://www.svgrepo.com/show/208422/delivery-truck-truck.svg"
          alt="delivery truck"
        />
        &nbsp;
        <b>Delivery Details</b>
      </StyledHeaderText>
      <StyledHeaderText>
        <b>Sent from</b>
      </StyledHeaderText>
      <StyledText style={{ border: "none", paddingBottom: "0px" }}>
        {sendName}
      </StyledText>
      <StyledHeaderText>
        <strong>Recipient</strong>
      </StyledHeaderText>
      <StyledText style={{ border: "none", paddingBottom: "0px" }}>
        {recName}
      </StyledText>
      <StyledHeaderText>
        <b>Order Total</b>
      </StyledHeaderText>
      <StyledText style={{ border: "none", paddingBottom: "0px" }}>
        ${total}
      </StyledText>
      <StyledHeaderText>
        <b>Order Time</b>
      </StyledHeaderText>
      <StyledText>
        {Intl.DateTimeFormat(navigator.language, {
          weekday: "long",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        }).format(new Date(delTime))}
      </StyledText>
      <StyledHeaderText>
        <img
          width="20"
          height="15"
          padding="0 20 0 0"
          src="https://www.svgrepo.com/show/104987/question-mark-button.svg"
          alt="question mark"
        />
        &nbsp;
        <b>Request Changes</b>
      </StyledHeaderText>
      <StyledText>
        <StyledInput></StyledInput>
        <StyledButton>Submit</StyledButton>
      </StyledText>
    </StyledPage>
  );
};

export default App;
