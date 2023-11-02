import { Button } from "@mui/material";

function FutmanagerButton({ icon, className, color, click}) {
    return (
        <div className={`w-full m-3 ${className}`}>
            <Button className="w-32"
                style={{ width: '120px' }}
                variant="contained"
                color={color}
                onClick={click}>
                    {icon}
            </Button>
        </div>
    )
}

export default FutmanagerButton;