import { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import Particles from "@/components/blocks/Backgrounds/Particles/Particles";
import StarBorder from "@/components/blocks/Animations/StarBorder/StarBorder";

export default function LandingPage() {
    const [url, setUrl] = useState("");
    const [error, setError] = useState("");
    const [postData, setPostData] = useState(null);

    const handleFetch = async () => {
        if (!url.startsWith("https://x.com/") && !url.startsWith("https://twitter.com/")) {
            setError("Please enter a valid X (Twitter) URL.");
            return;
        }

        setError("");
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
                            <Button className="w-full" onClick={handleFetch}>
                                Fetch Post
                            </Button>
                        </CardContent>
                    </Card>
                </StarBorder>
                <div className="mt-10 w-full max-w-xl">
                    <h2 className="text-lg font-semibold mb-2 text-gray-100">Preview</h2>
                    <div className="w-full h-max-100 bg-amber-50 rounded-md items-center content-center p-4 ">
                        {postData ? (
                            <div className="aspect-video bg-white border rounded-xl p-4 flex flex-col gap-3">
                                <div className="flex items-center gap-4">
                                    <img
                                        src={postData.profile_img}
                                        alt="Profile"
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="font-semibold">{postData.displayName}</p>
                                        <p className="text-sm text-gray-500">@{postData.handle}</p>
                                    </div>
                                </div>
                                <p className="text-lg text-gray-800 whitespace-pre-line">{postData.text}</p>
                                {postData.media.map((m, i) => (
                                    <div key={i} className="relative">
                                        <img src={m.url} className="rounded-md" />
                                        {m.type === "video" && (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <PlayIcon className="h-12 w-12 text-white opacity-80" />
                                            </div>
                                        )}
                                    </div>
                                ))}

                            </div>
                        ) : (
                            <div className="aspect-video bg-white border rounded-xl flex items-center justify-center text-gray-400">
                                Post preview will appear here
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
