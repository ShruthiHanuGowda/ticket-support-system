import React from 'react'
// import style from '../../Assets/Styles/Common/_PageNotFound.scss'
import { useNavigate } from 'react-router-dom';

export const PageNotFound = () => {
    const navigate = useNavigate();
    return (
        <>
            <aside>
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/4424790/Mirror.png" alt="404 Image" />
            </aside>
            <main >
                <h1>Sorry!</h1>
                <p>
                    Either you aren't cool enough to visit this page or it doesn't exist <em>. . . like your social life.</em>
                </p>
                <button onClick={() => navigate(-1)}>go back</button>
            </main>
        </>
    )
}
