import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MapContainer from "./map";
import logo from "./logo.png";
import deliveryImg from "./deliveryImg.png";
import changesImg from "./changesImg.png";
import orderImg from "./orderImg.png";
import receiptImg from "./receiptImg.png";
import { Link } from "react-router-dom";

let search = window.location.search;
let params = new URLSearchParams(search);
let orderId = params.get("orderId");
let tokenId = params.get("token");

//this conditional is for testing only
if (orderId === null) {
  orderId = "testerid";
}
console.log("orderID", orderId);

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
  font-size: 12px;
  margin: 0 5px 0 5px;
  padding: 0 5px 0 5px;
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

const DeliveryImg = () => {
  return <img src={deliveryImg} alt="Delivery icon" height="20px" />;
};
const ChangesImg = () => {
  return <img src={changesImg} alt="Changes icon" height="20px" />;
};
const OrderImg = () => {
  return <img src={orderImg} alt="Order icon" height="20px" />;
};
const ReceiptImg = () => {
  return <img src={receiptImg} alt="Receipt icon" height="20px" />;
};

const Track = () => {
  const [sendName, setsendName] = useState("-");
  const [recName, setrecName] = useState("-");
  const [total, setTotal] = useState("-");
  const [delTime, setdelTime] = useState(null);
  const [runLoc, setRunLoc] = useState("");
  const [dropLoc, setdropLoc] = useState("");
  const [statusText, setstatusText] = useState("-");
  const [track, setTrack] = useState(false);
  const [couponAmount, setCouponAmount] = useState("-");
  const [creditAmount, setCreditAmount] = useState("-");
  const [tip, setTip] = useState("-");
  const [productAmount, setProductAmount] = useState('"-');
  const [productName, setProductName] = useState("-");
  const [serviceFee, setServiceFee] = useState("-");
  const [dropoffName, setDropoffName] = useState("-");
  const [text, setText] = useState("");
  const [orderTime, setOrderTime] = useState(null);
  const [runnerId, setRunnerId] = useState("");

  if (track === true) {
    setInterval(() => {
      fetch(
        `https://us-central1-gesture-dev.cloudfunctions.net/track/runners/${runnerId}`
      )
        .then((res) => res.json())
        .then((res) => {
          if (res.data.runnerLocation !== runLoc) {
            //create clear interval logic
            console.log("runner:", res.data);
            setRunLoc(res.data.runnerLocation);
          }
        });
    }, 15000);
  }

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
        console.log("response:", res.data.message);
      })
      .catch((err) => console.log("send message ERROR: ", err));
    setText("");
    e.preventDefault();
  };

  useEffect(() => {
    fetch(
      `https://us-central1-gesture-dev.cloudfunctions.net/track/orders/${orderId}`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log("order data", res.data);
        setsendName(res.data.senderName);
        setrecName(res.data.recipientName);
        setTotal(res.data.totalPrice);
        setdelTime(res.data.deliveryTime);
        res.data.runnerLocation !== null
          ? setRunLoc(res.data.runnerLocation)
          : setRunLoc(""); //res.data.runnerLocation
        res.data.dropoffLocation !== null
          ? setdropLoc(res.data.dropoffLocation)
          : setdropLoc("");
        res.data.track !== null ? setTrack(res.data.track) : setTrack(false);
        setstatusText(res.data.statusText);
        setCouponAmount(res.data.couponAmount);
        setCreditAmount(res.data.creditAmount);
        setDropoffName(res.data.dropoffName);
        setProductAmount(res.data.productAmount);
        setProductName(res.data.productName);
        setServiceFee(res.data.serviceFee);
        setTip(res.data.tip);
        setOrderTime(res.data.timeOrderPlaced);
        setRunnerId(res.data.runnerId);
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
          margin: "10px 0 10px 10px",
        }}
      >
        <div
          style={{
            display: "flex",
            color: "#8585ff",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Link
            to={`/history/?token=${tokenId}`}
            style={{ textDecoration: "none", color: "#8585ff" }}
          >
            <i className="fas fa-chevron-circle-left fa-2x"></i>
          </Link>
        </div>
        <div style={{ marginLeft: "45vw" }}>
          <Logo />
        </div>
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
        <OrderImg />
        &nbsp;
        <b>Order Status</b>
      </StyledHeaderText>
      <StyledText style={{ paddingBottom: "20px" }}>{statusText}</StyledText>
      <StyledHeaderText
        style={{
          borderTop: "0.5px solid lightgrey",
        }}
      >
        <DeliveryImg />
        &nbsp;
        <b>Delivery Details</b>
      </StyledHeaderText>
      <StyledHeaderText>
        <b>Sender</b>
      </StyledHeaderText>
      <StyledText>{sendName}</StyledText>
      <StyledHeaderText>
        <strong>Recipient</strong>
      </StyledHeaderText>
      <StyledText style={{ paddingBottom: "0px" }}>{recName}</StyledText>
      <StyledHeaderText>
        <b>Product Name</b>
      </StyledHeaderText>
      <StyledText style={{ paddingBottom: "0px" }}>{productName}</StyledText>
      <StyledHeaderText>
        <b>Drop Off Name</b>
      </StyledHeaderText>
      <StyledText style={{ paddingBottom: "0px" }}>{dropoffName}</StyledText>
      <StyledHeaderText>
        <b>Order Time</b>
      </StyledHeaderText>
      <StyledText style={{ paddingBottom: "0px" }}>
        {orderTime
          ? Intl.DateTimeFormat(navigator.language, {
              weekday: "long",
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
            }).format(new Date(orderTime))
          : "-"}
      </StyledText>
      <StyledHeaderText>
        <b>Delivery Time</b>
      </StyledHeaderText>
      <StyledText style={{ paddingBottom: "20px" }}>
        {delTime
          ? Intl.DateTimeFormat(navigator.language, {
              weekday: "long",
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
            }).format(new Date(delTime))
          : "-"}
      </StyledText>
      <StyledHeaderText
        style={{
          borderTop: "0.5px solid lightgrey",
        }}
      >
        <ReceiptImg />
        &nbsp;
        <b>Receipt</b>
      </StyledHeaderText>

      <StyledHeaderText>
        <b>Product Amount</b>
      </StyledHeaderText>
      <StyledText>
        {typeof productAmount == "number"
          ? `$${productAmount.toFixed(2)}`
          : "-"}
      </StyledText>
      <StyledHeaderText>
        <b>Service Fee</b>
      </StyledHeaderText>
      <StyledText>
        {typeof serviceFee == "number" ? `$${serviceFee.toFixed(2)}` : "-"}
      </StyledText>
      <StyledHeaderText>
        <b>Tip</b>
      </StyledHeaderText>
      <StyledText>
        {typeof tip == "number" ? `$${tip.toFixed(2)}` : "-"}
      </StyledText>
      {couponAmount === "-" || !couponAmount ? null : (
        <>
          <StyledHeaderText>
            <b>Coupon Amount</b>
          </StyledHeaderText>
          <StyledText>${couponAmount.toFixed(2)}</StyledText>
        </>
      )}
      {creditAmount === "-" || !creditAmount ? null : (
        <>
          <StyledHeaderText>
            <b>Credit Amount</b>
          </StyledHeaderText>
          <StyledText>${creditAmount.toFixed(2)}</StyledText>
        </>
      )}
      <StyledHeaderText>
        <b>Order Total</b>
      </StyledHeaderText>
      <StyledText style={{ paddingBottom: "0px" }}>
        <b>{typeof total == "number" ? `$${total.toFixed(2)}` : "-"}</b>
      </StyledText>
      <StyledHeaderText
        style={{
          borderTop: "0.5px solid lightgrey",
          marginTop: "20px",
        }}
      >
        <ChangesImg />
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

export default Track;
