
function Headers() {
  return (
    <div>
      <header className="container py-4">
        <div className="d-flex justify-content-between align-items-center">
          <div className="logo">
            <img src="logo One_Task.png" alt="Logo" className="img-fluid" style={{ maxWidth: "70px" ,height: "50"}} />
          </div>

          <nav>
            <ul className="nav">
              <li className="nav-item">
                <a href="/signUp" className="btn btn-outline-primary mx-2">
                  Sign up
                </a>
              </li>
              <li className="nav-item">
                <a href="/login" className="btn btn-outline-primary mx-2">
                  Login
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
}

export default Headers;
