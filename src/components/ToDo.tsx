import styled from "styled-components";
import { Categories, toDosState, type IToDo } from "../atoms";
import { useRecoilState } from "recoil";

const ToDoList = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Btn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 25%;
  font-size: 11px;
  background-color: #44bd32;
  color: white;
`;

interface ToDoProp extends IToDo {
  onDelete: (id: number) => void;
}

function ToDo({ text, category, id, onDelete }: ToDoProp) {
  //deleteToDo함수를 받음
  const [_, setToDos] = useRecoilState(toDosState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any }; //오브젝트로 생성
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  const onDeleteClick = () => {
    onDelete(id); //onClick이벤트로 함수호출, ToDoApp의 deleteToDo에 id를 넘겨주며 호출
  };
  return (
    <ToDoList>
      <span>{text}</span>
      {category !== Categories.DOING && (
        <Btn name={Categories.DOING} onClick={onClick}>
          Doing
        </Btn>
      )}
      {category !== Categories.TO_DO && (
        <Btn name={Categories.TO_DO} onClick={onClick}>
          ToDo
        </Btn>
      )}
      {category !== Categories.DONE && (
        <Btn name={Categories.DONE + ""} onClick={onClick}>
          Done
        </Btn>
      )}
      <button onClick={onDeleteClick}>❌</button>
    </ToDoList>
  );
}

export default ToDo;
