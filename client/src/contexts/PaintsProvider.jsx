import React, { createContext, useContext, useEffect, useState } from 'react'

const PaintsContext = createContext([]);

export const usePaints = () => useContext(PaintsContext);

export const PaintsProvider = ({ children }) => {
  const [paints, setPaints] = useState({});
  const [sortedPaints, setSortedPaints] = useState({});

  const getPaints = async () => {
    try {
      const results = await fetch('/paints/', {
        method: "GET",
      })
      const response = await results.json();
      if (!response) {
        throw new Error('Could not get all paints');
      } else {
        const quantities = {
          available: [],
          low: [],
          out: [],
        }

        // sort colors based alphabetically so the colors don't keep swapping when increasing/decreasing quantity
        const sortedColorsArray = response.sort((a, b) => {
          const colorA = a.color.toLowerCase();
          const colorB = b.color.toLowerCase();
          if (colorA < colorB) return -1;
          if (colorA > colorB) return 1;
          return 0;
        });

        // sort colors based on the quantity level and place into an object.
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
      }
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
