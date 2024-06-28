import React, { useEffect, useState } from 'react'
import './Boxes.css'

const Boxes = ({title, value, icon}) => {
  return (
    <div className='box'>
        <div className='box-left'>
            <CountUpAnimation initialValue={0} targetValue={value} />
            <pre><p>{title}</p></pre>
        </div>
        <div className='box-right'>
            {icon}
        </div>
    </div>
  )
}

export default Boxes

const CountUpAnimation = ({
  initialValue,
  targetValue
}) => {
  const [count, setCount] = useState(initialValue);
  const duration = 2000; 

  useEffect(() => {
      let startValue = initialValue;
      const interval = Math.floor(
          duration / (targetValue - initialValue));

      const counter = setInterval(() => {
          startValue += 1;
          setCount(startValue);
          if (startValue >= targetValue) {
              clearInterval(counter);
          }
      }, interval);

      return () => {
          clearInterval(counter);
      };
  }, [targetValue, initialValue]);

  return (
      <h5>
        {count}
      </h5>
  );
};