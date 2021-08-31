import React from "react";
import {useHistory} from 'react-router-dom'
function CreateNew() {
    let history = useHistory();
 const CreateDocument=()=> {
        return history.push("/CreateDocument");
      }
  return (
        <div className="SidebarList">
          <button className="SidebarListRow" id="createWorkSpace" onClick={CreateDocument} >
            Create New
          </button>
        </div>
  );
}

export default CreateNew;
