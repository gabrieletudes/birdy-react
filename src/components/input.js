import React from 'react'

const Input = ({label, type, name, value, onChange, ariaDescription, errormessage, defaultValue}) => {
  let labelClasses = 'label';
  let labelInputClasses = 'label__input'
  let labelTextClasses = 'label__text'
  if (errormessage) {
    labelClasses += ' label--error';
    labelInputClasses += ' label__input--error';
    labelTextClasses += ' label__text--error'
  }
  return (
    <React.Fragment>
      <div className="form-group">
        <label className={labelClasses} htmlFor={name}>
          <input
            type={type}
            name={name}
            onChange={onChange}
            value={value}
            className={labelInputClasses}
            id={name}
            aria-describedby={ariaDescription}
            required
            defaultValue={defaultValue}
          />
        <span className={labelTextClasses}>{label}</span>
        </label>
      </div>
      {errormessage && <span className="label__error">{errormessage}</span>}
    </React.Fragment>
  )
}

export default Input;
