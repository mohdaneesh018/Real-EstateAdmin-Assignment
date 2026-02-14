import { useEffect, useState } from "react"
import API from "../services/api"
import "./Dashboard.css"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

const Dashboard = () => {

    const [content, setContent] = useState(null)
    const [activeSection, setActiveSection] = useState("hero")
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await API.get("/content")

                const safeData = {
                    hero: { title: "", subtitle: "", price: "" },
                    overview: { description: "" },
                    amenities: { title: "", description: "" },
                    nearby: {
                        title: "",
                        metroDistance: "",
                        airportDistance: "",
                        schoolDistance: ""
                    },
                    about: { title: "", description: "" },
                    faq: [],
                    construction: { status: "Under Construction" },
                    ...res.data
                }

                setContent(safeData)

            } catch (err) {
                console.log(err)
            }
        }

        fetchData()
    }, [])

    const handleChange = (section, field, value) => {
        setContent({
            ...content,
            [section]: {
                ...content[section],
                [field]: value
            }
        })
    }

    const handleUpdate = async () => {
        await API.put("/content", content)
        toast.success("Updated Successfully ✅")
    }

    const handleLogout = () => {
        toast((t) => (
            <div style={{ textAlign: "center" }}>
                <p style={{ marginBottom: "10px", fontWeight: "500" }}>
                    Are you sure you want to logout?
                </p>

                <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                    <button
                        onClick={() => {
                            toast.dismiss(t.id)
                            localStorage.removeItem("adminLoggedIn")
                            navigate("/admin/login")
                        }}
                        style={{
                            padding: "6px 12px",
                            borderRadius: "6px",
                            border: "none",
                            backgroundColor: "#e63946",
                            color: "white",
                            cursor: "pointer"
                        }}
                    >
                        Yes
                    </button>

                    <button
                        onClick={() => toast.dismiss(t.id)}
                        style={{
                            padding: "6px 12px",
                            borderRadius: "6px",
                            border: "1px solid #ccc",
                            backgroundColor: "white",
                            cursor: "pointer"
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        ), {
            duration: 5000,
        })
    }

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("adminLoggedIn")
        if (!isLoggedIn) navigate("/admin/login")
    }, [])

    if (!content) return <h2 style={{ padding: "40px" }}>Loading...</h2>

    return (
        <div className="dashboard-container">

            <div className="sidebar">
                <h2>Admin Panel</h2>

                <button onClick={() => setActiveSection("hero")}>Hero</button>
                <button onClick={() => setActiveSection("overview")}>Overview</button>
                <button onClick={() => setActiveSection("amenities")}>Amenities</button>
                <button onClick={() => setActiveSection("nearby")}>Nearby</button>
                <button onClick={() => setActiveSection("about")}>About</button>
                <button onClick={() => setActiveSection("faq")}>FAQ</button>
                <button onClick={() => setActiveSection("construction")}>Construction</button>
                <button className="logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            </div>

            <div className="main-content">

                <div className="section-card">

                    {activeSection === "hero" && (
                        <>
                            <h3>Hero Section</h3>
                            <input value={content.hero.title}
                                onChange={(e) => handleChange("hero", "title", e.target.value)} />
                            <input value={content.hero.subtitle}
                                onChange={(e) => handleChange("hero", "subtitle", e.target.value)} />
                            <input value={content.hero.price}
                                onChange={(e) => handleChange("hero", "price", e.target.value)} />
                        </>
                    )}

                    {activeSection === "overview" && (
                        <>
                            <h3>Project Overview</h3>
                            <textarea
                                value={content.overview.description}
                                onChange={(e) => handleChange("overview", "description", e.target.value)}
                            />
                        </>
                    )}

                    {activeSection === "amenities" && (
                        <>
                            <h3>Amenities</h3>
                            <input
                                value={content.amenities.title}
                                onChange={(e) => handleChange("amenities", "title", e.target.value)}
                            />
                            <textarea
                                value={content.amenities.description}
                                onChange={(e) => handleChange("amenities", "description", e.target.value)}
                            />
                        </>
                    )}

                    {activeSection === "nearby" && (
                        <>
                            <h3 style={{ marginBottom: "20px" }}>Nearby Connectivity</h3>

                            <label>Section Title</label>
                            <input
                                type="text"
                                placeholder="Nearby Connectivity"
                                value={content.nearby.title}
                                onChange={(e) =>
                                    handleChange("nearby", "title", e.target.value)
                                }
                            />
                            <br />

                            <label>Metro Distance</label>
                            <input
                                type="text"
                                placeholder="5 Minutes Away"
                                value={content.nearby.metroDistance}
                                onChange={(e) =>
                                    handleChange("nearby", "metroDistance", e.target.value)
                                }
                            />
                            <br />

                            <label>Airport Distance</label>
                            <input
                                type="text"
                                placeholder="20 Minutes Away"
                                value={content.nearby.airportDistance}
                                onChange={(e) =>
                                    handleChange("nearby", "airportDistance", e.target.value)
                                }
                            />
                            <br />

                            <label>School Distance</label>
                            <input
                                type="text"
                                placeholder="10 Minutes Away"
                                value={content.nearby.schoolDistance}
                                onChange={(e) =>
                                    handleChange("nearby", "schoolDistance", e.target.value)
                                }
                            />
                            <br />

                            <h4 style={{ marginTop: "30px" }}>Live Preview</h4>

                            <div
                                style={{
                                    display: "flex",
                                    gap: "20px",
                                    marginTop: "15px",
                                }}
                            >
                                <div className="preview-card">
                                    🚇 Metro <br />
                                    <strong>{content.nearby.metroDistance || "5 Minutes Away"}</strong>
                                </div>

                                <div className="preview-card">
                                    ✈ Airport <br />
                                    <strong>{content.nearby.airportDistance || "20 Minutes Away"}</strong>
                                </div>

                                <div className="preview-card">
                                    🏫 School <br />
                                    <strong>{content.nearby.schoolDistance || "10 Minutes Away"}</strong>
                                </div>
                            </div>
                        </>
                    )}

                    {activeSection === "about" && (
                        <>
                            <h3>About Section</h3>
                            <input
                                value={content.about.title}
                                onChange={(e) => handleChange("about", "title", e.target.value)}
                            />
                            <textarea
                                value={content.about.description}
                                onChange={(e) => handleChange("about", "description", e.target.value)}
                            />
                        </>
                    )}

                    {activeSection === "faq" && (
                        <>
                            <h3>FAQ Section</h3>

                            <button
                                onClick={() =>
                                    setContent({
                                        ...content,
                                        faq: [...content.faq, { question: "", answer: "" }]
                                    })
                                }
                                style={{
                                    padding: "10px 15px",
                                    borderRadius: "8px",
                                    marginBottom: "20px",
                                    background: "black",
                                    color: "white",
                                    border: "none",
                                    cursor: "pointer"
                                }}
                            >
                                + Add FAQ
                            </button>

                            {content.faq.length === 0 && (
                                <p style={{ color: "#777" }}>No FAQs added yet.</p>
                            )}

                            {content.faq.map((item, index) => (
                                <div
                                    key={index}
                                    style={{
                                        background: "white",
                                        padding: "20px",
                                        borderRadius: "12px",
                                        marginBottom: "20px",
                                        boxShadow: "0 5px 15px rgba(0,0,0,0.05)"
                                    }}
                                >
                                    <input
                                        type="text"
                                        placeholder="Enter Question"
                                        value={item.question}
                                        onChange={(e) => {
                                            const updatedFaq = [...content.faq]
                                            updatedFaq[index].question = e.target.value
                                            setContent({ ...content, faq: updatedFaq })
                                        }}
                                    />

                                    <textarea
                                        placeholder="Enter Answer"
                                        value={item.answer}
                                        onChange={(e) => {
                                            const updatedFaq = [...content.faq]
                                            updatedFaq[index].answer = e.target.value
                                            setContent({ ...content, faq: updatedFaq })
                                        }}
                                    />

                                    <button
                                        onClick={() => {
                                            const updatedFaq = content.faq.filter((_, i) => i !== index)
                                            setContent({ ...content, faq: updatedFaq })
                                        }}
                                        style={{
                                            marginTop: "10px",
                                            background: "red",
                                            color: "white",
                                            border: "none",
                                            padding: "6px 10px",
                                            borderRadius: "6px",
                                            cursor: "pointer"
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                        </>
                    )}

                    {activeSection === "construction" && (
                        <>
                            <h3>Construction Status</h3>
                            <select
                                value={content.construction.status}
                                onChange={(e) => handleChange("construction", "status", e.target.value)}
                            >
                                <option>Under Construction</option>
                                <option>Ready to Move</option>
                                <option>Possession Soon</option>
                            </select>
                        </>
                    )}

                    <div className="button-row">
                        <button className="save-btn" onClick={handleUpdate}>
                            Save Changes
                        </button>

                        <button className="view-btn" onClick={() => navigate("/")}>
                            View Website
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;