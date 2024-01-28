function Navbar(){



    return (
      <nav className="navbar navbar-expand-sm">
        <div className="container-fluid">
        <a className="navbar-brand" href="#">Today</a>

        {/* hamburger */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Tomorrow</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Wednesday</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Thursday</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Friday</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Saturday</a>
            </li>
          </ul>
          <span className="navbar-text">
            welcome to use the navbar 6000
          </span>
        </div>
       </div>
       </nav>
    )
}


export default Navbar;