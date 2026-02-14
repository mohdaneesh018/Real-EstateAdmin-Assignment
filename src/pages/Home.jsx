import { useEffect, useState } from "react"
import API from "../services/api"
import "./home.css"
import toast from "react-hot-toast"

const Home = () => {

    const [content, setContent] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await API.get("/content")
                setContent(res.data)
            } catch (err) {
                console.log(err);
                toast.error("Failed to load website content ❌")
            }
        }

        fetchData()
    }, [])

    if (!content) return <h2>Loading...</h2>

    return (
        <div>
            <section
                style={{
                    height: "100vh",
                    backgroundImage: "url('/hero.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    color: "white"
                }}
            >

                <div style={{
                    position: "absolute",
                    top: "20px",
                    right: "40px",
                    zIndex: 3
                }}>
                    <a
                        href="/admin/login"
                        style={{
                            backgroundColor: "white",
                            color: "black",
                            padding: "8px 16px",
                            borderRadius: "6px",
                            textDecoration: "none",
                            fontWeight: "500"
                        }}
                    >
                        Admin Login
                    </a>
                </div>

                <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0,0,0,0.6)"
                }}></div>

                <div style={{ position: "relative", zIndex: 2 }}>
                    <h1 style={{ fontSize: "60px", fontWeight: "bold" }}>
                        {content?.hero?.title || "Luxury Living"}
                    </h1>

                    <p style={{ fontSize: "22px", marginTop: "20px" }}>
                        {content?.hero?.subtitle || "Smart Living Redefined"}
                    </p>

                    <h2 style={{ marginTop: "30px", fontSize: "28px" }}>
                        {content?.hero?.price || "₹ 75 Lacs"}
                    </h2>

                    <button style={{
                        marginTop: "25px",
                        padding: "12px 30px",
                        backgroundColor: "white",
                        color: "black",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontWeight: "bold"
                    }}>
                        Enquire Now
                    </button>
                </div>
            </section>


            <section style={{
                padding: "120px 20px",
                textAlign: "center",
                backgroundColor: "#f3f3f3"
            }}>
                <div style={{ maxWidth: "900px", margin: "auto" }}>
                    <h2 style={{
                        fontSize: "40px",
                        marginBottom: "15px",
                        letterSpacing: "1px"
                    }}>
                        Project Overview
                    </h2>

                    <div style={{
                        width: "90px",
                        height: "3px",
                        backgroundColor: "#111",
                        margin: "0 auto 40px"
                    }}></div>

                    <p style={{
                        fontSize: "18px",
                        lineHeight: "1.9",
                        color: "#555"
                    }}>
                        {content?.overview?.description || "Project overview description."}
                    </p>
                </div>
            </section>

            <section className="nearby-section">
                <h2>{content?.nearby?.title || "Nearby Connectivity"}</h2>

                <div className="nearby-cards">

                    <div className="nearby-card">
                        <h3>🚇 Metro Station</h3>
                        <p>
                            {content?.nearby?.metroDistance || "5 Minutes Away"}
                        </p>
                    </div>

                    <div className="nearby-card">
                        <h3>✈ Airport</h3>
                        <p>
                            {content?.nearby?.airportDistance || "20 Minutes Away"}
                        </p>
                    </div>

                    <div className="nearby-card">
                        <h3>🏫 School</h3>
                        <p>
                            {content?.nearby?.schoolDistance || "10 Minutes Away"}
                        </p>
                    </div>
                </div>
            </section>

            <section style={{
                padding: "100px 20px",
                backgroundColor: "#f4f4f4"
            }}>
                <div style={{
                    display: "flex",
                    gap: "50px",
                    alignItems: "center",
                    maxWidth: "1200px",
                    margin: "auto"
                }}>
                    <div style={{ flex: 1 }}>
                        <img
                            src="/Amenities.jpg"
                            style={{
                                width: "100%",
                                borderRadius: "15px"
                            }}
                            alt="Amenities"
                        />
                    </div>

                    <div style={{ flex: 1 }}>
                        <h2 style={{ fontSize: "34px", marginBottom: "20px" }}>
                            {content?.amenities?.title || "World Class Amenities"}
                        </h2>

                        <p style={{
                            lineHeight: "1.8",
                            fontSize: "17px"
                        }}>
                            {content?.amenities?.description || "Gym, Pool, Garden and more."}
                        </p>
                    </div>
                </div>
            </section>

            <section className="about-section">
                <div className="about-container">

                    <div className="about-text">
                        <h2>{content?.about?.title || "About Us"}</h2>

                        <p style={{
                            fontSize: "17px",
                            lineHeight: "1.8"
                        }}>
                            {content?.about?.description || "About our real estate project."}
                        </p>

                        <button className="about-btn">
                            Learn More
                        </button>
                    </div>

                    <div className="about-image">
                        <img src="/about.jpg" alt="About Real Estate" />
                    </div>

                </div>
            </section>

            {content?.faq?.length > 0 && (
                <section style={{
                    padding: "100px 20px",
                    backgroundColor: "#f9f9f9"
                }}>
                    <div style={{ maxWidth: "900px", margin: "auto" }}>
                        <h2 style={{
                            textAlign: "center",
                            marginBottom: "50px",
                            fontSize: "34px"
                        }}>
                            Frequently Asked Questions
                        </h2>

                        {content.faq.map((item, index) => (
                            <div key={index} style={{
                                background: "white",
                                padding: "20px",
                                borderRadius: "12px",
                                marginBottom: "20px",
                                boxShadow: "0 5px 15px rgba(0,0,0,0.05)"
                            }}>
                                <h4>{item.question}</h4>
                                <p style={{ color: "#555" }}>{item.answer}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {content?.construction && (
                <section style={{
                    padding: "100px 20px",
                    textAlign: "center",
                    backgroundColor: "#111",
                    color: "white"
                }}>
                    <h2 style={{ marginBottom: "20px" }}>
                        Construction Status
                    </h2>

                    <p style={{
                        fontSize: "20px",
                        fontWeight: "500"
                    }}>
                        {content?.construction?.status || "Under Construction"}
                    </p>
                </section>
            )}

            <section
                style={{
                    padding: "100px 20px",
                    textAlign: "center",
                    backgroundColor: "#ffffff"
                }}
            >
                <h2 style={{
                    fontSize: "38px",
                    marginBottom: "15px",
                    letterSpacing: "1px"
                }}>
                    Explore More Buildings
                </h2>

                <div style={{
                    width: "80px",
                    height: "3px",
                    backgroundColor: "#111",
                    margin: "0 auto 50px"
                }}></div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "30px",
                        flexWrap: "wrap"
                    }}
                >
                    <img
                        src="/img3.jpg"
                        alt="Building 1"
                        style={{
                            width: "320px",
                            borderRadius: "15px",
                            transition: "0.4s",
                            cursor: "pointer"
                        }}
                    />

                    <img
                        src="/img4.jpg"
                        alt="Building 2"
                        style={{
                            width: "320px",
                            borderRadius: "15px",
                            transition: "0.4s",
                            cursor: "pointer"
                        }}
                    />

                    <img
                        src="/img6.jpg"
                        alt="Building 3"
                        style={{
                            width: "320px",
                            borderRadius: "15px",
                            transition: "0.4s",
                            cursor: "pointer"
                        }}
                    />
                </div>
            </section>
        </div>
    )
}

export default Home;