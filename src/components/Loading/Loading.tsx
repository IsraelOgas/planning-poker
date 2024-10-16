import { CircularProgress } from "@material-ui/core";

const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100dvh",
        width: "100dvw",
      }}
    >
      <CircularProgress />
    </div>
  );
};

export default Loading;
