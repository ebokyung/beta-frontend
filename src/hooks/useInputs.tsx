import { useState, useCallback } from "react";

const objectTypeNames = ["phone", "email"];

interface Form {
  phone?: { phone1: string; phone2: string; phone3: string };
  email?: { email1: string; email2: string };
  [key: string]: boolean | object | string | undefined;
}

type UseInputs = [Form, (e: React.ChangeEvent<HTMLInputElement>) => void, () => void];

const useInputs = (initialForm: Form): UseInputs => {
  const [form, setForm] = useState(initialForm);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setForm((form) => ({ ...form, [name]: checked }));
      return;
    }

    if (objectTypeNames.some((typeName) => name.includes(typeName))) {
      const typeName = objectTypeNames.find((typeName) => name.includes(typeName)) as keyof Form; // phone, email
      setForm((form) => ({ ...form, [typeName]: { ...(form[typeName] as object), [name]: value } }));
      return;
    }

    setForm((form) => ({ ...form, [name]: value }));
  }, []);

  const reset = useCallback(() => setForm(initialForm), [initialForm]);

  return [form, onChange, reset];
};

export default useInputs;
