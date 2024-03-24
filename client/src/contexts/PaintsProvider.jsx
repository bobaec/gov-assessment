import React, { createContext, useContext, useEffect, useState } from 'react'

const PaintsContext = createContext([]);

export const usePaints = () => useContext(PaintsContext);

export const PaintsProvider = ({ children }) => {
  const [paints, setPaints] = useState({});
  const [sortedPaints, setSortedPaints] = useState({});

  const getPaints = async () => {
    try {
      const results = await fetch('http://localhost:5000/paints/', {
      method: "GET",
      })
      const response = await results.json();
      const quantities = {
        available: [],
        low: [],
        out: [],
      }
      const sortedColorsArray = response.sort((a, b) => {
        const colorA = a.color.toLowerCase();
        const colorB = b.color.toLowerCase();
        if (colorA < colorB) return -1;
        if (colorA > colorB) return 1;
        return 0;
      });

      for (let i = 0; i < sortedColorsArray.length; i++) {
        if (sortedColorsArray[i].quantity >= 7) {
          quantities.available.push(sortedColorsArray[i]);
        } else if (sortedColorsArray[i].quantity < 7 && sortedColorsArray[i].quantity > 0) {
          quantities.low.push(sortedColorsArray[i]);
        } else {
          quantities.out.push(sortedColorsArray[i]);
        }
      }
      
      setPaints(sortedColorsArray);
      setSortedPaints(quantities);
    } catch (error) {
        console.log('dashboard-paints', error.message);
      }
    }
  useEffect(() => {
      getPaints();
  }, [])

  const paintsContextValues = {
    paints,
    sortedPaints,
    getPaints,
  };
  return (
    <PaintsContext.Provider value={paintsContextValues}>
        {children}
    </PaintsContext.Provider>
  )
};
