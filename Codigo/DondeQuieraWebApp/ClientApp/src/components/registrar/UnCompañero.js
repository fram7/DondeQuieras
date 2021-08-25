import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';


export default function UnCompañero({ imgUser, userId }) {
    const { getUserById } = useContext(UserContext);

    const unCompañero = getUserById(userId);
    const { name, cargo } = unCompañero ? unCompañero : {};

    return (
        <div className="col-6 col-md-4 col-lg-3" >
            <div className="media">
                <img src={imgUser}
                    width="50px" className="mr-3" alt="..." />
                <div className="media-body">
                    <h5 className="mt-0">{name}</h5>
                    {cargo}
                </div>
            </div>
        </div>
    )
}