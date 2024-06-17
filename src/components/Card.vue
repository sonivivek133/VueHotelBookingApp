<template>
  <div class="custom-card mb-3">
    <!-- Hotel image-->
    <img
      :src="require(`../assets/${hotel.photo}`)"
      class="card-img rounded me-3"
      alt="hotel"
    />
    <!--Hotel details (name, rooms, price)-->
    <div class="w-50">
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
    <!-- Rating and stars -->
    <div class="ms-auto d-flex flex-column justify-content-between">
      <div class="d-flex justify-content-end">
        <div class="d-flex flex-column">
          <span class="me-2">{{ setRatingText }}</span>
          <small>652 Reviews</small>
        </div>
        <div class="rating ms-1">{{ hotel.rating }}</div>
      </div>
      <div class="d-flex flex-column align-items-end">
        <small class="ms-auto">
          {{ guestData.days }} night, {{ guestData.adult }} adults,
          {{ guestData.room }} room(s)
        </small>
        <p class="my-0 h4">
          {{ (hotel.price * guestData.days * guestData.room) | dollarSign }}
        </p>
        <small>+{{ tax | dollarSign }} taxes and charges</small>
        <button class="fav-btn mt-2" @click="toggleFavorite">
          <i :class="isFavorite(hotel) ? 'fa fa-heart' : 'fa fa-heart-o'" aria-hidden="true"></i>
          {{ isFavorite(hotel) ? 'Remove from Favorites' : 'Add to Favorites' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Star from "../components/Star.vue";
import dollarSign from "../mixins/Filters";

export default {
  name: "Card",
  components: {
    Star,
  },
  props: {
    hotel: Object,
    guestData: Object,
  },
  mixins: [dollarSign],
  computed: {
    // Transforms hotel name into "hotels/hotel-name-here"
    hotelName() {
      return this.hotel.name.split(" ").join("-");
    },
    // We are setting rating of the hotel based on the points from users
    setRatingText() {
      if (this.hotel.rating > 9) return "Wonderful";
      else if (this.hotel.rating > 8.5) return "Excellent";
      else if (this.hotel.rating > 8) return "Very Good";
      else return "Good";
    },
    // Calculating 18% tax for hotel price
    tax() {
      return (this.hotel.price * this.guestData.days * 18) / 100;
    },
  },
  methods: {
    toggleFavorite() {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      const index = favorites.findIndex(fav => fav.id === this.hotel.id);
      if (index !== -1) {
        favorites.splice(index, 1);
      } else {
        favorites.push(this.hotel);
      }
      localStorage.setItem("favorites", JSON.stringify(favorites));
    },
    isFavorite(hotel) {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      return favorites.some(fav => fav.id === hotel.id);
    },
  },
};
</script>

<style scoped>
.custom-card {
  display: flex;
  padding: 10px;
  border: 1px solid rgb(187, 187, 187);
  border-radius: 5px;
}
.card-img {
  max-height: 200px;
  max-width: 200px;
}
.card-title {
  font-size: 20px;
  font-weight: 700;
}
.card-text {
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
}
.blue {
  color: rgb(0, 113, 194);
}
.green {
  color: rgb(0, 128, 9);
  font-weight: 700;
}
.fav-btn {
  background: none;
  border: none;
  color: rgb(0, 113, 194);
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
}

.fav-btn .fa {
  margin-right: 5px;
}
</style>
