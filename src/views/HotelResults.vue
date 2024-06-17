<template>
  <div class="main">
    <!-- Search area -->
    <div class="search-area">
      <!-- Search inputs -->
      <!-- ... Existing search inputs ... -->
      <!-- Search button -->
      <router-link :to="{ name: 'Home' }">
        <button class="search-btn">Search</button>
      </router-link>
      <!-- Sort controls -->
      <div class="mt-3">
        <label>Sort by:</label>
        <div>
          <button class="sort-btn" @click="sortByPrice">
            Price
            <span v-if="sortType === 'price' && !reverseSortOrder">&#x25B2;</span>
            <span v-if="sortType === 'price' && reverseSortOrder">&#x25BC;</span>
          </button>
          <button class="sort-btn" @click="sortByRating">
            Rating
            <span v-if="sortType === 'rating' && !reverseSortOrder">&#x25B2;</span>
            <span v-if="sortType === 'rating' && reverseSortOrder">&#x25BC;</span>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Card container -->
    <div class="card-container" v-if="hotelsData">
      <!-- Header with count of properties found -->
      <h3 class="header mb-3">
        {{ guestData.location }}: {{ selectedLocationHotels.length }} properties found
      </h3>
      
      <!-- Render cards based on sorted hotels data -->
      <Card
        v-for="hotel in sortedHotels"
        :key="hotel.id"
        :hotel="hotel"
        :guestData="guestData"
      />
    </div>
  </div>
</template>

<script>
import Card from "../components/Card.vue";

export default {
  name: "HotelResults",
  props: {
    hotelsData: {
      type: Array,
      required: true,
    },
    guestData: {
      type: Object,
    },
  },
  data() {
    return {
      sortType: "", // To track current sorting type ('price' or 'rating')
      reverseSortOrder: false, // To toggle between ascending and descending order
    };
  },
  computed: {
    // Filter hotels based on selected location by the guest
    selectedLocationHotels() {
      return this.hotelsData.filter((item) => item.location === this.guestData.location);
    },
    // Compute sorted hotels based on sortType and sortOrder
    sortedHotels() {
      let sorted = [...this.selectedLocationHotels];
      if (this.sortType === "price") {
        sorted.sort((a, b) => {
          if (this.reverseSortOrder) {
            return b.price - a.price;
          } else {
            return a.price - b.price;
          }
        });
      } else if (this.sortType === "rating") {
        sorted.sort((a, b) => {
          if (this.reverseSortOrder) {
            return b.rating - a.rating;
          } else {
            return a.rating - b.rating;
          }
        });
      }
      return sorted;
    },
  },
  components: {
    Card,
  },
  methods: {
    // Method to toggle sort order and set sortType to 'price'
    sortByPrice() {
      if (this.sortType === "price") {
        this.reverseSortOrder = !this.reverseSortOrder;
      } else {
        this.sortType = "price";
        this.reverseSortOrder = false;
      }
    },
    // Method to toggle sort order and set sortType to 'rating'
    sortByRating() {
      if (this.sortType === "rating") {
        this.reverseSortOrder = !this.reverseSortOrder;
      } else {
        this.sortType = "rating";
        this.reverseSortOrder = false;
      }
    },
  },
};
</script>

<style scoped>
/* Styles for the sort buttons */
.sort-btn {
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 10px;
}
.sort-btn:hover {
  text-decoration: underline;
}

/* Additional styles specific to your layout */
.main {
  min-height: 100vh;
  display: grid;
  column-gap: 30px;
  grid-template-columns: repeat(4, 1fr);
  background-color: #f5f5f5;
  padding: 120px 70px 50px 70px;
}
.search-area {
  position: fixed;
  top: 120px;
  background-color: #fcbb01;
  width: 270px;
  padding: 20px 20px;
  border-radius: 3px;
}
.card-container {
  grid-column-start: 2;
  grid-column-end: 5;
}
.search-input {
  height: 36px;
  background-color: white;
  border-radius: 2px;
}
.search-btn {
  width: 100%;
  height: 50px;
  background-color: #1471c2;
  color: white;
  border: none;
  border-radius: 2px;
  outline: none;
}
.label {
  font-size: 12px;
  font-weight: 400;
}
.result {
  font-size: 14px;
  font-weight: 400;
}
.header {
  font-size: 24px;
  font-weight: 700;
}

/* Media queries for responsiveness */
@media only screen and (max-width: 1200px) {
  .main {
    grid-template-columns: 1fr;
  }
  .search-area {
    display: none;
  }
  .card-container {
    grid-column-start: 1;
    grid-column-end: 2;
  }
}
</style>
