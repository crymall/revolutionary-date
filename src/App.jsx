import { useState } from "react";
import { Title, Text, Button } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import "./repubdate/rdate.js";
import "./App.css";

function App() {
  const [dateValue, setDate] = useState(null);
  const [isFrench, setIsFrench] = useState(false);
  let computedDate;
  let revolutionaryDate;
  let revolutionaryDay;
  let revolutionaryMonth;
  let isComplementaryDay;
  let numericDate;
  let dateMessage;

  if (dateValue) {
    computedDate = new Date(dateValue + "T00:00");
    revolutionaryDate = computedDate.toRevolutionaryObject();
    revolutionaryDay = revolutionaryDate.day;
    revolutionaryMonth = revolutionaryDate.month;
    isComplementaryDay = revolutionaryMonth.number === 0;
    numericDate = computedDate.toRevolutionaryString("numeric");

    if (isComplementaryDay) {
      dateMessage = (
        <span>
          Zounds! This day is a{" "}
          <span className="big-result">{isFrench ? revolutionaryMonth.name : revolutionaryMonth.ename}</span>! Enjoy
          the <span className="big-result">{isFrench ? revolutionaryDay.name : revolutionaryDay.ename}</span>!
        </span>
      );
    } else {
      dateMessage = (
        <span>
          The day of{" "}
          <span className="big-result">{isFrench ? revolutionaryDay.name : revolutionaryDay.ename}</span> in the
          month of{" "}
          <span className="big-result">{isFrench ? revolutionaryMonth.name : revolutionaryMonth.ename}</span>.
        </span>
      );
    }
  }

  return (
    <div className="vintage-wrapper">
      <div className="parchment-card">
        <Title order={1} className="vintage-title">
          Revolutionary Date
        </Title>

        <p className="subtitle">
          The official date interpreter of the French Republican Calendar. Try
          your birthday!
        </p>

        <div className="input-section">
          <DatePickerInput
            label="Select a Gregorian (Filthy Royalist) Date:"
            dropdownType="modal"
            placeholder="Date"
            value={dateValue}
            onChange={setDate}
            size="md"
          />

          <div><Button onClick={() => setIsFrench(false)} variant={isFrench ? "outline" : "filled"} color="red" size="compact-md">
            EN
          </Button>
          <Button onClick={() => setIsFrench(true)} variant={isFrench ? "filled" : "outline"} color="indigo" size="compact-md">
            FR
          </Button></div>
        </div>

        {dateValue && (
          <Text size="xl" className="result-text">
            <p>{dateMessage}</p>
            <p>{numericDate}</p>
          </Text>
        )}
      </div>

      {/* Optional 90s footer style */}
      <div
        style={{ marginTop: "20px", fontStyle: "italic", fontSize: "0.8rem" }}
      >
        ~ FRC Since 1793, site by Reed Gaines ~
      </div>
    </div>
  );
}

export default App;
