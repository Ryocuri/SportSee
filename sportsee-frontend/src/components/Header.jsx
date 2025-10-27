import './Header.css'

/**
 * Header component displaying the SportSee logo and navigation
 * @returns {JSX.Element} Header component
 */
function Header() {
    return (
        <header className="header">
            <div className="header-logo">
                <svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M29 0C12.984 0 0 12.984 0 29C0 45.016 12.984 58 29 58C45.016 58 58 45.016 58 29C58 12.984 45.016 0 29 0ZM29 53.2C15.652 53.2 4.8 42.348 4.8 29C4.8 15.652 15.652 4.8 29 4.8C42.348 4.8 53.2 15.652 53.2 29C53.2 42.348 42.348 53.2 29 53.2Z" fill="#FF0101"/>
                    <path d="M29 10C18.5066 10 10 18.5066 10 29C10 39.4934 18.5066 48 29 48C39.4934 48 48 39.4934 48 29C48 18.5066 39.4934 10 29 10ZM29 44C20.7157 44 14 37.2843 14 29C14 20.7157 20.7157 14 29 14C37.2843 14 44 20.7157 44 29C44 37.2843 37.2843 44 29 44Z" fill="#FF0101"/>
                    <path d="M29 18C23.4772 18 19 23.4772 19 29C19 34.5228 23.4772 39 29 39C34.5228 39 39 34.5228 39 29C39 23.4772 34.5228 18 29 18Z" fill="#FF0101"/>
                </svg>
                <span className="header-logo-text">SportSee</span>
            </div>
            <nav className="header-nav">
                <a href="/" className="header-nav-link">Accueil</a>
                <a href="/profile" className="header-nav-link">Profil</a>
                <a href="/settings" className="header-nav-link">Réglage</a>
                <a href="/community" className="header-nav-link">Communauté</a>
            </nav>
        </header>
    )
}

export default Header