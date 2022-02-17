import React, { useEffect } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { SignIn } from './midl/auth/components/google-sign-in';
import UserSignOut from './midl/auth/components/user-signout';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { RootState } from './app/store';
// import IsAdmin from './midl/auth/components/is-admin';
import { AdminAuthHooks } from './midl/auth/hooks/auth.hooks';
import { BrowserRouter } from 'react-router-dom';
import { AdminAuthInterface } from './midl/auth/interfaces/auth.interfaces';
import { setAdminUserState } from './midl/auth/store/admin.user.slice';
const { useFetchUserIsAdmin } = AdminAuthHooks();
const { userSignOut } = AdminAuthInterface();
function App() {
  const { user, error:authError, userLoading, signOutMessage } = useAppSelector((state: RootState) => state.adminUser);
  const { isAdmin, loadingIsAdmin } = useFetchUserIsAdmin(user);
  const dispatch = useAppDispatch()
  const signOut = async () => {
    const res = await userSignOut();
    if ("severity" in res) {
      dispatch(
        setAdminUserState({
          user: user,
          userLoading: false,
          error: '',
          signOutMessage: res.message,
        })
      );
    } else {
      dispatch(
        setAdminUserState({
          user: null,
          userLoading: false,
          error: "error",
          signOutMessage:"You\'re not Authorized",
        })
      );
    }
  }
  useEffect(() => {
    console.log('loading user',loadingIsAdmin , isAdmin);
    if(!loadingIsAdmin && user) {
      if(isAdmin !== 'isAdmin'){
        signOut()
      }
    }
    
  }, [user, loadingIsAdmin,isAdmin])
  
  if(loadingIsAdmin && userLoading) <>loading...</>
    return (
      <div className="App">
        {loadingIsAdmin?
        <>
        Loading ...
        </>:
        <>
          <BrowserRouter>
            {user && isAdmin ==='isAdmin' ?
            <UserSignOut />:
            <SignIn />
            }
          </BrowserRouter>
        </>
        }
        <div
        style={{position:'fixed', color:'red',zIndex:1500}}
        >
          {authError && signOutMessage}
        </div>
      </div>
    );
}

export default App;