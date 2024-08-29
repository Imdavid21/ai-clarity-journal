import "../../styles/global.css";
import DateTitle from "@/components/common/DateTitle";
import Header from "@/components/common/Header";
import Button from "@/components/common/Button";
import { useRouter } from "next/router";
import React, { useState, ChangeEvent } from "react";

const initialValues = {
  title: "",
  emoji: "",
};

const Add: React.FC = () => {
  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleBack = (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.back();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/journal/entries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        router.push(`/journal/${data._id}/chat`);
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
          <input
            className="border border-inherit rounded-lg h-14 w-full mt-2 px-4 py-2"
            placeholder="Give your clarity a title..."
            onChange={handleInputChange}
            value={values.title}
            name="title"
          />
        </div>
        <div>
          <input
            className="border border-inherit rounded-lg h-14 w-full mt-2 px-4 py-2"
            placeholder="Insert an emoji..."
            onChange={handleInputChange}
            value={values.emoji}
            name="emoji"
          />
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
            handleClick={() => {}}
            type="submit"
            disabled={loading}
          />
        </div>
      </form>
    </main>
  );
};

export default Add;
