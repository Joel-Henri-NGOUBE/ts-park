import { Link } from "react-router-dom";

export default function Header(){
    return <div className="header">
        <Link to="/">Home</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Log In</Link>
        <Link to="/challenge">Challenge</Link>
        <Link to="/addrooms">Add Rooms</Link>
    </div>
}