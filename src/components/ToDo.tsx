import React from "react";
import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";
import styled from "styled-components";

const ToDoList = styled.li`
  display: flex;
  justify-content: space-between;
  min-height: 45px;
  height: auto;
  width: 440px;
  padding: 0px 20px 0px 10px;
  margin-top: 13px;
`;

const Text = styled.div`
  line-height: 45px;
  max-width: 290px;
  font-size: 15px;
  font-weight: bold;
  word-break: break-all;
`;

const Icon = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 150px;
`;

const ToDoButton = styled.button`
  height: 45px;
  width: 45px;
  font-weight: bold;
  color: whitesmoke;
  border: none;
  border-radius: 50%;
  background-color: gray;
  &:hover {
    background-color: #b4b4b4;
  }
`;
const DeleteButton = styled(ToDoButton)`
  color: transparent;
  text-shadow: 0 0 0 #f0f0f0;
`;

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const deleteToDo = () => {
    setToDos((oldToDos) => {
      // const savedToDos = localStorage.getItem("todos");
      // const parsedToDos: [IToDo] = JSON.parse(savedToDos as any);
      // const newSavedToDos = parsedToDos.filter((toDo) => toDo.id !== id);
      // localStorage.setItem("todos", JSON.stringify(newSavedToDos));
      const newToDo = oldToDos.filter((toDo) => toDo.id !== id);
      return newToDo;
    });
  };
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      // Without Recoil persist
      // const savedToDos = localStorage.getItem("todos");
      // const parsedToDos: [IToDo] = JSON.parse(savedToDos as any);
      // const newSavedToDos = [
      //   ...parsedToDos.slice(0, targetIndex),
      //   newToDo,
      //   ...parsedToDos.slice(targetIndex + 1),
      // ];
      // localStorage.setItem("todos", JSON.stringify(newSavedToDos));
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <ToDoList>
      <Text>{text}</Text>
      <Icon>
        {category !== Categories.DOING && (
          <ToDoButton name={Categories.DOING} onClick={onClick}>
            Doing
          </ToDoButton>
        )}
        {category !== Categories.TO_DO && (
          <ToDoButton name={Categories.TO_DO} onClick={onClick}>
            To Do
          </ToDoButton>
        )}
        {category !== Categories.DONE && (
          <ToDoButton name={Categories.DONE} onClick={onClick}>
            Done
          </ToDoButton>
        )}
        <DeleteButton onClick={deleteToDo}>❌</DeleteButton>
      </Icon>
    </ToDoList>
  );
}
export default ToDo;
