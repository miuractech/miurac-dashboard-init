import { User } from "firebase/auth";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { TApplicationErrorObject } from "../../../lib";
import { RootState } from "../../../app/store";
import { AdminAuthInterface } from "../interfaces/auth.interfaces";
import { setAdminUserState } from "../store/admin.user.slice";

const { googleSignIn } = AdminAuthInterface();

export const SignIn: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.adminUser);

  function userStateUpdateCallback(res: User | TApplicationErrorObject) {
    if ("severity" in res) {
      dispatch(
        setAdminUserState({
          user: null,
          userLoading: false,
          error: res.message,
          signOutMessage: "",
        })
      );
    } else {
      dispatch(
        setAdminUserState({
          user: res,
          userLoading: false,
          error: "",
          signOutMessage: "",
        })
      );
    }
  }

  return (
    <React.Fragment>
      <div className="grid" style={{gridTemplateColumns:'1fr 1fr'}} >
        <div className='flex justify-content-center align-items-center' style={{height: window.innerHeight-24}} >
          *-- Miurac image --*
        </div>
        <div className='flex justify-content-center align-items-center' style={{height: window.innerHeight-24}}>
          {user === null ? (
            <button
            className='primary-button'
              onClick={async () => {
                userStateUpdateCallback(await googleSignIn());
              }}
            >
              Sign In With Google
            </button>
          ) : (
            <h1>You Are Already Signed In.</h1>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};
