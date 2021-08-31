import { GetDocumentTypeApi } from "../APIs/APIs";
import React, { useState, useEffect } from "react";
import { DocumentTypeId_Action } from "../Actions/CreateDocumentActions";
import { useSelector, useDispatch } from "react-redux";

function DocumentType() {
  const dispatch = useDispatch(); 
  const [documentType, setDocumentType] = useState([]);
  const selectedOptionId = useSelector((state) => state.CreateDocumentReducer.documentTypeId);
  const [documentTypeId, setDocumentTypeId] = useState(selectedOptionId);
  const ViewDocument = useSelector(
    (state) => state.CreateDocumentReducer.viewDocument
  ); 
  const [selectedValue, setSelectedValue] = useState("");
  const [index, setIndex] = useState();


  useEffect(async () =>
   {
    await GetDocumentTypeApi("/workspaceType/")
      .then((res) => {
        let data= res.data;
        setDocumentType(data);
        
        setIndex(data.map(item => item.Id).indexOf(documentTypeId));
        setSelectedValue(data[index].TypeName);
      })
      .catch((error) => {});
     
    dispatch(DocumentTypeId_Action(documentTypeId));

    return () => {
      console.log("unmount from type");
    };
  }, [documentTypeId,selectedValue,index]);
  
  const onChangeOption = (e) => {
    setDocumentTypeId(e.target.selectedIndex);
  };

  return (
    <div>
      {ViewDocument?
        <select
        disabled
       value={selectedValue}
      >
        <option> Select Document Type</option>
        {documentType.map((x) => {
          return <option key={x.Id}>{x.TypeName}</option>;
        })}
      </select>
      :
      <select
        onChange={(e) => onChangeOption(e)}
       value={selectedValue}
      >
        <option> Select Document Type</option>
        {documentType.map((x) => {
          return <option key={x.Id}>{x.TypeName}</option>;
        })}
      </select>
}
    </div>
  );
}

export default DocumentType;
