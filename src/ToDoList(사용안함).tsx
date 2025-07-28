import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface IForm {
  toDo: string;
}

function ToDoList() {
  //   const [toDo, setToDo] = useState("");
  //   const [toDoError, setToDoError] = useState("");
  //   const onChange = (event: React.FormEvent<HTMLInputElement>) => {
  //     const {
  //       currentTarget: { value },
  //     } = event;
  //     setToDoError("");
  //     setToDo(value);
  //   };
  //   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //     event.preventDefault();
  //     if (toDo.length < 10) {
  //       return setToDoError("To do should be longer");
  //     }
  //     console.log("submit");
  //   };
  //   return (
  //     <div>
  //       <form onSubmit={onSubmit}>
  //         <input onChange={onChange} value={toDo} placeholder="Write a To do" />
  //         <button>Add</button>
  //         {toDoError !== "" ? toDoError : null}
  //       </form>
  //     </div>
  //   );
  const { register, handleSubmit } = useForm<IForm>();
  const handelValid = (data: IForm) => {
    console.log("add to do", data.toDo);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(handelValid)}>
        <input
          {...register("toDo", {
            required: "Please write a To Do.",
          })}
          placeholder="Write a to do"
        />
        <button>Add</button>
      </form>
    </div>
  );
}
// useForm hook 사용법
// interface IForm {
//   email: string;
//   firstName: string;
//   lastName?: string;
//   userName: string;
//   password: string;
//   password1: string;
//   extraError?: string;
// }

// function ToDoList() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setError,
//   } = useForm<IForm>({
//     defaultValues: {
//       email: "@naver.com",
//     },
//   });
//   const onValid = (data: IForm) => {
//     if (data.password !== data.password1) {
//       setError(
//         "password1",
//         { message: "Password are not the same" },
//         { shouldFocus: true }
//       );
//     }
//     // setError("extraError", { message: "Server offline." });
//     console.log(data);
//   };
//   return (
//     <div>
//       <form
//         style={{ display: "flex", flexDirection: "column" }}
//         onSubmit={handleSubmit(onValid)}
//       >
//         <input
//           {...register("email", {
//             required: "Email is required",
//             pattern: {
//               value: /^[A-Za-z0-9._%+-]+@naver.com$/,
//               message: "Only naver.com emails allowed",
//             },
//           })}
//           placeholder="Write a Email"
//         />
//         {errors.email && <span>{errors?.email?.message}</span>}
//         <input
//           {...register("firstName", {
//             required: "Write a Firstname",
//             validate: {
//               noJiin: (value) =>
//                 value.includes("jiin") ? "no jiin allowed" : true,
//               noJin: (value) =>
//                 value.includes("jin") ? "no jin allowed" : true,
//             },
//           })}
//           placeholder="First Name"
//         />
//         {errors.firstName && <span>{errors?.firstName?.message}</span>}

//         <input
//           {...register("lastName", { required: "Write a Lastname" })}
//           placeholder="Last Name"
//         />
//         {errors.lastName && <span>{errors?.lastName?.message}</span>}

//         <input
//           {...register("userName", {
//             required: "Write a Username",
//             minLength: {
//               value: 10,
//               message: "Write a Username least 10words",
//             },
//           })}
//           placeholder="Username"
//         />
//         {errors.userName && <span>{errors?.userName?.message}</span>}
//         <input
//           {...register("password", {
//             required: "Password is required",
//             minLength: {
//               value: 5,
//               message: "Your password is too short",
//             },
//           })}
//           placeholder="Password"
//         />
//         {errors.password && <span>{errors?.password?.message}</span>}
//         <input
//           {...register("password1", {
//             required: "Password is required!",
//             minLength: {
//               value: 5,
//               message: "Your password is too short",
//             },
//           })}
//           placeholder="Password1"
//         />
//         {errors.password1 && <span>{errors?.password1?.message}</span>}
//         <button>Add</button>
//         <span>{errors?.extraError?.message}</span>
//       </form>
//     </div>
//   );
// }

export default ToDoList;
