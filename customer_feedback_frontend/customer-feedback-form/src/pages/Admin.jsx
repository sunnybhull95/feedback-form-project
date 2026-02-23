import { useEffect, useState } from "react";
import api from "../globalapi/api";

function Admin() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    fetchAllFeedback();
  }, []);

  const fetchAllFeedback = async () => {
    const res = await api.get("/feedback/admin/all");
    setFeedbacks(res.data);
  };

  const handleDelete = async (id) => {
    await api.delete(`/feedback/admin/${id}`);
    setStatusMessage("Feedback deleted");
    fetchAllFeedback();
    setTimeout(() => setStatusMessage(""), 3000);
  };

  const handleUpdate = async () => {
    await api.put(`/feedback/admin/update/${selectedFeedback.feedbackId}`, {
      message: selectedFeedback.message,
      rating: selectedFeedback.rating,
    });

    setEditMode(false);
    setSelectedFeedback(null);
    setStatusMessage("Feedback updated");
    fetchAllFeedback();
    setTimeout(() => setStatusMessage(""), 3000);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">User</th>
              <th className="p-3">Message</th>
              <th className="p-3">Rating</th>
              <th className="p-3">Created</th>
              <th className="p-3">Updated</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {feedbacks.map((fb) => (
              <tr key={fb.feedbackId} className="border-t text-center">
                <td className="p-3">{fb.feedbackId}</td>
                <td className="p-3">{fb.userName}</td>
                <td className="p-3">{fb.message}</td>
                <td className="p-3">{fb.rating}</td>
                <td className="p-3">{fb.createdAt}</td>
                <td className="p-3">{fb.updatedAt || "-"}</td>
                <td className="p-3 flex gap-2 justify-center">
                  <button
                    onClick={() => setSelectedFeedback(fb)}
                    className="bg-black text-white px-2 py-1 rounded"
                  >
                    View
                  </button>

                  <button
                    onClick={() => {
                      setSelectedFeedback(fb);
                      setEditMode(true);
                    }}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => handleDelete(fb.feedbackId)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedFeedback && !editMode && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h3 className="font-bold mb-2">View Feedback</h3>
          <p>
            <strong>User:</strong> {selectedFeedback.userName}
          </p>
          <p>
            <strong>Message:</strong> {selectedFeedback.message}
          </p>
          <p>
            <strong>Rating:</strong> {selectedFeedback.rating}
          </p>
          <p>
            <strong>Created:</strong> {selectedFeedback.createdAt}
          </p>
          <p>
            <strong>Updated:</strong> {selectedFeedback.updatedAt || "-"}
          </p>
        </div>
      )}

      {selectedFeedback && editMode && (
        <div className="mt-6 p-4 bg-gray-100 border border-black  rounded">
          <h3 className="font-bold mb-2">Update Feedback</h3>

          <textarea
            className="border p-2 w-full mb-2"
            value={selectedFeedback.message}
            onChange={(e) =>
              setSelectedFeedback({
                ...selectedFeedback,
                message: e.target.value,
              })
            }
          />

          <input
            type="number"
            className="border p-2 w-full mb-2"
            value={selectedFeedback.rating}
            onChange={(e) =>
              setSelectedFeedback({
                ...selectedFeedback,
                rating: e.target.value,
              })
            }
          />

          <button
            onClick={handleUpdate}
            className="bg-green-600 text-white px-10 py-2 rounded ml-120"
          >
            save
          </button>
        </div>
      )}

      {statusMessage && (
        <div className="mt-6 p-3 text-center text-white bg-red-600 rounded">
          {statusMessage}
        </div>
      )}
    </div>
  );
}

export default Admin;
