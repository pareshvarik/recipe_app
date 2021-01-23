<template>
  <div class="createForm" v-if="closeform">
    <h3>Create new recepie</h3>
    <button @click="Close()">Close</button>
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group label="Recipe Name:" label-for="recipeName">
        <b-form-input
          id="recipeName"
          v-model="form.name"
          type="text"
          placeholder="recipe name"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="No Of People Suitable For" label-for="noOfPeopleFor">
        <b-form-input
          id="noOfPeopleFor"
          type="text"
          v-model="form.noOfServings"
          placeholder="No Of People Suitable For"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="cookingInstructions" label-for="cookingInstructions">
        <b-form-input
          id="cookingInstructions"
          type="text"
          v-model="form.cookingInstructions"
          placeholder="cookingInstructions"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Creation Date" label-for="datepicker">
        <b-form-input
          id="datepicker"
          type="text"
          placeholder="date in 'dd‐MM‐yyyy HH:mm' format"
          v-model="form.dateOfCreation"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Ingradient" label-for="ingradient">
        <b-form-textarea
          id="ingradient"
          type="text"
          placeholder="type in id,quantity,name"
          v-model="form.ingredients"
        ></b-form-textarea>
      </b-form-group>

      <b-form-group label="Type">
        <b-form-radio
          name="some-radios"
          v-model="form.isVegetarian"
          value="true"
        >
          Veg</b-form-radio
        >
        <b-form-radio
          name="some-radios"
          v-model="form.isVegetarian"
          value="false"
        >
          Nonveg</b-form-radio
        >
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
</template>

<script>
import { addRecipe } from "../services/recipe.service.js";

export default {
  data() {
    return {
      closeform: true,
      form: {
        id: 10,
        name: "",
        isVegetarian: false,
        noOfServings: null,
        cookingInstructions: "",
        dateOfCreation: "22‐01‐2021 00:00",
        ingredients: "",
      },
    };
  },
  methods: {
    Close(){
      this.closeform=true;
    },
    onSubmit() {
      const ingradient = this.form.ingredients;
      var ingradientArray = ingradient.split(",");
      var obj = {
        id: null,
        quantity: null,
        description: "",
      };
      obj.id = ingradientArray[0];
      obj.quantity = ingradientArray[1];
      obj.description = ingradientArray[2];
      var array = [obj];
      this.form.ingredients = array;
      addRecipe(this.form);
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.recipeName = "";
      this.form.cookingInstructions = "";
      this.form.noOfServings = "";
      this.form.isVegetarian = null;
      this.form.ingredients = [];
      this.form.creationDate = "";
    },
  },
};
</script>
<style scoped>
.createForm {
  margin-top: 20px;
  margin-right: 10px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 6px 10px rgba(7, 0, 0, 0.08), 0 0 6px rgba(0, 0, 0, 0.05);
  transition: 0.3s transform cubic-bezier(0.155, 1.105, 0.295, 1.12),
    0.3s box-shadow,
    0.3s -webkit-transform cubic-bezier(0.155, 1.105, 0.295, 1.12);
  padding: 14px 80px 18px 36px;
  cursor: pointer;
}
/* .createForm:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06);
} */
</style>
