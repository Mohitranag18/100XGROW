import { useParams } from "react-router-dom";
import Template1 from "./template1";
import Template2 from "./template2";
import Template3 from "./template3";
import Template4 from "./template4";


const Template = () => {
  const { templateName } = useParams();

  const renderTemplate = () => {
    switch (templateName) {
        case "template1":
            return <Template1 />;
        case "template2":
            return <Template2 />;
        case "template3":
            return <Template3 />;
        case "template4":
            return <Template4 />;
        default:
            return <div>Template not found</div>;
    }
  };

  return <>{renderTemplate()}</>;
};

export default Template;
