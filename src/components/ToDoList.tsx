import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { Categories, categoryState, toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 20px;
  height: 580px;
  max-width: 480px;
  margin: 20px auto 0px auto;
  background-color: black;
  border-radius: 10px;
`;

const Title = styled.h1`
  height: 60px;
  width: 440px;
  text-align: center;
  font-size: 48px;
  font-weight: bolder;
  background-color: #353535;
  border-radius: 10px;
  color: whitesmoke;
`;

const Category = styled.select`
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  margin-top: 20px;
  margin-bottom: 20px;
  height: 40px;
  width: 440px;
  text-align: center;
  color: whitesmoke;
  font-size: 24px;
  font-weight: bold;
  background-color: #353535;
  border-radius: 10px;
  border: none;
  &:hover {
    background-color: gray;
  }
  &:focus {
    outline: none;
  }
`;

const Container = styled.div`
  height: 400px;
  width: 440px;
  background-color: #353535;
  border-radius: 10px;
`;

const ToDoContainer = styled.div`
  height: 360px;
  overflow: auto;
`;

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  return (
    <Wrapper>
      <Title>To Do List</Title>
      <Category value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </Category>
      <Container>
        <CreateToDo />
        <ToDoContainer>
          {toDos?.map((toDo) => (
            <ToDo key={toDo.id} {...toDo} />
          ))}
        </ToDoContainer>
      </Container>
    </Wrapper>
  );
}
export default ToDoList;
