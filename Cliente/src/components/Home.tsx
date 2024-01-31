import Card from "./Card"
import cardDataArray from "./cardDataArray";
const Home =()=>{
    return(
        <section className="CardFeed">
            {cardDataArray.map((cardData, index) => (
                <Card key={index} cardData={cardData} />
            ))}
        </section>
    )
}

export default Home;