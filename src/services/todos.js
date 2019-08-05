import request from "services";

export const fetchAllTodos = () => {
  return request.get("/todo_items");
};

export const createTodo = (params) => {
  return request.post("/todo_items", params);
};

export const updateTodo = (id, params) => {
  return request.put(`/todo_items/${id}`, params);
};

export const deleteTodo = (id) => {
  return request.delete(`/todo_items/${id}`);
};



