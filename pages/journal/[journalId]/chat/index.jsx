import "../../../../styles/global.css";
import DateTitle from "@/components/common/DateTitle";
import Header from "@/components/common/Header";
import Button from "@/components/common/Button";
import { useRouter } from "next/router";
import React, { useEffect, useState, useCallback } from "react";

const initialValues = {
  content: "",
};

const Chat = () => {
  const [values, setValues] = useState(initialValues);
  const [journal, setJournal] = useState({});
  const [entryIndex, setEntryIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { push } = useRouter();
  const { journalId } = router.query;

  const fetchJournal = useCallback(async () => {
    if (!journalId) return;
    const response = await fetch(`/api/journal/entries/${journalId}`);
    const data = await response.json();
    setJournal(data[0]);
    setEntryIndex(data[0].entries.length - 1);
  }, [journalId]);

  useEffect(() => {
    fetchJournal();
  }, [fetchJournal]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleDigDeeper = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/journal/entries/${journalId}/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: values.content }),
    });
    setLoading(true);

    if (response.ok) {
      const data = await response.json();
      setJournal(data);
      setValues(initialValues);
      fetchJournal();
    } else {
      console.error("Invalid response from createJournalEntry:", response);
    }
    setLoading(false);
  };

  const finalizeJournal = async (entry, journalId) => {
    const response = await fetch(`/api/journal/entries/${journalId}/finalize`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ entry }),
    });

    return response.json();
  };

  const handleFinalize = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await finalizeJournal(values, journalId);

      if (response) {
        push(`/journal/${journalId}/summary`);
      } else {
        console.error("Invalid response from createJournalEntry:", response);
      }
    } catch (error) {
      console.error(`ERROR ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-6 mt-10 pb-8 lg:max-w-screen-md lg:mx-auto">
      <Header />
      <DateTitle />
      <form className=" flex flex-col gap-4">
        <div className="w-full  px-4 py-4 flex flex-col gap-4 rounded-lg bg-gradient-to-r from-lime-100 to-teal-100 my-6">
          <h2 className="text-lg font-semibold">Response</h2>
          <p className="max-w-prose">
            {journal?.entries && journal.entries[entryIndex].aiResponse}
          </p>
        </div>
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
        <div className="flex justify-between mt-4 lg:max-w-screen-md lg:mx-auto">
          <Button
            buttonText={loading ? "Dig Deeper..." : "Dig Deeper"}
            isPrimary={false}
            handleClick={handleDigDeeper}
            disabled={loading}
          />
          <Button
            buttonText={loading ? "Finalizing..." : "Finalize"}
            isPrimary={true}
            handleClick={handleFinalize}
            disabled={loading}
          />
        </div>
      </form>
    </div>
  );
};

export default Chat;
