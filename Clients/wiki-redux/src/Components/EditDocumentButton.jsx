import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { EditDocumentApi } from "../APIs/APIs";
import Notification_Action from "../Actions/NotificationAction";

function EditDocumentButton() {
  const history = useHistory();
  const dispatch = useDispatch();
  const DocumentId = useSelector(
    (state) => state.CreateDocumentReducer.documentId
  );
  const Title = useSelector((state) => state.CreateDocumentReducer.title);
  const Text = useSelector((state) => state.CreateDocumentReducer.text);

  const userId = localStorage.getItem("sessionUserId").toString();
  

  const DocumentTypeId = useSelector(
    (state) => state.CreateDocumentReducer.documentTypeId
  );
  const connection = useSelector(
    (state) => state.ConnectionHubReducer.connection
  ); //signalR

  function Notification() {
    if (connection !== null) {
      let documentId =  DocumentId.toString();
      connection
        .invoke("Notification", {
          userId,
          documentId
        })
        .then(console.log("then"))
        .catch(function (err) {
          console.log("err", err);
          console.error(err.toString());
        });
    }
  }
  const EditADocument = async () => {
    await EditDocumentApi(
      "/Workspace/EditDocument/",
      Title,
      Text,
      DocumentTypeId,
      DocumentId
    )
      .then((res) => {
        if (res.status == "200") {
          dispatch(Notification_Action(true, DocumentId));
       
          Notification();

          history.push({
            pathname: "/Home",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <button className="SidebarListRow" onClick={EditADocument}>
        Edit
      </button>
    </div>
  );
}

export default EditDocumentButton;
