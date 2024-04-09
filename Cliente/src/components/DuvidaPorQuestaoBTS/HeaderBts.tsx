import { HeaderBtsProps } from "./interfaceBoxDuvPerQuestao"
import Card from 'react-bootstrap/Card';


const HeaderBts: React.FC<HeaderBtsProps>= ({title})=>{
    return(
        <>
        <Card.Header as="h5">{title}</Card.Header>
        </>
    )
}
export default HeaderBts