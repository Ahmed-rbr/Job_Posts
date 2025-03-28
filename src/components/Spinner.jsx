import ClipLoader from "react-spinners/ClipLoader";
const style = {
  margin: "100px auto",
  display: "block",
};
const Spinner = ({ loading }) => {
  return (
    <ClipLoader color="#4338ca" loading={loading} cssStyle={style} size={150} />
  );
};

export default Spinner;
