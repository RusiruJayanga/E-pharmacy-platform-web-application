import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const MedicineSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  quantity: Yup.number().min(0).required("Quantity is required"),
  description: Yup.string().required("Description is required"),
  category: Yup.string().required("Category is required"),
  legality: Yup.string()
    .oneOf(["Need Prescription", "Don't Need Prescription"])
    .required("Legality is required"),
  discount: Yup.number().min(0).max(100),
  options: Yup.array().of(
    Yup.object({
      name: Yup.string().required("Option name"),
      price: Yup.number().min(0).required("Price"),
    })
  ),
});

export default function EditMedicine() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    const id = state?.productId;
    if (!id) {
      toast.error("No product selected");
      navigate(-1);
      return;
    }
    axios
      .get(`${API}/medicines/get/medicines/${id}`)
      .then(({ data }) =>
        setInitialValues({
          name: data.name,
          quantity: data.quantity,
          description: data.description,
          category: data.category,
          legality: data.legality,
          discount: data.discount,
          options: data.options.length
            ? data.options
            : [{ name: "", price: 0 }],
        })
      )
      .catch(() => {
        toast.error("Failed to load medicine");
        navigate(-1);
      });
  }, [state, navigate]);

  if (!initialValues) return null;

  return (
    <div>
      {/* ribben */}
      <div className="ribben"></div>
      {}
      {/* head section */}
      <div className="product-head">
        <h2>Edit Medicine</h2>
      </div>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={MedicineSchema}
        onSubmit={(values, { setSubmitting }) => {
          axios
            .put(
              `http://localhost:5000/api/medicines/put/medicines/${state?.productId}`,
              values
            )
            .then(() => {
              toast.success("Medicine updated");
              navigate("/Store_pharmacist", {
                state: { productId: state.productId },
              });
            })
            .catch((err) =>
              toast.error(err.response?.data?.message || "Update failed")
            )
            .finally(() => setSubmitting(false));
        }}
      >
        {({ values, isSubmitting }) => (
          <Form className="product-form">
            <div>
              <h6>Name</h6>
              <Field name="name" className="input" />
              <ErrorMessage name="name" component="div" />
            </div>

            <div>
              <h6>Quantity</h6>
              <Field name="quantity" type="number" className="input" />
              <ErrorMessage name="quantity" component="div" />
            </div>

            <div>
              <h6>Description</h6>
              <Field as="textarea" name="description" rows={3} />
              <ErrorMessage name="description" component="div" />
            </div>

            <div>
              <h6>Category</h6>
              <Field name="category" className="input" />
              <ErrorMessage name="category" component="div" />
            </div>

            <div>
              <h6>Legality</h6>
              <Field as="select" name="legality" className="input">
                <option value="">Select…</option>
                <option value="Need Prescription">Need Prescription</option>
                <option value="Don't Need Prescription">
                  Don't Need Prescription
                </option>
              </Field>
              <ErrorMessage name="legality" component="div" />
            </div>

            <div>
              <h6>Discount (%)</h6>
              <Field name="discount" type="number" className="input" />
              <ErrorMessage name="discount" component="div" />
            </div>

            <FieldArray name="options">
              {({ remove, push }) => (
                <div>
                  <h6>Options</h6>
                  {values.options.map((_, idx) => (
                    <div className="option-container">
                      <div key={idx} className="option-field">
                        <label>Option</label>
                        <Field
                          name={`options.${idx}.name`}
                          placeholder="Option"
                        />
                        <button type="button" onClick={() => remove(idx)}>
                          ✕
                        </button>
                      </div>
                      <div className="option-field">
                        <label>Price</label>
                        <Field
                          name={`options.${idx}.price`}
                          type="number"
                          placeholder="Price"
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => push({ name: "", price: 0 })}
                  >
                    + Add option
                  </button>
                </div>
              )}
            </FieldArray>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving…" : "Save Changes"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
