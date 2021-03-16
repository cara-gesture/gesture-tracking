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

const StyledForm = styled.form`
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
  const [track, setTrack] = useState(false);
  const [couponAmount, setCouponAmount] = useState(0);
  const [creditAmount, setCreditAmount] = useState(0);
  const [tip, setTip] = useState(0);
  const [productAmount, setProductAmount] = useState(0);
  const [productName, setProductName] = useState("");
  const [serviceFee, setServiceFee] = useState(0);
  const [dropoffName, setDropoffName] = useState("");
  const [text, setText] = useState("");

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

  // const handleChange = (e) => {
  //   setText(e.target.value);
  //   console.log(text);
  // };

  const handleSubmit = (e) => {
    fetch(
      "https://us-central1-gesture-dev.cloudfunctions.net/track/notification",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text }),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log("message", res.data.message);
      })
      .catch((err) => console.log("send message ERROR: ", err));
    setText("");
    e.preventDefault();
  };

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
        setTrack(true);
        setstatusText(res.data.statusText);
        setCouponAmount(res.data.couponAmount);
        setCreditAmount(res.data.creditAmount);
        setDropoffName(res.data.dropoffName);
        setProductAmount(res.data.productAmount);
        setProductName(res.data.productName);
        setServiceFee(res.data.serviceFee);
        setTip(res.data.tip);
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
        <MapContainer runLoc={runLoc} dropLoc={dropLoc} track={track} />
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
        <b>Product Name</b>
      </StyledHeaderText>
      <StyledText style={{ border: "none", paddingBottom: "0px" }}>
        {productName}
      </StyledText>
      <StyledHeaderText>
        <b>Drop Off Name</b>
      </StyledHeaderText>
      <StyledText>{dropoffName}</StyledText>
      <StyledHeaderText>
        <img
          width="15"
          height="15"
          padding="0 20 0 0"
          src="https://www.svgrepo.com/show/223681/receipt.svg"
          alt="receipt"
        />
        &nbsp;
        <b>Receipt</b>
      </StyledHeaderText>
      <StyledHeaderText>
        <b>Order Total</b>
      </StyledHeaderText>
      <StyledText style={{ border: "none", paddingBottom: "0px" }}>
        ${total}
      </StyledText>
      <StyledHeaderText>
        <b>Product Amount</b>
      </StyledHeaderText>
      <StyledText style={{ border: "none", paddingBottom: "0px" }}>
        ${productAmount.toFixed(2)}
      </StyledText>
      <StyledHeaderText>
        <b>Coupon Amount</b>
      </StyledHeaderText>
      <StyledText style={{ border: "none", paddingBottom: "0px" }}>
        ${couponAmount.toFixed(2)}
      </StyledText>
      <StyledHeaderText>
        <b>Credit Amount</b>
      </StyledHeaderText>
      <StyledText style={{ border: "none", paddingBottom: "0px" }}>
        ${creditAmount.toFixed(2)}
      </StyledText>
      <StyledHeaderText>
        <b>Tip</b>
      </StyledHeaderText>
      <StyledText style={{ border: "none", paddingBottom: "0px" }}>
        ${tip.toFixed(2)}
      </StyledText>
      <StyledHeaderText>
        <b>Service Fee</b>
      </StyledHeaderText>
      <StyledText style={{ border: "none", paddingBottom: "0px" }}>
        ${serviceFee.toFixed(2)}
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
      <StyledForm>
        <StyledInput
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></StyledInput>
        <StyledButton onClick={handleSubmit} type="submit">
          Submit
        </StyledButton>
      </StyledForm>
    </StyledPage>
  );
};

export default App;
