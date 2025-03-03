import { useNavigate } from "react-router-dom"
import Button from "./Button";
function BackButton() {
    const navigate = useNavigate()

    function handleGoBack(e) {
        e.preventDefault();
        navigate(-1)
    }
    return (
        <Button type="back" onClick={(e)=>handleGoBack(e)}>
           &larr;
        </Button>
    )
}

export default BackButton