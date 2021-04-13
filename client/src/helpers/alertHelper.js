export const AlertHelper = (msg, alertType,time, props) => {
  const id = Math.floor(Math.random() * 100000);
  props?.set_alert({
    id: id,
    msg: msg,
    alertType: alertType,
  });
  setTimeout(() => {
    props?.remove_alert(id);
  }, time);
};
