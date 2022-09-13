import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRandomCollaborater } from "../services/Api.service";
import { getFromSessionStorage } from '../services/SessionStorage.service';
import CollaboraterCard from "../components/CollaboraterCard";

const Home = () => {
    const [user, setUser] = useState(null);
    const token = getFromSessionStorage('token');
    useEffect(()=>{
        const response = getRandomCollaborater(token);
        response.then((res) => {
            if (res.status == 200) {
                setUser(res.data)
            }
        })

    }, [])
    return (
        <div>
            {
                user &&
                <CollaboraterCard user={user}/>
            }
        </div>
    );
};

export default Home;