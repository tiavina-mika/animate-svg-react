import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useSpring, animated, config } from "react-spring";
import { easeBounceOut } from "d3-ease";
import "./styles.css";

const circlePath = `M18 2.0845
a 15.9155 15.9155 0 0 1 0 31.831
a 15.9155 15.9155 0 0 1 0 -31.831`;

const svgConfig = { easing: easeBounceOut, duration: 2500 };

const Wheel = ({ title, stroke, otherStroke }) => (
  <div>
    <h2>{title}</h2>
    <svg viewBox="0 0 36 36" className="wheel" width="100">
      <path className="circle-bg" d={circlePath} />
      <animated.path
        className="circle"
        strokeDasharray={otherStroke}
        d={circlePath}
      />
      <animated.text x="18" y="20.35" className="percentage">
        {stroke}
      </animated.text>
    </svg>
  </div>
);

function App() {
  const [active, set] = useState(false);

  useEffect(() => {
    set(!active)
  }, [])

  const props3 = useSpring({
    stroke: active ? 100 : 0,
    otherStroke: active ? "100, 100" : "0,100"
  });

  return (
    <div className="App" onClick={() => set(!active)}>
      <Wheel
        title="Loading"
        stroke={props3.stroke.interpolate(x => Math.round(x))}
        otherStroke={props3.otherStroke}
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
