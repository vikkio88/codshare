import { Tooltip } from "react-tippy";

const T = ({ title = "tip", position = "bottom", children }) => {
    return (
        <Tooltip
            title={title}
            position={position}
        >
            {children}
        </Tooltip>
    );
};

export default T;