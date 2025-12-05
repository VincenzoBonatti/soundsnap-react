import React from 'react';
import './App.css';
import { useEffect, useState } from 'react';

function ProfilePage() {
    const [ user, setUser ]  = useState();
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetch(`https://sound-snap-api-node.onrender.com/api/auth/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      })
        .then(response => response.json())
        .then(data => {
          setUser(data.data);
          console.log(data)
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
        });
    }, [token]);

    return(
        <main>
             {user &&
                <div className="profile-container">
                    <h1>Perfil de {user.name}</h1>
                </div>
            }
        </main>
    )
}

export default ProfilePage;