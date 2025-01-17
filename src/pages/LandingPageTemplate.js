import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const LandingPageTemplate = () => {
  const { id } = useParams();
  const [page, setPage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    clientName: "",
    url: "",
    formSubmissions: 0,
    heroTitle: "",
    heroSubtitle: "",
    mainText: "",
    imageUrl: ""
  });

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const docRef = doc(db, "landingPages", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setPage({ ...data, id: docSnap.id });
          setFormData({
            clientName: data.clientName,
            url: data.url,
            formSubmissions: data.formSubmissions,
            heroTitle: data.heroTitle || "Useful Tools to",
            heroSubtitle: data.heroSubtitle || "Help You Build Faster.",
            mainText: data.mainText || "It's never been easier to build beautiful websites that convey your message and tell your story.",
            imageUrl: data.imageUrl || "https://images.unsplash.com/photo-1498049860654-af1a5c566876?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
          });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    };

    fetchPage();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveChanges = async () => {
    try {
      const docRef = doc(db, "landingPages", id);
      await updateDoc(docRef, formData);
      setPage({ ...formData, id });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  if (!page) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <section className="px-2 py-32 bg-white md:px-0">
        <div className="container items-center max-w-6xl px-8 mx-auto xl:px-5">
          <div className="flex flex-wrap items-center sm:-mx-3">
            <div className="w-full md:w-1/2 md:px-3">
              <div className="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0">
                {isEditing ? (
                  <div>
                    <input
                      type="text"
                      name="heroTitle"
                      value={formData.heroTitle}
                      onChange={handleInputChange}
                      className="w-full p-2 mb-4 border border-gray-300 rounded"
                      placeholder="Hero Title"
                    />
                    <input
                      type="text"
                      name="heroSubtitle"
                      value={formData.heroSubtitle}
                      onChange={handleInputChange}
                      className="w-full p-2 mb-4 border border-gray-300 rounded"
                      placeholder="Hero Subtitle"
                    />
                    <textarea
                      name="mainText"
                      value={formData.mainText}
                      onChange={handleInputChange}
                      className="w-full p-2 mb-4 border border-gray-300 rounded"
                      placeholder="Main Text"
                    />
                    <input
                      type="text"
                      name="imageUrl"
                      value={formData.imageUrl}
                      onChange={handleInputChange}
                      className="w-full p-2 mb-4 border border-gray-300 rounded"
                      placeholder="Image URL"
                    />
                    <button
                      onClick={handleSaveChanges}
                      className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="bg-gray-500 text-white py-2 px-4 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">
                      <span className="block xl:inline">{formData.heroTitle}</span>
                      <span className="block text-indigo-600 xl:inline">{formData.heroSubtitle}</span>
                    </h1>
                    <p className="mx-auto text-base text-gray-500 sm:max-w-md lg:text-xl md:max-w-3xl">{formData.mainText}</p>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
                    >
                      Edit Content
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="w-full h-auto overflow-hidden rounded-md shadow-xl sm:rounded-xl">
                <img src={formData.imageUrl} alt="Landing Page" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-white pt-7 pb-7 md:pt-20 md:pb-24">
        <div className="box-border flex flex-col items-center content-center px-8 mx-auto leading-6 text-black border-0 border-gray-300 border-solid md:flex-row max-w-7xl lg:px-16">
          <div className="box-border relative w-full max-w-md px-4 mt-5 mb-4 -ml-5 text-center bg-no-repeat bg-contain border-solid md:ml-0 md:mt-0 md:max-w-none lg:mb-0 md:w-1/2 xl:pl-10">
            <img src="https://cdn.devdojo.com/images/december2020/productivity.png" className="p-2 pl-6 pr-5 xl:pl-16 xl:pr-20" alt="Productivity" />
          </div>
          <div className="box-border order-first w-full text-black border-solid md:w-1/2 md:pl-10 md:order-none">
            <h2 className="m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl">
              Boost Productivity
            </h2>
            <p className="pt-4 pb-8 m-0 leading-7 text-gray-700 border-0 border-gray-300 sm:pr-12 xl:pr-32 lg:text-lg">
              Build an atmosphere that creates productivity in your organization and your company culture.
            </p>
            <ul className="p-0 m-0 leading-6 border-0 border-gray-300">
              <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-yellow-300 rounded-full"><span className="text-sm font-bold">✓</span></span> Maximize productivity and growth
              </li>
              <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-yellow-300 rounded-full"><span className="text-sm font-bold">✓</span></span> Speed past your competition
              </li>
              <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-yellow-300 rounded-full"><span className="text-sm font-bold">✓</span></span> Learn the top techniques
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPageTemplate;