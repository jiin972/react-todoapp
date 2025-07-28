import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

//localStorage 저장기능 구현
const { persistAtom } = recoilPersist({
  key: "todoApp",
  storage: localStorage,
});

export enum Categories {
  TO_DO = "TO_DO",
  DOING = "DOING",
  DONE = "DONE",
}

export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

//현재 선택된 필터 카테고리를 저장
export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
  effects_UNSTABLE: [persistAtom],
});

//데이터 저장소(원본)
export const toDosState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

//필터링된 할일목록을 return
export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDosState);
    const category = get(categoryState); //업데이트된 categoryState값을 다시 읽어옴
    return toDos.filter((toDo) => toDo.category === category); //category는 get(categoryState)를 통해 가져온 select box의 선택된 카테고리
  },
});
