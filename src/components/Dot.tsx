import { BaseSVGPathProps } from "src/types";

interface DotProps extends BaseSVGPathProps {
    xCentre: number;
    yCentre: number;
}

export const Dot = ({ color, opacity, xCentre, yCentre, handleClick }: DotProps) => {
    return (
        <>
            {handleClick && <ellipse
                className="clickable-cover"
                stroke=""
                opacity={0}
                cx={xCentre}
                cy={yCentre}
                rx={15}
                ry={15}
            />}
            <circle
                cx={xCentre}
                cy={yCentre}
                r="5"
                stroke={color}
                opacity={opacity}
                strokeWidth="3"
                fill={color}
            />
        </>
    );
};
