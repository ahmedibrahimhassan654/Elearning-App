import { useEffect, useState } from "react";
import InstructorRoute from "../../../components/routes/InstructorRoute";

import CourseCreateForm from "../../../components/forms/CourseCreateForm";

const CourseCreate = () => {
  const [values, setvalues] = useState({
    name: "",
    description: "",
    price: "9.99",
    uploading: false,
    paid: true,
    category: "",
    loading: false,
  });
  const [preview, setPreview] = useState("");
  const handleChange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };
  const handleImage = (e) => {
    setPreview(window.URL.createObjectURL(e.target.files[0]));
  };

  return (
    <InstructorRoute>
      <h1 className="jumbotron text-center square mt-3">Create course</h1>
      <div className="pt-3 pb-3 mr-5">
        <CourseCreateForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleImage={handleImage}
          values={values}
          setvalues={setvalues}
          preview={preview}
        />
      </div>
      <pre>{JSON.stringify(values, null, 4)}</pre>
    </InstructorRoute>
  );
};

export default CourseCreate;
