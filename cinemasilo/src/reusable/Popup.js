import { createPortal } from "react-dom";
import "../styles/Popup.css";

export default function Popup(props) {
  return createPortal(
    <div className="popup-custom container">
      <h3>{props.title}</h3>
      <div>{props.children}</div>
      <div>
        {props.goButton !== "null" ? (
          <button
            className="btn btn-danger confirm-btn float-end"
            type="button"
            onClick={() => {
              props.onConfirm();
            }}
          >
            {props.goButton}
          </button>
        ) : (
          <></>
        )}
        <button
          className="btn btn-secondary cancel-btn float-end me-3"
          type="button"
          onClick={() => {
            props.onCancel();
          }}
        >
          Cancel
        </button>
      </div>
    </div>,
    document.getElementById("popup-container")
  );
}
