import React, { useState, useEffect } from "react";
import CreateNew from "./CreateNew";
import { GetAllDocumentsApi, GetSelectedDocumentApi } from "../APIs/APIs";
import * as DocumentActions from "../Actions/CreateDocumentActions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const WorkspaceSidebar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let [publicWorkspaceData, setPublicWorkspaceData] = useState([]);
  let [personalWorkspaceData, setPersonalWorkspaceData] = useState([]);
  let [subscribedWorkspaceData, setSubscribedWorkspaceData] = useState([]);
  const userId = localStorage.getItem("sessionUserId");

  useEffect(async () => {
    await GetAllDocumentsApi("/Workspace/", userId).then((res) => {
      let tmpPublicArray = [];
      let tmpPersonalArray = [];
      let tempSubscribedArray =[]
      for (var i = 0; i < res.data.length; i++) {
        if (
          res.data[i].UserId !== userId &&
          res.data[i].WorkspaceTypeId === 1
        ) {
          if(res.data[i].isSubscribed===true){
            tempSubscribedArray.push(res.data[i]);
          }
          else{
          tmpPublicArray.push(res.data[i]);
          }
        } else {
          tmpPersonalArray.push(res.data[i]);
        }
      }
      setSubscribedWorkspaceData(tempSubscribedArray);
      setPublicWorkspaceData(tmpPublicArray);
      setPersonalWorkspaceData(tmpPersonalArray);
      return res;
    });
  }, [userId]);

  const GetDocument = async (documentId, isView) => {
    await GetSelectedDocumentApi(
      "/Workspace/GetSelectedDocument/",
      documentId,
      userId
    ).then((res) => {
      let data = res.data;
      dispatch(DocumentActions.DocumentTitle_Action(data.Title));
      dispatch(DocumentActions.DocumentTypeId_Action(data.WorkspaceTypeId));
      dispatch(DocumentActions.DocumentText_Action(data.Document));
      dispatch(DocumentActions.DocumentId_Action(data.DocumentId));
      dispatch(DocumentActions.ViewDocument_Action(isView));
      dispatch(DocumentActions.isSubscribedDocument_Action(data.isSubscribed));
      history.push("/EditDocument");
    });
  };

  return (
    <div className="Sidebar">
      <CreateNew />
      <div>
        <label>Public Workspace</label>
        <ul className="SidebarList">
          {publicWorkspaceData.map((val, key) => {
            return (
              <li className="SidebarListRow" key={key}>
                  <div
                    id="title"
                    onClick={() => GetDocument(val.DocumentId, true)}
                  >
                    {val.Title}
                  </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* ksk */}
<div>
<label>Subscribed Workspace</label>
        <ul className="SidebarList">
          {subscribedWorkspaceData.map((val, key) => {
            return (
              <li className="SidebarListRow" key={key}>
                <div
                    id="title"
                    onClick={() => GetDocument(val.DocumentId, true)}
                  >
                    {val.Title}
                  </div>
                  
              </li>
            );
          })}
        </ul>
</div>

      <div>
        <label>Personal Workspace</label>
        <ul className="SidebarList">
          {personalWorkspaceData.map((val, key) => {
            return (
              <li className="SidebarListRow" key={key}>
                <div
                  id="title"
                  onClick={() => GetDocument(val.DocumentId, false)}
                >
                  {val.Title}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default WorkspaceSidebar;
