<template>
  <nav class="navbar navbar-expand-lg navbar-dark">
    <div class="container-fluid">
      <!-- Clickable company logo routing to the home page -->
      <router-link class="navbar-brand me-5" :to="{ name: 'Home' }">
        <h4>XLHotelBooking</h4>
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- Navigation links all routing to the respective pages -->
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link active" :to="{ name: 'Home' }">
              <i class="fa fa-bed me-2" aria-hidden="true"></i> Hotel
            </router-link>
          </li>
          
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'Favorites' }">
              <i class="fa fa-heart me-2" aria-hidden="true"></i> Favorites
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Nav',
};
</script>

<style scoped>
.navbar {
  background-color: #55b341;
  color: white;
  padding: 20px 50px;
}

.navbar-brand {
  width: 150px;
}

.navbar-nav {
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
}

.nav-item {
  font-size: 14px;
  font-weight: 500;
  width: 120px;
  height: 40px;
  text-align: center;
}

.nav-item:first-child {
  border: 1px solid white;
  border-radius: 30px;
  background-color: #912742;
}
</style>
