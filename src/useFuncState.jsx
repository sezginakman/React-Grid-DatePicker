import { useState } from 'react';

export default function useFuncState(fn) {

  const [val, setVal] = useState(() => fn);

  function setFunc(fn) {
    setVal(() => fn);
  }

  return [val, setFunc];  
}