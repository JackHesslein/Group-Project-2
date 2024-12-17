
export default function Home() {

    return (
<div>
    <div className="weatherSec">
        <div className="location-date">
            <div className="loc">
                <h2>City/Location</h2>
            </div>

            <div className="date">
                <h2>Date</h2>
            </div>
        </div>

        <div className="weatherInfo">
            <div className="symbol">
                <h2>Weather Symbol</h2>
            </div>

            <div className="Temp-Precip">
                <div className="temp">
                    <h2>Temperature</h2>
                </div>
                <div className="precip">
                    <h2>Percentage of chance of rainfall</h2>
                </div>
            </div>

            <div className="uv-windspeed">
                <div className="uv">
                    <h2>UV</h2>
                </div>
                <div className="windspeed">
                    <h2>Wind Speed</h2>
                </div>
            </div>

            <div className="moreInfo">
                <h2>Other Weather data we want to add</h2>
            </div>
        </div>
    </div>

    <div className="news">
        <h2>news stories and data</h2>
    </div>

</div>
    );
}