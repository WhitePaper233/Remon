import React from "react";
import "../../styles/marquee.css";

interface MarqueeProps {
  text: string;
  reversed?: boolean;
  className?: string;
}

const Marquee: React.FC<MarqueeProps> = ({ text, className, reversed }) => {
  return (
    <div className={"marquee " + className}>
      <div className={reversed ? 'marquee-inner-reversed' : 'marquee-inner'}>
        <p>{text}</p>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Marquee;
