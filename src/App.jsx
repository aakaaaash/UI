import  { useState } from "react";
import './App.css';
import './main.jsx';


const dateArray = ["24-Apr-2024", "02-May-2024", "09-May-2024", "31-May-2024", "21-Jun-2024"];

const strategyArray = [
  {
    View: "Bullish",
    Value: {
      "24-Apr-2024": ["Bull Call Spread", "Bull Put Spread", "Bull Put Spread", "Long Call", "Bull Put Spread"],
      "02-May-2024": ["Bull Call Spread", "Bull Call Spread", "Bull Put Spread", "Long Call"],
      "09-May-2024": ["Strategy Put", "Strategy Call", "Strategy Call"],
    },
  },
  {
    View: "Bearish",
    Value: {
      "24-Apr-2024": ["Bear Call Spread", "Long Put", "Long Put"],
      "31-May-2024": ["Long Put", "Long Put", "Long Put"],
      "21-Jun-2024": ["Strategy3", "Bear Put Spread", "Long Put"],
    },
  },
  {
    View: "RangeBound",
    Value: {
      "24-Apr-2024": ["Short Straddle", "Short Strangle", "Short Strangle"],
      "02-May-2024": ["Short Straddle", "Short Strangle", "Iron Butterfly"],
      "21-Jun-2024": ["Iron Condor", "Iron Butterfly"],
    },
  },
  {
    View: "Volatile",
    Value: {
      "02-May-2024": ["Long Straddle", "Long Strangle", "Strategy1"],
      "09-May-2024": ["Long Straddle", "Long Strangle"],
      "31-May-2024": ["Long Straddle", "Long Strangle", "Long Strangle"],
    },
  },
];

function App() {
  const [selectedView, setSelectedView] = useState("Bullish");
  const [selectedDate, setSelectedDate] = useState(dateArray[0]);

  const strategies = strategyArray.find((item) => item.View === selectedView)?.Value[selectedDate] || [];

  const strategyCount = strategies.reduce((acc, strategy) => {
    acc[strategy] = (acc[strategy] || 0) + 1;
    return acc;
  }, {});

  return (
    
    <div>
      {/* Toggle Buttons */}
      <div className="toggle">
  {["Bullish", "Bearish", "RangeBound", "Volatile"].map((view) => (
    <button
      key={view}
      onClick={() => setSelectedView(view)}
      className={selectedView === view ? "active" : ""}
    >
      {view}
    </button>
  ))}
</div>
      {/* Date Dropdown */}
      <select onChange={(e) => setSelectedDate(e.target.value)} value={selectedDate}>
        {dateArray.map((date) => (
          <option key={date} value={date}>
            {date}
          </option>
        ))}
      </select>

      {/* Strategy Cards */}
      <div>
        {strategies.length > 0 ? (
          Object.entries(strategyCount).map(([name, count]) => (
            <div key={name} className="card">
              <p>
                <strong>{name}</strong>
              </p>
              <p>{count} {count > 1 ? "Strategies" : "Strategy"}</p>
            </div>
          ))
        ) : (
          <p>There are no strategies for {selectedDate}</p>
        )}
      </div>
    </div>
  );
}


export default App;
