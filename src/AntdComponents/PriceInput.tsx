import React, { useState } from 'react';
import {  Input, } from 'antd';


interface PriceValue {
    number?: number;
   
  }
  
  interface PriceInputProps {
    value?: PriceValue;
    onChange?: (value: PriceValue) => void;
  }

const PriceInput: React.FC<PriceInputProps> = ({ value = {}, onChange }) => {
    const [number, setNumber] = useState(0);
    const triggerChange = (changedValue: { number?: number  }) => {
      onChange?.({ number, ...value, ...changedValue });
      
    };

  
    const onNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newNumber = parseInt(e.target.value || '0', 10);
      if (Number.isNaN(number)) {
        return;
      }
      if (!('number' in value)) {
        setNumber(newNumber);
      }
      triggerChange({ number: newNumber });
    };
  
  
  
    return (
      <span>
        <Input
          type="text"
          value={value.number || number}
          onChange={onNumberChange}
          style={{ width: '100%' }}
        />
     
      </span>
    );
  };
  export default PriceInput