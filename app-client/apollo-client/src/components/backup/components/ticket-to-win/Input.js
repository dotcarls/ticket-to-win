import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
    font-family: HelveticaNeue;
    font-size: 1.5em;
    text-align: center;
    color: palevioletred;
`;

const Input = styled.input`
  font-family: HelveticaNeue;
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;


export default ({ label, placeholder, changeHandler }) => {
    const onChangeHandler = (e) => {
        if (changeHandler) return changeHandler(label, e.target.value);
    };
    
    return (
        <div>
            {label ? <Label>{label}</Label> : ''}
            <Input 
                placeholder={placeholder}
                onChange={onChangeHandler}
            />
        </div>
    );
};