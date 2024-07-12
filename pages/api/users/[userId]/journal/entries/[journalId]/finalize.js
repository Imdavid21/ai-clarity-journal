import { Journal } from "@/models/Journal";
import connectDB from "@/pages/lib/connectDB";
import { analyze } from "../../../../../../lib/ai";

async function updateJournalEntry(journalId) {
  try {
    const journal = await Journal.findById(journalId);

    const aiResponse = await analyze(journal.conversationSummary);

    const updatedJournal = await Journal.findOneAndUpdate(
      { _id: journalId },
      {
        $set: {
          aiSummary: aiResponse.aiSummary,
          sentiment: aiResponse.sentiment,
          mood: aiResponse.mood,
          highlight: aiResponse.highlight,
          title: aiResponse.title,
          keyInsight: aiResponse.keyInsight,
          quote: aiResponse.quote,
          haiku: aiResponse.haiku,
          emoji: aiResponse.emoji,
          color: aiResponse.color,
        },
      },
      { new: true }
    );

    if (!updatedJournal) {
      console.error("Journal not found");
      return null;
    }

    return updatedJournal;
  } catch (error) {
    console.error("Error updating journal:", error);
    throw error;
  }
}

async function finalizeJournal(req, res) {
  try {
    const { journalId, userId } = req.query;

    if (!userId || !journalId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const journal = await Journal.findOne({ _id: journalId });
    if (!journal) {
      return res.status(404).json({ error: "Journal not found" });
    }

    const updatedData = await updateJournalEntry(journalId);
    return res
      .status(200)
      .json({ message: "Journal updated successfully", data: updatedData });
  } catch (error) {
    console.error("Error in finalizeJournal:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export default async function handler(req, res) {
  await connectDB();

  switch (req.method) {
    case "PUT":
      await finalizeJournal(req, res);
      break;
    default:
      res.setHeader("Allow", ["PUT"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
