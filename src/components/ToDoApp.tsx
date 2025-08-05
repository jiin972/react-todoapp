import { useRecoilState, useRecoilValue } from "recoil";
import CreateToDo from "./CreateToDo";
import { Categories, categoryState, toDoSelector, toDosState } from "../atoms";
import ToDo from "./ToDo";

function ToDoApp() {
  //원본데이터를 읽고, 변경할 권한 소유
  const [allTodos, setToDos] = useRecoilState(toDosState);
  //데이터 변경을 로직 구현
  const deleteToDo = (idToDelete: number) => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex(
        (toDo0) => toDo0.id === idToDelete
      );
      if (targetIndex === -1) return oldToDos;
      const beforeTarget = oldToDos.slice(0, targetIndex);
      const afterTarget = oldToDos.slice(targetIndex + 1);
      return [...beforeTarget, ...afterTarget];
    });
  };

  const filteredToDos = useRecoilValue(toDoSelector); // 필터링된 목록을 return받아 ui painting
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as Categories); // select박스의 새 값을 categoryState에 저장
  };
  console.log(filteredToDos);
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </select>
      <CreateToDo />
      <ul>
        {filteredToDos?.map((aToDo) => (
          <ToDo key={aToDo.id} {...aToDo} onDelete={deleteToDo} />
        ))}
      </ul>
    </div>
  );
}

export default ToDoApp;
