// subscribe the document
import React from "react";
import { useHistory } from "react-router-dom";
import {useSelector} from 'react-redux';
import { UnSubscribeDocumentApi } from "../APIs/APIs";

function UnSubscribeButton() {
  const history = useHistory();
  const userId = localStorage.getItem("sessionUserId").toString();
  const DocumentId = useSelector(
    (state) => state.CreateDocumentReducer.documentId
  );

  async function UnSubscribeADocument()  {
    await UnSubscribeDocumentApi(
      "/Workspace/UnSubscribeDocument/",
      userId,
      DocumentId
    )
      .then((res) => {
        if (res.status == "200") {
          alert("UnSubscribed");
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
      <button className="SidebarListRow" onClick={UnSubscribeADocument}>
        Unsubscribe
      </button>
    </div>
  );
}

export default UnSubscribeButton;
