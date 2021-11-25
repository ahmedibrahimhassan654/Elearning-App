import { useEffect, useState } from "react";
import InstructorRoute from "../../../components/routes/InstructorRoute";
import "arch-editor/dist/arch-editor.css";
import { ArchEditor, BlockToolbar, ArchEditorProvider } from "arch-editor";
import { Button, Select } from "antd";
import { SaveOutlined } from "@ant-design/icons";

const { Option } = Select;
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

  const handleChange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };
  const handleImage = (e) => {};
  const handleMultibleFiles = (e) => {};
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

            <div class="mb-3 form-group border  text-center">
              <label for="exampleInputdeasription" className="form-label">
                Description
              </label>
              <div className="mt-3 border">
                <ArchEditorProvider>
                  <BlockToolbar />
                  <ArchEditor
                    placeholder="Please enter course description."
                    showInlineToolbar
                    row={5}
                    col={15}
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                  />
                </ArchEditorProvider>
              </div>
            </div>
            <div className="form-row ">
              <div className="col">
                <div className="form-group">
                  <label for="exampleInputdeasription" className="form-label">
                    paid course or not
                  </label>
                  <Select
                    // defaultValue="paid"
                    style={{ width: "100%" }}
                    size="large"
                    value={values.paid}
                    onChange={(v) =>
                      setvalues({ ...values, paid: !values.paid })
                    }
                  >
                    <Option value={true}>Paid</Option>
                    <Option value={false}>Free</Option>
                  </Select>
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="col">
                <div className="form-group">
                  <label className="btn btn-outline-secondary btn-block text-left">
                    {values.loading ? "uploading" : "Image Upload"}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    name="image"
                    onChange={handleImage}
                  ></input>
                </div>

                <div className="form-group">
                  <label className="btn btn-outline-secondary btn-block text-left">
                    {values.loading ? "uploading" : "Uploade multiple Files"}
                  </label>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleMultibleFiles}
                    name="documents"
                    multiple
                  ></input>
                </div>
              </div>
            </div>
            {/* <div className="row">
              <div className="col"></div>
            </div> */}
            <div class="container my-3">
              <div class="col-md-12 text-center">
                <Button
                  onClick={handleSubmit}
                  disabled={values.loading || values.uploading}
                  className="btn btn-primary form-text text-center"
                  loading={values.loading}
                  type="primary"
                  size="large"
                  shape="round"
                  icon={<SaveOutlined />}
                >
                  {values.loading ? "Saving..." : "Save & Continue"}
                </Button>
              </div>
            </div>
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
