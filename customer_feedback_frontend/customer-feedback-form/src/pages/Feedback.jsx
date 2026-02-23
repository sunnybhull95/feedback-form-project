import { useEffect, useState, useContext } from "react";
import api from "../globalapi/api";
import { AuthContext } from "../globalapi/Authconstext";
import { useNavigate } from "react-router-dom";

function Feedback() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(1);
  const [hasFeedback, setHasFeedback] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    const fetchFeedback = async () => {
      try {
        const res = await api.get(`/feedback/user/${user.id}`);
        setMessage(res.data.message);
        setRating(res.data.rating);
        setHasFeedback(true);
      } catch {
        setHasFeedback(false);
      }
    };

    fetchFeedback();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/feedback/submit", {
        userId: user.id,
        message,
        rating,
      });

      setHasFeedback(true);
      setShowForm(false);
      setStatusMessage("Feedback saved successfully");

      setTimeout(() => {
        setStatusMessage("");
      }, 3000);
    } catch {
      setStatusMessage("Something went wrong");
      setTimeout(() => {
        setStatusMessage("");
      }, 3000);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-4 ml-27">Your Feedback</h2>

      {hasFeedback && !showForm && (
        <div className="mb-4 p-4 bg-gray-100 rounded">
          <p className="font-semibold">Previous Message:</p>
          <p className="mb-2">{message}</p>
          <p className="font-semibold">Rating:</p>
          <p>{rating} / 5</p>
        </div>
      )}

      {!showForm && (
        <div className="flex gap-4">
          {!hasFeedback && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Add Feedback
            </button>
          )}

          {hasFeedback && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Edit Feedback
            </button>
          )}
        </div>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border p-2"
            placeholder="Your feedback"
          />

          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="border p-2"
          />

          <div className="flex justify-center gap-3">
            <button className="bg-green-600 text-white px-4 py-2 rounded">
              Submit
            </button>

            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-black text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {statusMessage && (
        <div className="mt-6 p-3 text-center text-white bg-red-600 rounded">
          {statusMessage}
        </div>
      )}
    </div>
  );
}

export default Feedback;
