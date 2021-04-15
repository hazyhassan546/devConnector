import { removeAlert, setAlert } from "../redux/action/alert";
import store from "../redux/store";

export const AlertHelper = ({ msg,alertType }) => {
  const id = Math.floor(Math.random() * 100000);
  store.dispatch(
    setAlert({
      id: id,
      msg: msg,
      alertType: alertType,
    })
  );
  setTimeout(() => {
    store.dispatch(removeAlert(id));
  }, 4000);
};
