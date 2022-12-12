import "./header.css";
import "boxicons";

const Header = () => {
  return (
    <header className="header__container">
      <section>Modulo de consulta y registro de usuarios al sistema</section>
      <section>
        <span className="header__profile-icon">
          <i className="bx bxs-user-circle"></i>
        </span>
      </section>
    </header>
  );
};

export default Header;
