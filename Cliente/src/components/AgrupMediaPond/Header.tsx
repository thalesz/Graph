interface HeaderProps{
    title:string,
    subtitle:string
  }

const Header: React.FC<HeaderProps> = ({title, subtitle}) =>{
    return(
        <div className="HeaderForm">
            <h1>{title}</h1>
            <h2>{subtitle}</h2>
        </div>
    )
}
export default Header;