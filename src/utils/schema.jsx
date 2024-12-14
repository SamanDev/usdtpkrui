
import * as Yup from "yup";
import Trans from "./getword";


const getSchema = (propobj,mode) => {
    var newData = propobj
    console.log(mode,newData)
    if(mode=="password"){
        newData[mode]= Yup.string().required(Trans("req_minPass")).min(8, Trans("req_minPass")).matches(/(?=.*\d)/, Trans("req_havenumPass")).matches(/((?=.*[A-Z]){1})/, Trans("req_havewordPass")).matches(/(?=.*\W)/, Trans("req_havesignPass"));
    }
    if(mode=="newPassword"){
        newData[mode]= Yup.string().required(Trans("req_minPass")).oneOf([Yup.ref("password"), null], Trans("req_notmatchPass"));
    }
    if(mode=="transferUser"){
        newData[mode]= Yup.string().required(Trans("req_minUser")).min(3, Trans("req_minUser")).max(12, Trans("req_maxUser"));
    }
  console.log(mode,newData)
  return newData
};

export default getSchema;
