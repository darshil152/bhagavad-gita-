import React from 'react'
import krishna from "./Video/178454 (1080p).mp4"

export default function Loader() {
    return (
        <div>
            <video className='loader' autoPlay={true} muted loop >
                <source src={krishna} type="video/mp4" />
                {/* Add other source elements for different video formats if needed */}
                Your browser does not support the video tag.
            </video>
        </div>
    )
}
