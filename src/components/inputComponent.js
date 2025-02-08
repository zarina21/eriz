import "../styles/login.scss"


function InputComponent({
  label,
  value,
  onChange,
  type = 'text',
  placeholder = 'placeholder',
  className = 'input'
}){
  return(
    <div className="field py-2">
      <label className="label">{label}</label>
      <div className="control">
        <input
          className={className}
          type={type}
          placeholder={placeholder}
          onChange={(value) => onChange(value.target.value)}
          value={value}
        />
      </div>
    </div>
  )
}

export default InputComponent