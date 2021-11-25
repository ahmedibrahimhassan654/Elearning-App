import { useEffect, useState } from "react";
import InstructorRoute from "../../../components/routes/InstructorRoute";

const CourseCreate = () => {
  const [values, setvalues] = useState({
    name: "",
    description: "",
    price: "9.99",
    uploading: false,
    loading: false,
    imagePreview: "",
  });

  const handleChange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  const courseCreateForm = () => (
    <>
      <div className="mx-auto " style={{ width: "100%" }}>
        <div className="row">
          <form className="col-md-12" onSubmit={handleSubmit}>
            <div class="mb-3 form-group">
              <label for="exampleInputname" class="form-label">
                Course Name
              </label>
              <input
                type="text"
                name="name"
                className="form-control"
                aria-describedby="nameHelp"
                placeholder="course name"
                value={values.name}
                onChange={handleSubmit}
              />
              <div id="emailHelp" className="form-text text-center">
                Make it perfect.
              </div>
            </div>

            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
  return (
    <InstructorRoute>
      <h1 className="jumbotron text-center square mt-3">Create course</h1>
      <div className="pt-3 pb-3 mr-5">{courseCreateForm()}</div>
    </InstructorRoute>
  );
};

export default CourseCreate;
