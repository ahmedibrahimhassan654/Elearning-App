import { useEffect, useState } from "react";
import InstructorRoute from "../../../components/routes/InstructorRoute";
import Resizer from "react-image-file-resizer";
import CourseCreateForm from "../../../components/forms/CourseCreateForm";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
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
  const [image, setImage] = useState({});
  const [preview, setPreview] = useState("");
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image");
  const router = useRouter();
  const handleChange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/course", { ...values, image });
      console.log(data);
      toast.success("Course Created Successfully");
      router.push("/instructor");
    } catch (err) {
      toast(err.response.data);
    }
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
        setImage(data);
        setvalues({ ...values, loading: false });
      } catch (err) {
        console.log(err);
        setvalues({ ...values, loading: false });
        toast("upload image failed,please try again ");
      }
    });
  };
  const handleImageRemove = async () => {
    try {
      // console.log(values);
      setvalues({ ...values, loading: true });
      const res = await axios.post("/api/course/remove-image", { image });
      setImage({});
      setPreview("");
      setUploadButtonText("Upload Image");
      setvalues({ ...values, loading: false });
      toast("Image deleted succefuly");
    } catch (err) {
      console.log(err);
      setvalues({ ...values, loading: false });
      toast("Image deleted failed. Try later.");
    }
  };

  return (
    <InstructorRoute>
      <h1 className="jumbotron text-center square mt-3">Create course</h1>
      <div className="pt-3 pb-3 mr-5">
        <CourseCreateForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleImage={handleImage}
          handleImageRemove={handleImageRemove}
          values={values}
          setvalues={setvalues}
          preview={preview}
          uploadButtonText={uploadButtonText}
        />
      </div>
      <pre>{JSON.stringify(values, null, 4)}</pre>
      <hr />
      <pre>{JSON.stringify(image, null, 4)}</pre>
    </InstructorRoute>
  );
};

export default CourseCreate;
