import React from 'react';
// import { Route, NavLink } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

let collapsed = true;

function toggleNavbar() {
  collapsed = !collapsed;
  console.log('collapsed', collapsed);
}

function renderLoginAndRegBtn() {
  return (
    <>
      <li className="nav-item">
        <NavLink className="nav-link" to="/login">
          Login
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/register">
          Register
        </NavLink>
      </li>
    </>
  );
}

function renderUserAndLogoutBtn(user) {
  return (
    <>
      <li className="nav-item">
        <NavLink className="nav-link" to="/profile">
          {user.name}
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/logout">
          Logout
        </NavLink>
      </li>
    </>
  );
}

const Navbar = ({ user }) => {
  // console.log('userprops', userData);
  // const { collapsed } = this.state;
  const classOne =
    collapsed === true
      ? 'collapse navbar-collapse'
      : 'collapse navbar-collapse show';
  const classTwo =
    collapsed === true
      ? 'navbar-toggler navbar-toggler-right collapsed'
      : 'navbar-toggler navbar-toggler-right';

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          Vidly
        </NavLink>
        <button
          onClick={() => toggleNavbar()}
          className={`${classTwo}`}
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className={`${classOne}`} id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/movies">
                Movies <span className="sr-only">(current)</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/customers">
                Customers
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/rentals">
                Rentals
              </NavLink>
            </li>
            {!user && renderLoginAndRegBtn()}
            {user && renderUserAndLogoutBtn(user)}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// class Navbar extends Component {
//   state = {
//     collapsed: true,
//     // user: {},
//   };

//   constructor(props) {
//     super(props);
//     console.log('props', props);
//     console.log('props', this.props);
//     // this.toggleNavbar = this.toggleNavbar.bind(this);
//     this.state = {
//       collapsed: true,
//     };
//     const { user } = this.props;
//     console.log('navbar user', user);
//     console.log('navbar user', this.props.user);
//   }

//   componentDidMount() {
//     const { user } = this.props;
//     console.log('navbar user', user);
//     console.log('navbar user', this.props);
//   }

//   toggleNavbar = () => {
//     const { collapsed } = this.state;
//     this.setState({
//       collapsed: !collapsed,
//     });
//   };

//   render() {
//     const { collapsed } = this.state;
//     const classOne = collapsed
//       ? 'collapse navbar-collapse'
//       : 'collapse navbar-collapse show';
//     const classTwo = collapsed
//       ? 'navbar-toggler navbar-toggler-right collapsed'
//       : 'navbar-toggler navbar-toggler-right';

//     return (
//       <nav className="navbar navbar-expand-md navbar-light bg-light">
//         <div className="container">
//           <NavLink className="navbar-brand" to="/">
//             Vidly
//           </NavLink>
//           <button
//             onClick={this.toggleNavbar}
//             className={`${classTwo}`}
//             type="button"
//             data-toggle="collapse"
//             data-target="#navbarResponsive"
//             aria-controls="navbarResponsive"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon" />
//           </button>
//           <div className={`${classOne}`} id="navbarNav">
//             <ul className="navbar-nav">
//               <li className="nav-item">
//                 <NavLink className="nav-link" to="/movies">
//                   Movies <span className="sr-only">(current)</span>
//                 </NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink className="nav-link" to="/customers">
//                   Customers
//                 </NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink className="nav-link" to="/rentals">
//                   Rentals
//                 </NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink className="nav-link" to="/login">
//                   Login
//                 </NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink className="nav-link" to="/register">
//                   Register
//                 </NavLink>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>
//     );
//   }
// }

// export default Navbar;
