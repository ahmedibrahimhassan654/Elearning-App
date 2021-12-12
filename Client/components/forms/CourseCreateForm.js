import { useEffect, useState } from "react";
import { Button, Select } from "antd";
import { SaveOutlined } from "@ant-design/icons";
const { Option } = Select;
const CourseCreateForm = ({
  handleSubmit,
  handleChange,
  handleImage,
  values,
  setvalues,
}) => {
  return (
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
                onChange={handleChange}
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
                <textarea
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  className="form-control pt-4 markdown-textarea"
                  placeholder="Description"
                  cols="7"
                  rows="7"
                  required
                ></textarea>
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
            <div className="form-row ">
              <div className="col">
                <div className="form-group">
                  <label for="exampleInputdeasription" className="form-label">
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    className="form-control"
                    aria-describedby="nameHelp"
                    placeholder="category"
                    value={values.category}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="col">
                <div className="form-group">
                  <label className="btn btn-outline-secondary btn-block text-left">
                    {values.loading ? "Uploading" : "Image Upload"}
                    <input
                      type="file"
                      name="image"
                      onChange={handleImage}
                      accept="image/*"
                      hidden
                    />
                  </label>
                </div>
              </div>
            </div>

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
};

export default CourseCreateForm;
