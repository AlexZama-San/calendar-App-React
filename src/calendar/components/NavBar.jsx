import { useAuthStore } from "../../hooks/useAuthStore"

export const NavBar = () => {

  const {user, startLogout} = useAuthStore()

  const handleLogout = () => {
    startLogout()
  }

  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
    <span className="navbar-brand">
      <i className="fas fa-calendar-alt">
        &nbsp;
        {user.name}
      </i>
    </span>

    <button onClick={handleLogout} className="btn btn-outline-danger">
      <i className="fas fa-sign-out-alt">

      </i>
      &nbsp;
      <span>Salir</span>
    </button>
  </div>
  )
}
