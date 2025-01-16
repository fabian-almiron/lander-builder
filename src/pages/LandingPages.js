import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Modal from "../components/Modal";

const LandingPages = () => {
  const [landingPages, setLandingPages] = useState([]);
  const [newPage, setNewPage] = useState({ clientName: "", url: "", formSubmissions: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPages = async () => {
      const querySnapshot = await getDocs(collection(db, "landingPages"));
      setLandingPages(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    fetchPages();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPage({ ...newPage, [name]: value });
  };

  const handleAddPage = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "landingPages"), newPage);
      setLandingPages([...landingPages, { ...newPage, id: docRef.id }]);
      setNewPage({ clientName: "", url: "", formSubmissions: 0 });
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Landing Pages</h1>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
      >
        Add Page
      </button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={handleAddPage}>
          <input
            type="text"
            name="clientName"
            value={newPage.clientName}
            onChange={handleInputChange}
            placeholder="Page Title"
            className="p-2 border border-gray-300 rounded mr-2"
            required
          />
          <input
            type="url"
            name="url"
            value={newPage.url}
            onChange={handleInputChange}
            placeholder="Page URL"
            className="p-2 border border-gray-300 rounded mr-2"
            required
          />
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
            Add Page
          </button>
        </form>
      </Modal>
      <table className="w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-4 text-left">Client Name</th>
            <th className="p-4 text-left">URL</th>
            <th className="p-4 text-left">Form Submissions</th>
          </tr>
        </thead>
        <tbody>
          {landingPages.map((page) => (
            <tr key={page.id} className="border-b hover:bg-gray-100">
              <td className="p-4">{page.clientName}</td>
              <td className="p-4">
                <a
                  href={page.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {page.url}
                </a>
              </td>
              <td className="p-4">{page.formSubmissions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LandingPages;