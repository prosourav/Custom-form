import React, { useEffect } from "react";
import useForm from "./hooks/useForm";
import InputGroup from "./components/form/Inputgroup";
import Button from "./components/ui/buttons/Button";

const init = {
  firstName: "Sourav Saha",
  lastName: "",
  email: "",
  password: "",
};

const validate = (values) => {
  const errors = {};
  // console.log(values);
  if (!values.firstName) {
    errors["firstName"] = "First name is required";
  }
  if (!values.lastName) {
    errors["lastName"] = "last name is required";
  }
  if (!values.email) {
    errors["email"] = "Email is required";
  }
  if (!values.password) {
    errors["password"] = "Password is required";
  }

  return errors;
};

export default function App() {
  const {
    formState: state,
    handleBlur,
    handleFocus,
    handleChange,
    handleSubmit,
    clear,
  } = useForm({ init, validate });

  const submit = ({ hasErrors, values, errors }) => {
    if (hasErrors) {
      alert("[ERROR]" + JSON.stringify(errors,null, 2));
    } else {
      console.log(values);
      // alert("[SUCCESS]" + JSON.stringify(values));
    }
  };

  return (
    <div className="root">
      <form onSubmit={(e) => handleSubmit(e, submit)}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            width: "30%",
            margin: "5% auto",
          }}
        >
          <InputGroup
            label={"First Name"}
            required={true}
            name="firstName"
            placeholder={"John"}
            value={state.firstName.value}
            onChange={handleChange}
            error={state.firstName.errors}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          <InputGroup
            label={"Last Name"}
            required={true}
            name="lastName"
            placeholder={"Doe"}
            value={state.lastName.value}
            onChange={handleChange}
            error={state.lastName.errors}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          <InputGroup
            label={"Email"}
            required={true}
            name="email"
            placeholder={"johndoe@example.com"}
            value={state.email.value}
            onChange={handleChange}
            error={state.email.errors}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          <InputGroup
            label={"Password"}
            name="password"
            required={true}
            placeholder={"********"}
            value={state.password.value}
            onChange={handleChange}
            error={state.password.errors}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          <Button type="reset" onClick={clear} style={{ padding: "15px 0px" }}>
            Clear
          </Button>

          <Button
            type="submit"
            style={{ padding: "15px 0px", backgroundColor: "green" }}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

// import React, { useState, useEffect } from "react";
// import InfiniteScroll from "react-infinite-scroll-component";

// const MyComponent = () => {
//   const [data, setData] = useState([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);

//   const fetchData = async () => {
//     setLoading(true);
//     // Fetch data from an API or any data source
//     const response = await fetch(
//       `https://dummyjson.com/products/?limit=6&skip=${data.length}`
//     );
//     const newData = await response.json();
//     setData([...data, ...newData.products]);
//     setPage(page + 1);
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <div id="scrollableDiv" style={{ height: "200px", overflowY: "scroll" }}>
//       <InfiniteScroll
//         // style={{ height: "400px", border: "1px solid red" }}
//         dataLength={data.length}
//         next={fetchData}
//         hasMore={data.length < 100} // Set to false when there is no more data to load
//         loader={loading && <h4>Loading...</h4>}
//         endMessage={ <h4>Sorry no more data...</h4>}
//         // style={{ overflow: "visible" }}
//         scrollableTarget="scrollableDiv"
//       >
//         {data.map((item, index) => (
//           <div style={{ border: "1px solid red", padding: "12px" }} key={index}>
//             {item.title} {index}
//           </div>
//         ))}
//         {/* Render your data */}
//       </InfiniteScroll>
//     </div>
//   );
// };

// export default MyComponent;



