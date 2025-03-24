import { toast } from "react-toastify";
import { auth, database } from "../../API/firebase";
import userModel from "../../models/users";
import { RESET_USER, SET_USER } from "../actions/authActions";
import { RESET_FOLDERS_FILES } from "../actions/filefoldersActions";

const setUser = (data) => ({
  type: SET_USER,
  payload: data,
});

const resetUser = () => ({
  type: RESET_USER,
});

export const registerUser =
  ({ name, email, password }, setError) =>
  (dispatch) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        setError("");
        const newUser = userModel(email, name, user.user.uid);
        auth.currentUser.updateProfile({
          name: name,
        });

        database.users.add(newUser).then((usr) => {
          dispatch(
            setUser({
              userId: user.user.uid,
              user: { data: user.user.providerData[0] },
            })
          );
          toast.success("User registered successfully!!");
        });
      })
      .catch((err) => {
        console.log(err);
        if (err.code === "auth/email-already-in-use") {
          setError("Email Already Exists!");
        }
      });
  };

  export const loginUser =
  ({ email, password }, setError) =>
  (dispatch) => {
    if (email === "admin@gmail.com" && password === "admin") {
      const adminUser = {
        uid: "admin",
        email: "admin@gmail.com",
        name: "Admin",
      };
      dispatch(
        setUser({
          userId: "admin",
          user: { data: adminUser },
        })
      );
      toast.success("Admin login successful!");
    } else {
      auth
        .signInWithEmailAndPassword(email, password)
        .then(async (user) => {
          const userData = await database.users
            .where("uid", "==", user.user.uid)
            .get();

          const userDoc = userData.docs[0];
          if (userDoc.exists) {
            dispatch(
              setUser({
                userId: user.user.uid,
                user: { data: userDoc.data() },
              })
            );
            toast.success("Login successful!");
          } else {
            setError("User not found");
          }
        })
        .catch((error) => {
          console.error("Error logging in:", error);
          setError("Invalid email or password");
        });
    }
  };

export const getUser = () => (dispatch) => {
  auth.onAuthStateChanged(function (user) {
    if (user) {
      dispatch(
        setUser({
          userId: auth.currentUser.uid,
          user: { data: auth.currentUser.providerData[0] },
        })
      );
    } else {
      dispatch(resetUser());
    }
  });
};

const resetFilesFolders = () => ({
  type: RESET_FOLDERS_FILES,
});

export const logoutUser = () => (dispatch) => {
  auth.signOut().then(() => {
    dispatch(resetUser());
    dispatch(resetFilesFolders());
  });
};
