
interface UtilsProps{
    sortValue:string,
    setSortValue: React.Dispatch<React.SetStateAction<string>>;
    trueValue:string,
    falseValue:string,
    text: string
}

const SelectButton: React.FC<UtilsProps>= ({ sortValue, setSortValue, trueValue, falseValue, text })=>{
    const handleSortChange = () => {
        // Toggle between 'n' and 'v' when the checkbox is clicked
        setSortValue((prevSortValue) => (prevSortValue === trueValue ? falseValue : trueValue));
      };
    
      return (
        <div className="sortNameValueContainer">
          <label className="switchSort">
            <input
              type="checkbox"
              checked={sortValue === trueValue} // Set checked based on the 'v' value
              onChange={handleSortChange}
            />
            <span className="sliderSort"></span>
          </label>
          <p>{text} {sortValue===trueValue?trueValue:falseValue}</p>
        </div>
      );
}

export default SelectButton;