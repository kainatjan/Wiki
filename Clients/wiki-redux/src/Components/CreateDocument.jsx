import React, { useState, useEffect } from "react";

import CreateDocumentButton from "./CreateDocumentButton";
import DocumentTitle from "./DocumentTitle";
import DocumentEditor from "./DocumentEditor";
import DocumentType from "./DocumentType";
import LogIn from "./LogIn";
import { DocumentReset_Action } from "../Actions/CreateDocumentActions";
import { useDispatch } from "react-redux";

function CreateDocument() {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("sessionUserId").toString();
  const [isNullified, setisNullified] = useState(false);

  useEffect(() => {
    if(isNullified===false){
      dispatch(DocumentReset_Action());
      setisNullified(true);
    }
      return()=>{
        //console.log("unmount from create Docu");
      }
  }, [isNullified]);
  return (
    <div>
      {isNullified?
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

          <div className="box">
            <br />
            <CreateDocumentButton />
          </div>

          <div className="box ">
          <br />
            <DocumentEditor />
          </div>

        </div>
      ) : (
        <div>
          <LogIn />
        </div>
      )}
    </div>
    :null}
    </div> );
}

export default CreateDocument;
