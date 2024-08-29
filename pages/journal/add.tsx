import React, { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import Button from "@/components/common/Button";
import DateTitle from "@/components/common/DateTitle";
import Header from "@/components/common/Header";
import "../../styles/global.css";

const initialValues = {
  content: "",
};

const Add: React.FC = () => {
  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleBack = (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.back();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/journal/entries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: values.content }),
      });

      if (response.ok) {
        const data = await response.json();
        router.push(`/journal/${data.id}/chat`);
      } else {
        console.error("Failed to create journal entry");
      }
    } catch (error) {
      console.error("Error creating journal entry:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-6 mt-10 pb-8 lg:max-w-screen-md lg:mx-auto">
      <Header />
      <DateTitle />
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <h3 className="font-semibold">Journal</h3>
          <textarea
            className="border border-inherit rounded-lg h-64 w-full mt-2 px-4 py-2 max-w-prose"
            placeholder="Write something here..."
            onChange={handleInputChange}
            value={values.content}
            name="content"
          ></textarea>
        </div>
        <div className="flex justify-between mt-4 relative bottom-6 w-full -left-6 lg:max-w-screen-md lg:bottom-4 lg:relative lg:mx-auto">
          <Button
            buttonText="Cancel"
            isPrimary={false}
            handleClick={handleBack}
            type="button"
            disabled={false}
          />
          <Button
            buttonText={loading ? "Loading..." : "Next"}
            isPrimary={true}
            type="submit"
            disabled={loading}
          />
        </div>
      </form>
    </main>
  );
};

export default Add;
