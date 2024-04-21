import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { useEffect, useState } from "react";


const PageNotFoundPage = () => {
    const navigate = useNavigate();
    const [secondsRemaining, setSecondsRemaining] = useState(10);

    useEffect(() => {

        // Create an interval to count down the seconds remaining
        const intervalId = setInterval(() => {
            setSecondsRemaining((prevSeconds) => {
                // When there is only 1 second left, clear the interval and redirect to login
                if (prevSeconds === 1) {
                    clearInterval(intervalId);
                    navigate("/");
                }
                // Decrement the remaining seconds
                return prevSeconds - 1;
            });
        }, 1000); // The interval runs every 1000ms (1 second)


    }, [navigate]);

    // Use the Button component from Ant Design to provide a UI for navigation
    return (
        <div id="notfound">
            <div className="notfound">
                <div className="notfound-error">
                    <h1>404</h1>
                    <h2>Page Not Found</h2>
                </div>
                <Button type="primary" className="returnLogin" onClick={() => navigate("/")}>
                    Back to Home page
                </Button>
                {/* Display a message indicating the automatic logout countdown */}
                <p>
                    You will be automatically redirect to home page in {secondsRemaining}{" "}
                    {secondsRemaining === 1 ? "second" : "seconds"}
                </p>
            </div>
        </div>
    );
};

export default PageNotFoundPage;