import { useState } from "react";
import { Checkbox } from "@mui/material";

function App() {
  const [streak, setStreak] = useState<boolean[]>(Array.from({length: 100}, () => true));

  const handleCheckboxClick = (index: number) => {
    const newStreak = streak.map((s, i) => i === index ? !s : s)
    setStreak(newStreak)
  }

  return (
    <div>
      {streak.map((s, i) => (<Checkbox key={i} checked={s} onChange={() => handleCheckboxClick(i)}/>))}
    </div>
  );
}

export default App;
