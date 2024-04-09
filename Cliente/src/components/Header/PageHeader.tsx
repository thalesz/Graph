import IconButtonFinal from "./IconButtonFinal"
import RadioHeader from "./RadioHeader"
import SearchHeaderFinal from "./SearchHeaderFinal"
import SideMenu from "./SideMenu"

const PageHeader: React.FC = ()=>{
    return(
        <section className="HeaderFinal">
            <SideMenu></SideMenu>
            <IconButtonFinal></IconButtonFinal>
            <SearchHeaderFinal></SearchHeaderFinal>
            <RadioHeader></RadioHeader>

        </section>
    )
}
export default PageHeader