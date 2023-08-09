import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

const mapState = ({ user }) => ({
    currentUser: user.currentUser
})

export const useAuth = props => {
    const { currentUser } = useSelector(mapState);
    let navigate = useNavigate();
    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
        }
    }, [currentUser]);

    return currentUser;
}

export const useAuthNot = props => {
    const { currentUser } = useSelector(mapState);
    let navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            navigate('/');
        }
    }, [currentUser]);

    return currentUser;
}
