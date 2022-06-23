import { useEffect, useState } from "react";
import { Button, Select, Avatar, Badge } from "antd";
import { SaveOutlined } from "@ant-design/icons";
const { Option } = Select;
const CourseCreateForm = ({
  handleSubmit,
  handleChange,
  handleImage,
  handleImageRemove,
  values,
  setvalues,
  preview,
  uploadButtonText,
}) => {
  const children = [];
  for (let i = 9.99; i <= 100.99; i++) {
    children.push(<option key={i.toFixed(2)}> $ {i.toFixed(2)}</option>);
  }

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
                dir="auto" // auto direction
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
                  dir="auto" // auto direction
                ></textarea>
              </div>
            </div>
            <div className="form-row ">
              <div className="col">
                <div className="form-group">
                  <Select
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
              {values.paid && (
                <div className="form-group">
                  <Select
                    defaultValue="9.99"
                    style={{ width: "100%" }}
                    onChange={(v) => setvalues({ ...values, price: v })}
                    tokenSeparators={[,]}
                    size="large"
                  >
                    {children}
                  </Select>
                </div>
              )}
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
                    dir="auto" // auto direction
                  />
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="col">
                <div className="form-group">
                  <label className="btn btn-outline-secondary btn-block text-left">
                    {uploadButtonText}
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
              {preview && (
                <Badge
                  count="x"
                  onClick={handleImageRemove}
                  className="pointer"
                >
                  <Avatar size={64} src={preview} />
                </Badge>
              )}
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
