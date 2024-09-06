import { useLocation } from 'react-router-dom'
import ThemeToggle from '../components/ThemeToggle'

const GoogleOAuthToken = () => {
    const code=useLocation().search.split('&')[0].split("=")[1]
    localStorage.setItem('jwt-token',code)
    window.location.href="/account/profile"
  return (
    <div>
        <ThemeToggle />
        <div>
        Redirecting to profile page
            </div>
            </div>
  )
}

export default GoogleOAuthToken