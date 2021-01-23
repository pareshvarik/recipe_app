<template>
  <div class="home">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">Recipe Apllication</b-navbar-brand>

      <b-navbar-nav class="ml-auto">
        <b-nav-item @click="createRecipe()">Create Recipe</b-nav-item>
      </b-navbar-nav>
    </b-navbar>

    <b-container fluid>
      <b-row>
        <b-col md="8" class="aside">
          <div v-for="meal in mealData" :key="meal.id">
            <b-card
              :title="meal.name"
              tag="article"
              style="max-width: 20rem;"
              class="mb-4"
              id="cardDiv"
              @click="getMoreDetails(meal)"
            >
              <img class="img-top" src="../assets/images.jpg" />
            </b-card>
          </div>
        </b-col>
        <b-col md="4">
          <div v-if="showModel">
            <b-card :title="this.meal.name" tag="article">
              <img class="img-top" src="../assets/images.jpg" />
              <b-card-text>
                <h5>Cooking Instructions</h5>
                {{ this.meal.cookingInstructions }}
              </b-card-text>

              <b-card-text>
                <h5>Date of creation</h5>
                {{ this.meal.dateOfCreation }}
              </b-card-text>

              <b-card-text>
                <h5>No Of People Suitable For</h5>
                {{ this.meal.noOfServings }}
              </b-card-text>

              <b-card-text v-if="this.meal.ingredients.length > 0">
                <h5>ingredients</h5>
                <ul
                  v-for="ingredient in this.meal.ingredients"
                  :key="ingredient.id"
                >
                  <li>
                    <p>
                      {{ ingredient.nameOfIngredient }}---
                      {{ ingredient.quantityDetails }}qty
                    </p>
                  </li>
                </ul>
              </b-card-text>

              <b-button @click="updateRecipe()" variant="primary"
                >update</b-button
              >
              <b-button @click="deleteRecipe()" variant="danger"
                >delete</b-button
              >
            </b-card>
          </div>
          <div v-if="showForm">
            <add-new-recepie />
          </div>
          <div v-if="showUpdateform">
            <updateRecipe :selectedMeal="this.meal" />
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import addNewRecepie from "../components/AddNewRecepie.vue";
import updateRecipe from "../components/UpdateRecipe.vue";
import { getAllRecipe, deleteRecipe } from "../services/recipe.service.js";
export default {
  components: { addNewRecepie, updateRecipe },

  name: "Home",

  data() {
    return {
      meal: [],
      showModel: false,
      showForm: false,
      showUpdateform: false,
      mealData: [
        {
          id: 2,
          name: "Chicken Beriyani",
          isVegetarian: false,
          noOfServings: 1,
          cookingInstructions: "spicy",
          dateOfCreation: "22‐01‐2021 18:30",
          ingredients: [],
        },
        {
          id: 3,
          name: "Mutton Beriyani",
          isVegetarian: false,
          noOfServings: 2,
          cookingInstructions: "spicy",
          dateOfCreation: "22‐01‐2021 18:30",
          ingredients: [
            {
              id: 3,
              quantityDetails: "7",
              nameOfIngredient: "GINGER",
            },
            {
              id: 1,
              quantityDetails: "5",
              nameOfIngredient: "ONION",
            },
            {
              id: 2,
              quantityDetails: "6",
              nameOfIngredient: "GARLIC",
            },
          ],
        },
        {
          id: 4,
          name: "Fish Beriyani",
          isVegetarian: false,
          noOfServings: 3,
          cookingInstructions: "spicy",
          dateOfCreation: "22‐01‐2021 18:30",
          ingredients: [],
        },
      ],
    };
  },
  created() {
    getAllRecipe().then((res) => {
      this.mealData = res.data;
    });
  },
  methods: {
    getMoreDetails(data) {
      this.showModel = true;
      this.showForm = false;
      this.meal = data;
      this.showUpdateform = false;
    },
    createRecipe() {
      this.showModel = false;
      this.showForm = true;
      this.showUpdateform = false;
    },
    updateRecipe() {
      this.showUpdateform = true;
      this.showModel = false;
    },
    deleteRecipe() {
      if (confirm(`Do you really want to delete ${this.meal.name} recipe?`)) {
        deleteRecipe(this.meal.id);
        // this.$forceUpdate();
        // location.reload();
      }
    },
  },
};
</script>
<style scoped>
.card {
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.08), 0 0 6px rgba(0, 0, 0, 0.05);
  transition: 0.3s transform cubic-bezier(0.155, 1.105, 0.295, 1.12),
    0.3s box-shadow,
    0.3s -webkit-transform cubic-bezier(0.155, 1.105, 0.295, 1.12);
  padding: 14px 80px 18px 36px;
  cursor: pointer;
  float: left;
  margin: 10px;
  margin-top: 20px;
}

/* .card:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06);
} */

img {
  width: 100%;
  height: 75%;
}
</style>
