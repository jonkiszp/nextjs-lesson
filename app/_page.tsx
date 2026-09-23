"use client";
import Cube from "@/components/Cube";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";


export default () => {
  const [liczba, setLiczba] = useState(5);
  const ref = useRef(null);
  const cal = useCallback(() => {
    console.log(liczba);
  }, [liczba]);

  const data = useMemo(() => {
    let data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return data;
  }, []);

  const click = () => {
    setLiczba(liczba + 1);
  }

  useEffect(() => {
    console.log(liczba);
  }, [liczba,]);

  useEffect(() => {
    if (ref.current !== null) {
      ref.current.appendChild(document.createElement('div'));
    }
  }, [ref]);

  return (
    <div className="" ref={ref}>
      {liczba % 2 == 0 ?
        <Cube>Parzysta</Cube>
        : null
      }
      <Cube>{liczba}</Cube>
      <button onClick={click}>Zmień liczbę</button>
      <button onClick={cal}>Wypisz liczbę</button>
    </div>
  );
}

// równożedne rozwiązanie
// export default function Home() {
//   return (
//     <>
//     </>
//   );
// }

// równożedne rozwiązanie
// const Home = () => {
//   return (<></>);
// }

// export default Home;