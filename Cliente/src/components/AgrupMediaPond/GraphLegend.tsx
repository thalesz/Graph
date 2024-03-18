import { colorsByGroup } from "./colors";

const legendItems = Object.keys(colorsByGroup).map((key) => ({
    label: `Grupo ${key}`,
    backgroundColor: colorsByGroup[key], // Use backgroundColor for legend color
  }));
  
  
  const Legend = (items:any) => (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {items.map((item:any, index:any) => (
        <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
          <span
            style={{
              display: 'inline-block',
              width: '15px',
              height: '15px',
              backgroundColor: item.backgroundColor,
              marginRight: '5px',
              border: '1px solid #ccc',
            }}
          ></span>
          {item.label}
        </li>
      ))}
    </ul>
  );

const GraphLegend: React.FC= ()=> {
    return(
        <section>
            <div className="Legend" >
                {Legend(legendItems)}
            </div>
        </section>
    )
}
export default GraphLegend