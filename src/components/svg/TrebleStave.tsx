import { BASE_COLOR } from "src/constants";
import { Pitch } from "src/types";
import { getBaseYPosition } from "src/utils/score";

const TrebleClef = () => {
  return (
    <g transform="translate(-50)">
      <path
        stroke={BASE_COLOR}
        fill={BASE_COLOR}
        d="M289.859 218.165c-12.238-12.083-28.92-18.736-46.975-18.736-.739 0-1.469.011-2.191.034-4.751-18.989-9.194-34.531-12.219-44.64a758.83 758.83 0 0 1-3.54-12.192c13.877-15.22 26.345-29.841 33.266-44.593 19.623-41.823 10.708-66.709 3.647-77.821C253.684 7.369 240.237 0 224.955 0c-13.893 0-25.356 5.533-33.149 16-15.284 20.528-15.407 58.521-.127 118.479-29.22 31.773-60.724 67.762-60.724 112.562 0 47.333 25.917 70.548 47.66 81.688 22.534 11.546 45.015 12.242 45.961 12.266l.379.005c3.073 0 6.112-.127 9.109-.378l.103 1.491c1.335 19.236 2.489 35.849.003 50.352-2.37 13.822-11.714 18.001-19.006 17.382-3.07-.261-10.21-1.744-10.21-9.848h-30c0 21.169 15.841 37.883 37.666 39.74 1.33.113 2.656.17 3.98.17a46.432 46.432 0 0 0 27.914-9.306c10.179-7.647 16.827-19.082 19.225-33.069 3.095-18.055 1.826-36.334.356-57.5l-.317-4.583c-.043-.64-.088-1.279-.135-1.919 6.901-2.901 13.235-6.612 18.807-11.07 17.339-13.872 26.504-33.742 26.504-57.463.001-18.043-6.781-34.676-19.095-46.834zM215.868 33.916c1.515-2.034 3.663-3.916 9.086-3.916 3.451 0 8.261 1.094 11.573 6.307 2.361 3.716 8.945 18.232-5.486 48.989-3.165 6.746-8.459 14.108-14.908 21.894-10.675-50.874-4.268-67.898-.265-73.274zM225.237 311c-1.764-.087-18.08-1.109-33.732-9.38-20.557-10.862-30.55-28.715-30.55-54.579 0-27.928 19.13-54.306 40.316-78.423a1018.638 1018.638 0 0 1 10.722 39.708c-12.94 9.11-19.038 23.895-19.038 38.007 0 11.36 4.616 21.066 12.997 27.331 6.43 4.806 14.077 6.893 21.186 7.503a682.259 682.259 0 0 1 4.186 29.57 77.704 77.704 0 0 1-6.087.263zm35.152-9.649c-3.197-25.015-7.776-49.574-12.6-71.639 18.327 2.149 31.166 16.328 31.166 35.288 0 17.468-7.698 29.136-18.566 36.351z"
      />
    </g>
  );
};

const StaveLine = ({ pitch, width }: { pitch: Pitch; width: number }) => {
  return (
    <path
      strokeWidth="1"
      stroke={BASE_COLOR}
      d={`M0 ${getBaseYPosition(pitch)} H ${width - 1}`}
    />
  );
};

export const TrebleStave = ({ SVGWidth }: { SVGWidth: number }) => {
  return (
    <>
      <TrebleClef />
      <StaveLine width={SVGWidth} pitch="E4" />
      <StaveLine width={SVGWidth} pitch="G4" />
      <StaveLine width={SVGWidth} pitch="B4" />
      <StaveLine width={SVGWidth} pitch="D5" />
      <StaveLine width={SVGWidth} pitch="F5" />
    </>
  );
};
