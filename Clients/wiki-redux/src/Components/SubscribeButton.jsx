// subscribe the document
import React from "react";
import { useHistory } from "react-router-dom";
import {useSelector} from 'react-redux';
import { SubscribeDocumentApi } from "../APIs/APIs";

function SubscribeButton() {
  const history = useHistory();
  const userId = localStorage.getItem("sessionUserId").toString();
  const DocumentId = useSelector(
    (state) => state.CreateDocumentReducer.documentId
  );

  const SubscribeADocument = async () => {
    await SubscribeDocumentApi(
      "/Workspace/SubscribeDocument/",
      userId,
      DocumentId
    )
      .then((res) => {
        if (res.status == "200") {
          alert("Subscribed");
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
      <button className="SidebarListRow" onClick={SubscribeADocument}>
        Subscribe
      </button>
    </div>
  );
}

export default SubscribeButton;
