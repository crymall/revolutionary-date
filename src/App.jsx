import { useState } from "react";
import { Title, Text, Button } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import "./repubdate/rdate.js";
import "./App.css";

function App() {
  const [dateValue, setDate] = useState(null);
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
          <span className="big-result">{revolutionaryMonth.ename}</span>! Enjoy
          the <span className="big-result">{revolutionaryDay.ename}</span>!
        </span>
      );
    } else {
      dateMessage = (
        <span>
          The day of{" "}
          <span className="big-result">{revolutionaryDay.ename}</span> in the
          month of{" "}
          <span className="big-result">{revolutionaryMonth.ename}</span>.
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

        <DatePickerInput
          label="Select a Gregorian (Filthy Royalist) Date:"
          placeholder="Date"
          value={dateValue}
          onChange={setDate}
          size="md"
        />

        <Button color="red">EN</Button>
        <Button color="blue">FR</Button>

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
