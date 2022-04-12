import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";
import styled from "styled-components";

interface IForm {
  toDo: string;
}
//Without Recoil persist
// let toDos: object[] = [];
const ToDoForm = styled.form`
  display: flex;
  align-items: center;
  height: 40px;
  width: 440px;
`;
const ToDoInput = styled.input`
  height: 100%;
  width: 400px;
  border: none;
  border-radius: 10px 0px 0px 10px;
  padding: 0px 0px 0px 10px;
  font-size: 16px;
  &:focus {
    outline: none;
  }
`;

const Add = styled.button`
  height: 100%;
  width: 40px;
  background-color: gray;
  color: whitesmoke;
  border: none;
  border-radius: 0px 10px 10px 0px;
  font-size: 16px;
  font-weight: bold;
  &:hover {
    background-color: #b4b4b4;
  }
`;

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category },
      ...oldToDos,
    ]);
    // const newTodoObj: object = {
    //   text: toDo,
    //   id: Date.now(),
    //   category,
    // };
    // toDos.push(newTodoObj);
    // localStorage.setItem("todos", JSON.stringify(toDos));
    setValue("toDo", "");
  };
  return (
    <>
      <ToDoForm onSubmit={handleSubmit(handleValid)}>
        <ToDoInput
          {...register("toDo", {
            required: "Please write a To Do",
            maxLength: 33,
          })}
          placeholder="Write a to do"
        />
        <Add>Add</Add>
      </ToDoForm>
    </>
  );
}
export default CreateToDo;
