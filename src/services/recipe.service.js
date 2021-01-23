import axios from "axios";
export function getAllRecipe() {
  console.log("datafetch");
  return axios.get("http://localhost:8080/api/v1/recipes/");
}

export function deleteRecipe(id) {
  console.log(id);
  return axios.delete(`http://localhost:8080/api/v1/recipes/delete/${id}`);
}

export function addRecipe(value) {
  return axios.post(`http://localhost:8080/api/v1/recipes/add`, value);
}

export function updateRecipe(value) {
  console.log(value);
  var updateData = JSON.stringify(value);
  console.log(updateData);
  return axios.put(`http://localhost:8080/api/v1/recipes/update`, value);
}
