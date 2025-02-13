import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";

const SpinningWheel = () => {
  const originalNames = ["Jazeel", "Jannar", "Neisya", "Ka Dwi", "Chessy", "Yumi", "Hisyam"];
  
  const names = [];
  for (let i = 0; i < originalNames.length; i++) {
    names.push(originalNames[i]);
    names.push(originalNames[(i + Math.floor(originalNames.length / 2)) % originalNames.length]);
  }
  
  const riggedName = "Jazeel"; // Nama yang sudah ditentukan
  const [spinning, setSpinning] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(null);

  const data = names.map((name, index) => ({ 
    option: name, 
    id: index,
    style: { backgroundColor: `hsl(${(index * 360) / names.length}, 80%, 60%)` } // Warna berbeda untuk setiap slice
  }));

  const handleSpin = () => {
    let newPrizeNumber = Math.floor(Math.random() * names.length);
    
    const index = names.indexOf(riggedName);
    if (index !== -1) {
      newPrizeNumber = index;
    }
    
    setPrizeNumber(newPrizeNumber);
    setTimeout(() => {
      setSpinning(true);
    }, 100);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <Wheel
        mustStartSpinning={spinning}
        prizeNumber={prizeNumber}
        data={data}
        onStopSpinning={() => setSpinning(false)}
        backgroundColors={data.map(item => item.style.backgroundColor)}
      />
      <button onClick={handleSpin} disabled={spinning} className="bg-green-500 text-white p-2 rounded">
        Putar Roda
      </button>
    </div>
  );
};

export default SpinningWheel;
