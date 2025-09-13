import { PropagateLoader } from "react-spinners";

export default function Loader() {
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100%"
        }}>
            <PropagateLoader color="var(--black)" loading={true} size={25} />
        </div>
    );
};

