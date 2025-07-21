import { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { AlignCenter, Loader2Icon } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import Particles from "@/components/blocks/Backgrounds/Particles/Particles";
import StarBorder from "@/components/blocks/Animations/StarBorder/StarBorder";
import { useRef } from "react";
import html2canvas from "html2canvas";

export default function LandingPage() {
    const [url, setUrl] = useState("");
    const [error, setError] = useState("");
    const [postData, setPostData] = useState(null);
    const [loading, setLoading] = useState(false);

    const previewRef = useRef(null);


    const handleDownload = async () => {
        if (!previewRef.current) return;

        const canvas = await html2canvas(previewRef.current, {
            useCORS: true, // for loading external images
            backgroundColor: null, // to preserve transparency
            scale: 2, // higher resolution
        });

        const dataUrl = canvas.toDataURL("image/png");

        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "x-post.png";
        link.click();
    };

    const handleFetch = async () => {
        if (!url.startsWith("https://x.com/") && !url.startsWith("https://twitter.com/")) {
            setError("Please enter a valid X (Twitter) URL.");
            return;
        }

        setError("");
        setLoading(true);
        try {
            const response = await fetch("http://localhost:5000/api/scrape", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url }),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch post data.");
            }

            const data = await response.json();
            console.log(data)
            setPostData(data);


            // TODO: Set this data to state to render in preview
            // e.g., setPostData(data);

        } catch (err) {
            console.error(err);
            setError("Something went wrong while fetching the post.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen bg-gray-900 overflow-hidden flex items-center justify-center p-6">
            {/* Background Particles */}
            <div className="absolute inset-0 z-0">
                <Particles
                    particleColors={["#ffffff", "#ffffff"]}
                    particleCount={400}
                    particleSpread={10}
                    speed={0.1}
                    particleBaseSize={100}
                    moveParticlesOnHover={false}
                    alphaParticles={false}
                    disableRotation={false}
                />
            </div>

            {/* Foreground Content */}
            <div className="relative z-10 flex flex-col items-center w-full">
                <div className="text-center mb-6">
                    <h1 className="text-4xl font-bold mb-2 text-gray-50">Xframe</h1>
                    <p className="text-gray-200">Turn X posts into beautiful posters</p>
                </div>
                <StarBorder
                    as="span"
                    className="w-full max-w-xl"
                    color="cyan"
                    speed="3s"
                    thickness={10}
                >
                    <Card className="shadow-lg" >
                        <CardContent className="p-6 space-y-4">
                            <Input
                                placeholder="Paste your X post URL here..."
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                            />
                            {error && <p className="text-sm text-red-500">{error}</p>}
                            <Button className="w-full" onClick={handleFetch} disabled={loading}>
                                {loading ? (
                                    <>
                                        <Loader2Icon className="animate-spin mr-2 h-4 w-4" />
                                        Please wait
                                    </>
                                ) : (
                                    "Fetch Post"
                                )}
                            </Button>
                        </CardContent>
                    </Card>
                </StarBorder>
                <div className="mt-10 w-full max-w-xl">
                    <h2 className="text-lg font-semibold mb-2 text-gray-100">Preview</h2>
                    <div className="w-full h-max-100 bg-amber-50 rounded-md items-center content-center p-4 ">
                        {postData ? (
                            <div ref={previewRef}
                                style={{
                                    aspectRatio: 16 / 9,            // 16:9 aspect ratio (same as 'aspect-video')
                                    border: "1px solid #ccc",     // Equivalent to 'border'
                                    borderRadius: "0.75rem",      // 'rounded-xl' = 12px = 0.75rem
                                    padding: "1rem",              // 'p-4' = 1rem = 16px
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "0.75rem",               // 'gap-3' = 0.75rem = 12px
                                    backgroundColor: "white"      // Optional: ensure white background for html2canvas
                                }}>
                                <div className="flex items-center gap-4">
                                    <img
                                        src={postData.profile_img}
                                        alt="Profile"
                                        style={{
                                            width: "3rem",            // w-12 = 3rem = 48px
                                            height: "3rem",           // h-12 = 3rem = 48px
                                            borderRadius: "9999px",   // rounded-full = full circular
                                            objectFit: "cover"        // object-cover = cover image inside box
                                        }}
                                    />
                                    <div>
                                        <p style={{
                                            fontWeight: "600", // font-semibold
                                            margin: 0,
                                        }}>{postData.displayName}</p>

                                        <p style={{
                                            fontSize: "0.875rem", // text-sm = 14px
                                            color: "#99A1AF",
                                            margin: 0,
                                        }}>@{postData.handle}</p>
                                    </div>
                                </div>

                                <p style={{
                                    fontSize: "1.125rem", // text-lg = 18px
                                    whiteSpace: "pre-line",
                                    color: "#101828",
                                    marginTop: "1rem",
                                    marginBottom: "1rem",
                                }}>{postData.text}</p>

                                {postData.media.map((m, i) => (
                                    <div key={i} style={{
                                        position: "relative",
                                        marginBottom: "0.75rem",
                                    }}>
                                        <img src={m.url} style={{
                                            borderRadius: "0.375rem", // rounded-md = 6px
                                            maxWidth: "100%",
                                            display: "block",
                                        }} />

                                    </div>
                                ))}


                            </div>
                        ) : (
                            <div className="aspect-video bg-white border rounded-xl flex items-center justify-center text-gray-400">
                                Post preview will appear here
                            </div>

                        )}
                        <Button style={{ marginTop: "1rem", }} onClick={handleDownload}>
                            Download as PNG
                        </Button>
                    </div>

                </div>
            </div>
        </div>
    );
}
