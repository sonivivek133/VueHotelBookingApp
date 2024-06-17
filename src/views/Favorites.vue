<template>
  <div class="favorites">
    <h2 class="mb-3">Favorites</h2>
    <div v-if="favorites.length === 0" class="empty-state">
      No favorites added yet.
    </div>
    <div v-else>
      <div class="favorite-item mb-3" v-for="hotel in favorites" :key="hotel.id">
        <div class="d-flex align-items-center justify-content-between">
          <div>
            <h5 class="card-title blue mb-1">
              {{ hotel.name }}
            </h5>
            <p class="card-text mb-1">
              <Star :num="hotel.star" />
            </p>
            <p class="card-text blue mb-2">
              <i class="fa fa-map-marker" aria-hidden="true"></i>
              {{ hotel.location }}
            </p>
            <p class="card-text">
              {{ hotel.type }}
              <span class="d-block">{{ hotel.bed }}</span>
            </p>
            <p class="card-text green mb-3">
              {{ hotel.cancel }}
            </p>
          </div>
          <div class="ms-auto d-flex flex-column align-items-end">
            <small class="ms-auto">
              {{ guestData.days }} night, {{ guestData.adult }} adults,
              {{ guestData.room }} room(s)
            </small>
            <p class="my-0 h4">
              {{ (hotel.price * guestData.days * guestData.room) | dollarSign }}
            </p>
            <small>+{{ tax | dollarSign }} taxes and charges</small>
            <button class="book-btn rounded d-block mt-2" @click="removeFromFavorites(hotel.id)">
              Remove from Favorites
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Star from "../components/Star.vue";

export default {
  name: "Favorites",
  props: {
    guestData: {
      type: Object,
    },
  },
  computed: {
    favorites() {
      return JSON.parse(localStorage.getItem("favorites")) || [];
    },
  },
  methods: {
    removeFromFavorites(hotelId) {
      let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      favorites = favorites.filter((fav) => fav.id !== hotelId);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    },
  },
  components: {
    Star,
  },
};
</script>

<style scoped>
.favorite-item {
  padding: 10px;
  border: 1px solid rgb(187, 187, 187);
  border-radius: 5px;
  background-color: antiquewhite;
}
.card-title {
  font-size: 20px;
  font-weight: 700;
}
.card-text {
  font-size: 12px;
  font-weight: 600;
}
.blue {
  color: rgb(0, 113, 194);
}
.green {
  color: rgb(0, 128, 9);
  font-weight: 700;
}
.book-btn {
  text-decoration: none;
  color: white;
  padding: 10px 20px;
  background-color: rgb(0, 113, 194);
  text-align: center;
}
.book-btn:hover {
  background-color: #043580;
}
.favorites {
  padding-top: 50px;
}
</style>
