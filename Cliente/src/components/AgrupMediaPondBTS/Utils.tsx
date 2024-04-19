
interface UtilsProps{
    sortValue:boolean,
    setSortValue: React.Dispatch<React.SetStateAction<boolean>>;
    trueValue:string,
    falseValue:string
}

const Utils: React.FC<UtilsProps>= ({ sortValue, setSortValue, trueValue, falseValue })=>{
    const handleSortChange = () => {
        // Toggle between 'n' and 'v' when the checkbox is clicked
        setSortValue((prevSortValue) => (prevSortValue === false ? true : false));
      };
    
      return (
        <div className="sortNameValueContainer">
          <label className="switchSort">
            <input
              type="checkbox"
              checked={sortValue === true} // Set checked based on the 'v' value
              onChange={handleSortChange}
            />
            <span className="sliderSort"></span>
          </label>
          <p>Agrupado por {sortValue===true?trueValue:falseValue}</p>
        </div>
      );
}

export default Utils;