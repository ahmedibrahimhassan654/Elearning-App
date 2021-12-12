import { useEffect, useState } from "react";
import InstructorRoute from "../../../components/routes/InstructorRoute";
import Resizer from "react-image-file-resizer";
import CourseCreateForm from "../../../components/forms/CourseCreateForm";
import { toast } from "react-toastify";
import axios from "axios";
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
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image");
  const handleChange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };
  const handleImage = (e) => {
    let file = e.target.files[0];
    setPreview(window.URL.createObjectURL(file));
    setUploadButtonText(file.name);
    setvalues({ ...values, loading: true });
    Resizer.imageFileResizer(file, 720, 500, "JPEG", 100, 0, async (uri) => {
      try {
        let { data } = await axios.post("/api/course/uploade-image", {
          image: uri,
        });
        console.log("image uploaded", data);
        toast("image uploded succesfuly ");
        setvalues({ ...values, loading: false });
      } catch (err) {
        console.log(err);
        setvalues({ ...values, loading: false });
        toast("upload image failed,please try again ");
      }
    });
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
          uploadButtonText={uploadButtonText}
        />
      </div>
      <pre>{JSON.stringify(values, null, 4)}</pre>
    </InstructorRoute>
  );
};

export default CourseCreate;
