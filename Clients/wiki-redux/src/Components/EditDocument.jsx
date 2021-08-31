import React from "react";
import EditDocumentButton from "./EditDocumentButton";
import DocumentTitle from "./DocumentTitle";
import DocumentEditor from "./DocumentEditor";
import SubscribeButton from "./SubscribeButton";
import UnSubscribeButton from "./UnSubscribeButton";
import DocumentType from "./DocumentType";
import LogIn from "./LogIn";
import { useSelector } from "react-redux";

function EditDocument() {
  const userId = localStorage.getItem("sessionUserId").toString();
  const ViewDocument = useSelector(
    (state) => state.CreateDocumentReducer.viewDocument
  );
  const isSubscribedDocument = useSelector(
    (state) => state.CreateDocumentReducer.isSubscribed
  );
  return (
    <div>
      {userId ? (
        <div>
          <div className="box">
            <br />
            <DocumentType />
          </div>

          <div className="box ">
            <br />
            <DocumentTitle />
          </div>

          {ViewDocument ? (
            <div className="box">
              <br />
              {isSubscribedDocument ? <UnSubscribeButton /> : <SubscribeButton />}
            </div>
          ) : (
            <div className="box">
              <br />
              <EditDocumentButton />
            </div>
          )}

          <div className="box ">
            <DocumentEditor />
          </div>
        </div>
      ) : (
        <div>
          <LogIn />
        </div>
      )}
    </div>
  );
}

export default EditDocument;
