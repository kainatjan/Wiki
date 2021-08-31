import React, { useState, useEffect } from "react";
import { DocumentTitle_Action } from "../Actions/CreateDocumentActions";
import {useSelector, useDispatch } from "react-redux";




function DocumentTitle() {
  const Title = useSelector((state) => state.CreateDocumentReducer.title);
  const dispatch = useDispatch();
  const [stateTitle, setTitle] = useState(Title);
  const ViewDocument = useSelector(
    (state) => state.CreateDocumentReducer.viewDocument
  );
 
console.log("ViewDocument",ViewDocument);
  useEffect(() => {
    dispatch(DocumentTitle_Action(stateTitle));
    return()=>{
      console.log("unmount from title");
    }
  }, [stateTitle]);
  
  return (
    <div>
      <div className="box ">
        <br />
        <label className="m-2">
          <b>Title:</b>
        </label>
        {ViewDocument?
        <input
        name="Title"
        id="Title"
        type="text"
        autoComplete="off"
        required
        disabled
        onChange={(e) =>setTitle(e.target.value)}
        value={stateTitle}
      />
        :
        <input
          name="Title"
          id="Title"
          type="text"
          autoComplete="off"
          required
          onChange={(e) =>setTitle(e.target.value)}
          value={stateTitle}
        />
        }
        
        <br />
      </div>
    </div>
  );
}
export default DocumentTitle;
