import React from "react";
import { CreateDocumentApi } from "../APIs/APIs";
import { useHistory } from "react-router-dom";
import {useSelector} from 'react-redux';

function CreateDocumentButton() {
  const userId = localStorage.getItem("sessionUserId");
  const Title = useSelector(state=>state.CreateDocumentReducer.title);
  const Text =useSelector(state=>state.CreateDocumentReducer.text);
  const DocumentTypeId =useSelector(state=>state.CreateDocumentReducer.documentTypeId);
  
  const history = useHistory();
  
   const CreateADocument = async () => {
    await CreateDocumentApi(
      "/Workspace/CreateDocument/",
      Title,
      Text,
      DocumentTypeId,
      userId
    ).then((res) => {
        if (res.status === "200") {
          alert("document created");
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
      <button
        className="SidebarListRow"
        id="createWorkSpace"
        onClick={CreateADocument}>
        Create
      </button>
    </div>
  );
}

export default CreateDocumentButton;