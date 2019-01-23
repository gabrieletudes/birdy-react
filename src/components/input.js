import React from 'react'

const Input = ({label, type, name, value, onChange, ariaDescription, errormessage, defaultValue}) => {
  return (
    <div className="form-group">
      <label className="label" htmlFor={name}>
        <input
          type={type}
          name={name}
          onChange={onChange}
          value={value}
          className="label__input"
          id={name}
          aria-describedby={ariaDescription}
          required
          defaultValue={defaultValue}
        />
        <span className="label__text">{label}</span>
      </label>
      {errormessage && <span className="label__error">{errormessage}</span>}
      </div>
  )
}

export default Input;
