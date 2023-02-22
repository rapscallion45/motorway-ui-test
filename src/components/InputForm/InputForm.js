import React, { useState } from "react";
import "./InputForm.css";

/* "Formik" used for input form state management */
import { Formik, Form, Field } from "formik";

/* "Yup" used for input form error checking & validation */
import * as Yup from "yup";

const InputForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ValidationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(
        /^[aA-zZ\s]+$/,
        "Only string characters are allowed in this field."
      )
      .required("Name is required."),
    email: Yup.string()
      .email("Email is invalid.")
      .required("Email is required."),
    dateOfBirth: Yup.date().required("Date of Birth is required."),
    favouriteColor: Yup.string()
      .matches(
        /^[aA-zZ\s]+$/,
        "Only string characters are allowed in this field."
      )
      .required("Favourite Colour is required."),
    salary: Yup.number().required("Salary is required."),
  });

  const handleSubmit = (values, resetForm) => {
    const timer = setTimeout(() => {
      /* form does not submit, simply log captured input, then clear form. */
      console.log("Fake form submission success.");
      console.log(values);
      setIsSubmitting(false);
      resetForm();
      clearTimeout(timer);
    }, 2000);
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <Formik
          initialValues={{
            name: "",
            email: "",
            dateOfBirth: "",
            favouriteColor: "",
            salary: 50000,
          }}
          validationSchema={ValidationSchema}
          onSubmit={(values, { resetForm }) => {
            setIsSubmitting(true);
            handleSubmit(values, resetForm);
          }}
        >
          {({ values, errors, touched }) => (
            <Form>
              <div className="field-wrapper">
                <label htmlFor="name">Name:</label>
                <Field name="name" />
                {errors.name && touched.name ? (
                  <div className="error-msg">{errors.name}</div>
                ) : null}
              </div>
              <div className="field-wrapper">
                <label htmlFor="email">Email:</label>
                <Field name="email" type="email" />
                {errors.email && touched.email ? (
                  <div className="error-msg">{errors.email}</div>
                ) : null}
              </div>
              <div className="field-wrapper">
                <label htmlFor="favouriteColor">Date Of Birth:</label>
                <Field name="dateOfBirth" type="date" />
                {errors.dateOfBirth && touched.dateOfBirth ? (
                  <div className="error-msg">{errors.dateOfBirth}</div>
                ) : null}
              </div>
              <div className="field-wrapper">
                <label htmlFor="favouriteColor">Favourite Colour:</label>
                <Field name="favouriteColor" />
                {errors.favouriteColor && touched.favouriteColor ? (
                  <div className="error-msg">{errors.favouriteColor}</div>
                ) : null}
              </div>
              <div className="field-wrapper">
                <label htmlFor="salary">
                  {`Salary: £${values.salary}`.toLocaleString()}
                </label>
                <Field
                  id="salary"
                  name="salary"
                  type="range"
                  min="20000"
                  max="120000"
                  step="1000"
                />
              </div>
              <button
                type="submit"
                className="form-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? <div className="loader"></div> : "Submit"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default InputForm;
