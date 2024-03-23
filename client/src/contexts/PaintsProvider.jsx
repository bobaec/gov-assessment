import React, { createContext, useContext, useEffect, useState } from 'react'

const PaintsContext = createContext([]);

export const usePaints = () => useContext(PaintsContext);

export const PaintsProvider = ({ children }) => {
    const [paints, setPaints] = useState({});

     useEffect(() => {
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
            for (let i = 0; i < response.length; i++) {
              if (response[i].quantity >= 7) {
                quantities.available.push(response[i]);
              } else if (response[i].quantity < 7 && response[i].quantity > 0) {
                quantities.low.push(response[i]);
              } else {
                quantities.out.push(response[i]);
              }
            }
            setPaints(quantities);
        } catch (error) {
            console.log('dashboard-paints', error.message);
        }
        }
        getPaints();
    }, [])
  return (
    <PaintsContext.Provider value={paints}>
        {children}
    </PaintsContext.Provider>
  )
};
