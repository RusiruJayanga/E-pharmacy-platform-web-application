import React, { useState } from "react";
import "./ads.css";
//ribben css
import "../../../../../components/user/common/margin/margin.css";
//validation
import { useFormik } from "formik";
import * as Yup from "yup";

const Ads = () => {
  //validation
  const validationSchema = Yup.object().shape({
    Location: Yup.string().required("Required"),
    SessionPrice: Yup.string().required("Required"),
    description: Yup.string()
      .required("Required")
      .max(100, "Description must be 100 characters or less"),
  });

  const formik = useFormik({
    initialValues: {
      Location: "",
      SessionPrice: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div>
      {/* ribben */}
      <div className="ribben"></div>
      {}
      {/* head section */}
      <div className="advertisement-head">
        <h2>Add advertisement</h2>
      </div>
      {}
      {/* advertisement section */}
      <form className="advertisement-form" onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="Location"
          placeholder="Location"
          value={formik.values.Location}
          onChange={formik.handleChange}
        />
        <p>
          {formik.touched.Location && formik.errors.Location
            ? formik.errors.Location
            : " "}
        </p>

        <input
          type="number"
          name="SessionPrice"
          placeholder="Session Price (Rs/)"
          value={formik.values.SessionPrice}
          onChange={formik.handleChange}
        />
        <p>
          {formik.touched.SessionPrice && formik.errors.SessionPrice
            ? formik.errors.SessionPrice
            : " "}
        </p>

        <textarea
          className="textinput input-element"
          placeholder="description"
          name="description"
          maxLength={100}
          value={formik.values.description}
          onChange={formik.handleChange}
        ></textarea>
        <p>
          {formik.values.description.length > 0 && (
            <span> {formik.values.description.length}/100</span>
          )}
          {formik.touched.description && formik.errors.description
            ? formik.errors.description
            : " "}
        </p>

        <button type="submit">Add</button>
      </form>
      {}
    </div>
  );
};

export default Ads;
