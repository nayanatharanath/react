import NavBar from "./NavBar";

const Base = ({ title = "Welcome to our Ecommerce website", children }) => {
  return (
    <div className="container-fluid p-0 m-0">
      <NavBar />
      {children}
    </div>
  );
};

export default Base;
