import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout as logoutAction } from "../slices/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useLogoutMutation } from "../slices/usersApiSlice";

const Header = () => {

  const { userInfo } = useSelector((state)=>state.auth);

  const [logout] = useLogoutMutation();
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async()=>{

    try{
      
      dispatch(logoutAction());
      await logout();

      toast.success(`Logged Out`);
      navigate('/login');
    }

    catch(e){
      console.log(e);
      toast.error(`${e?.data?.message}`);
    }

  }

  return (
    <header>
      <div className="flex justify-between p-5 navbar bg-base-100 shadow-sm px-4">
        
        <div className="flex">
          <Link to="/"
            className="text-xl  font-bold tracking-wide text-primary hover:text-primary/80 transition">
            E-Commerce
          </Link>
        </div>

        <div className="">
          <ul className="flex items-center gap-2">
            
            <li>
              <Link to="/cart"
                className="relative flex items-center gap-1 hover:bg-base-200 rounded-lg px-3 py-2 transition">
                🛒 Cart
              </Link>
            </li>

            {/* User Info / Sign In */}
            <li>
               {userInfo ? (
                <details className="dropdown dropdown-end">
                  <summary className="btn btn-ghost rounded-lg">
                    {userInfo.user.name}
                  </summary>
                  <ul className="menu dropdown-content bg-base-100 shadow-lg rounded-xl w-40 p-2 mt-2">
                    <li>
                      <Link to="/profile" className="hover:bg-base-200 rounded-lg">
                        👤 Profile
                      </Link>
                    </li>
                    <li>
                      <button className="hover:bg-base-200 rounded-lg">
                        💡 Light
                      </button>
                    </li>
                    <li>
                      <button onClick={handleLogout} className="hover:bg-base-200 rounded-lg text-error">
                        🚪 Log Out
                      </button>
                    </li>
                  </ul>
                </details>
              ) :  
              
                <Link to="/login" className="btn btn-primary btn-sm rounded-lg px-4">
                  Log In
                </Link>
                }
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
