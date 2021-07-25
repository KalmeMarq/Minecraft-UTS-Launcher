import logo from '../../../../assets/logos/logo.png'
import './HeaderLogo.scss'

const HeaderLogo = () => {
  return (
    <header className='header-logo'>
      <img className='pos-logo' src={logo} alt="" />
    </header>
  )
}

export default HeaderLogo
