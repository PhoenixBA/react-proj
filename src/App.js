
import React, {useEffect, useState} from "react";
import DisplayComponent from './Components/DisplayComponent';
import BtnComponent from './Components/BtnComponent';
import './App.css';
import React, { interval, startWith } from "rxjs";

const observable$ = interval(300).pipe(
  startWith(wait)
)


function App() {
  const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });
  useEffect(() => {
    const sub = observable$.subscribe(setTime);
    return () => sub.unsubscribe();
  }, [])
  const [interval, setInterv] = useState();
  const [status, setStatus] = useState(0);

  // not started = 0
  // started = 1
  // paus = 2

  const start = () => {
    run();
    setStatus(1);
    setInterv(setInterval(run, 10));
  };

  var updatedMs = time.ms, updatedS = time.s, updatedM = time.m, updatedH = time.h;
  const run = () => {
    if(updatedM === 59) {
      updatedH++;
      updatedM = 0;
    }
    if(updatedS === 59) {
      updatedM++;
      updatedS = 0;
    }
    if (updatedMs === 99) {
      updatedS++;
      updatedMs = 0;
    }
    updatedMs++;
    return setTime({ms:updatedMs, s:updatedS, m:updatedM, h:updatedH});
  };
  
  const stop = () => { 
    clearInterval(interval);
    setStatus(2);
  };

  const reset = () => { 
    clearInterval(interval);
    setStatus(0);
    setTime({ms:0, s:0, m:0, h:0});
  };
  
  const wait = () => start();
  
  return (
    <div className="main-section">
      <div className="clock-holder">
        <div className="stopwatch">
          <DisplayComponent time={time}/>
          <BtnComponent status={status} wait={wait} reset={reset} stop={stop} start={start}/>
        </div>
      </div>
    </div>
  );
}

export default App;


// const source = Rx.Observable
//   .interval(100 /* ms */ )
//   .timeInterval();