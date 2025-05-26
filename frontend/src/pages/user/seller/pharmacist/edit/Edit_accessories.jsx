// src/pages/EditAccessory.jsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const AccessorySchema = Yup.object({
  name: Yup.string().required("Name is required"),
  quantity: Yup.number().min(0).required("Quantity is required"),
  description: Yup.string().required("Description is required"),
  category: Yup.string().required("Category is required"),
  discount: Yup.number().min(0).max(100),
  options: Yup.array().of(
    Yup.object({
      name: Yup.string().required("Option name"),
      price: Yup.number().min(0).required("Price"),
    })
  ),
});

export default function EditAccessory() {
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
      .get(`${API}/accessories/get/accessories/${id}`)
      .then((r) => {
        const d = r.data;
        setInitialValues({
          name: d.name,
          quantity: d.quantity,
          description: d.description,
          category: d.category,
          discount: d.discount,
          options: d.options.length ? d.options : [{ name: "", price: 0 }],
        });
      })
      .catch(() => {
        toast.error("Failed to load product");
        navigate(-1);
      });
  }, [state, navigate]);

  if (!initialValues) return null;

  return (
    <div className="mx-auto max-w-xl p-4">
      <h2 className="text-2xl font-semibold mb-4">Edit Accessory</h2>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={AccessorySchema}
        onSubmit={(values, { setSubmitting }) => {
          axios
            .put(
              `${API}/accessories/put/accessories/${state.productId}`,
              values
            )
            .then(() => {
              toast.success("Accessory updated");
              navigate("/Accessories_details", {
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
          <Form className="space-y-4">
            <div>
              <label>Name</label>
              <Field name="name" className="input" />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500"
              />
            </div>

            <div>
              <label>Quantity</label>
              <Field name="quantity" type="number" className="input" />
              <ErrorMessage
                name="quantity"
                component="div"
                className="text-red-500"
              />
            </div>

            <div>
              <label>Description</label>
              <Field
                as="textarea"
                name="description"
                className="input"
                rows={3}
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500"
              />
            </div>

            <div>
              <label>Category</label>
              <Field name="category" className="input" />
              <ErrorMessage
                name="category"
                component="div"
                className="text-red-500"
              />
            </div>

            <div>
              <label>Discount (%)</label>
              <Field name="discount" type="number" className="input" />
              <ErrorMessage
                name="discount"
                component="div"
                className="text-red-500"
              />
            </div>

            <FieldArray name="options">
              {({ remove, push }) => (
                <div>
                  <label className="block mb-1">Options</label>
                  {values.options.map((_, idx) => (
                    <div key={idx} className="flex gap-2 mb-2">
                      <Field
                        name={`options.${idx}.name`}
                        placeholder="Option"
                        className="input flex-1"
                      />
                      <Field
                        name={`options.${idx}.price`}
                        type="number"
                        placeholder="Price"
                        className="input w-28"
                      />
                      <button
                        type="button"
                        onClick={() => remove(idx)}
                        className="btn btn-danger"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => push({ name: "", price: 0 })}
                    className="btn btn-secondary mt-1"
                  >
                    + Add option
                  </button>
                </div>
              )}
            </FieldArray>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving…" : "Save Changes"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
