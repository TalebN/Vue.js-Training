var eventBus = new Vue();

Vue.component("product-tabs", {
  props: {
    reviews: {
      type: Array,
      required: false,
    },
  },
  template: `
    <div>
    
      <ul>
        <span class="tabs" 
              :class="{ activeTab: selectedTab === tab }"
              v-for="(tab, index) in tabs"
              @click="selectedTab = tab"
              :key="tab"
        >{{ tab }}</span>
      </ul>

      <div v-show="selectedTab === 'Reviews'">
          <p v-if="!reviews.length">There are no reviews yet.</p>
          <ul v-else>
              <li v-for="(review, index) in reviews" :key="index">
                <p>{{ review.name }}</p>
                <p>Rating:{{ review.rating }}</p>
                <p>{{ review.review }}</p>
              </li>
          </ul>
      </div>

      <div v-show="selectedTab === 'Make a Review'">
        <product-review></product-review>
      </div>
  
    </div>
  `,
  data() {
    return {
      tabs: ["Reviews", "Make a Review"],
      selectedTab: "Reviews",
    };
  },
});

Vue.component("product-details", {
  props: {
    details: {
      type: Array,
      required: true,
    },
  },
  template: `
        <ul>
            <li v-for="detail in details">{{detail}}</li>
        </ul>
    `,
});

Vue.component("product-review", {
  template: `
  <form class="review-form" @submit.prevent="onSubmit">
  <p v-if="errors.length">
  <b>Please correct the following error(s):</b>
  <ul>
    <li v-for="error in errors">{{ error }}</li>
  </ul>
</p>
  <p>
    <label for="name">Name:</label>
    <input id="name" v-model="name" placeholder="name">
  </p>
  
  <p>
    <label for="review">Review:</label>      
    <textarea id="review" v-model="review"></textarea>
  </p>
  
  <p>
    <label for="rating">Rating:</label>
    <select id="rating" v-model.number="rating">
      <option>5</option>
      <option>4</option>
      <option>3</option>
      <option>2</option>
      <option>1</option>
    </select>
  </p>

  <p>Would you recommend this product?</p>
  <label>
    Yes
    <input type="radio" value="Yes" v-model="recommend"/>
  </label>
  <label>
    No
    <input type="radio" value="No" v-model="recommend"/>
  </label>
      
  <p>
    <input class="button" type="submit" value="Submit">  
  </p>    

</form>
    `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      recommend: null,
      errors: [],
    };
  },
  methods: {
    containsInvalidCharacters(text) {
      return /<[^>]*>|&/.test(text);
    },
    onSubmit() {
      let containsInvalidChars = this.containsInvalidCharacters(this.review);
      console.log(containsInvalidChars);
      if (this.name && this.rating && this.recommend && !containsInvalidChars) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
        };
        eventBus.$emit("review-submitted", productReview);
        this.name = null;
        this.review = null;
        this.rating = null;
        this.errors = [];
      } else {
        this.errors = [];
        if (!this.name) this.errors.push("Name required");
        if (!this.review) this.errors.push("Review required");
        if (containsInvalidChars) this.errors.push("Review contains invalid characters!");
        if (!this.rating) this.errors.push("Rating required");
        if (!this.recommend) this.errors.push("Recommend required");
      }
    },
  },
});

Vue.component("product", {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
  },

  template: `
    <div class="product">
      <div class="product-image">
        <img v-bind:src="image" />
      </div>

      <div class="product-info">
        <h1>{{ product }}</h1>
        <p>{{title}}</p>
        <p>Shipping: {{ shipping }}</p>

        <product-details :details="details"></product-details>

        <div
          v-for="(variant, index) in variants"
          :key="variant.variantId"
          class="color-box"
          :style="{backgroundColor: variant.variantColor}"
          @mouseover="updateProduct(index)"
        ></div>

        <p v-if="inStock > 10">In Stock</p>
        <p v-else-if="inStock <= 10 && inStock >0">Almost sold out!</p>
        <p v-else>Out of Stock</p>

        <!-- <p v-if="inStock > 10">In stock</p>
       <p v-else-if="inStock <=10 && inStock > 0" >Almost sold out!</p>
       <span v-else>Out of stock</span> -->

        <p>{{onSale}}</p>
        <a :href="link" target="_blank">For more options click here</a>
        <br />

        <!-- <button v-on:click="addToCart" 
        :disabled="variants[currentVariantIndex].variantInStock === 0"
        :class="{disabledButton: variants[currentVariantIndex].variantInStock === 0 }">
        Add to cart
       </button> -->

        <button
          v-on:click="addToCart"
          :disabled="!inStock"
          :class="{ disabledButton: !inStock }"
        >
          Add to cart
        </button>
        &nbsp;&nbsp;
        <button
        v-on:click="removeFromCart">
        Remove from cart
      </button>
      </div>
      <product-tabs :reviews="reviews"></product-tabs>
    </div>
    `,
  data() {
    return {
      product: "Socks",
      description: "Amazing",
      price: "5$",
      // image: 'src/assets/vmSocks-green.jpg',
      link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
      sales: true,
      details: ["80% cotton", "20% poly", "Gender-neutral"],
      variants: [
        {
          variantId: 1,
          variantColor: "green",
          variantImage: "src/assets/vmSocks-green.jpg",
          variantInStock: 100,
          variantOnSale: true,
        },
        {
          variantId: 2,
          variantColor: "blue",
          variantImage: "src/assets/img_blueSocks.png",
          variantInStock: 8,
          variantOnSale: false,
        },

        {
          variantId: 3,
          variantColor: "red",
          variantImage: "src/assets/img-redSocks.png",
          variantInStock: 0,
          variantOnSale: false,
        },
      ],
      selectedVariant: 0,
      reviews: [],
    };
  },
  methods: {
    addToCart: function () {
      this.$emit("add-to-cart", this.variants[this.selectedVariant].variantId);
    },
    removeFromCart: function () {
      this.$emit(
        "remove-from-cart",
        this.variants[this.selectedVariant].variantId
      );
    },
    updateProduct: function (index) {
      this.selectedVariant = index;
      console.log(this.selectedVariant);
    },
  },
  computed: {
    image() {
      return this.variants[this.selectedVariant].variantImage;
    },
    inStock: function () {
      return this.variants[this.selectedVariant].variantInStock;
    },
    onSale() {
      if (this.variants[this.selectedVariant].variantOnSale) return "On Sale";
    },
    title() {
      return this.description + " and only for " + this.price;
    },
    shipping() {
      console.log(this.premium);
      if (this.premium) return "Free";
      else return 2.99;
    },
  },
  mounted() {
    eventBus.$on("review-submitted", (productReview) => {
      this.reviews.push(productReview);
    });
  },
});

var appi = new Vue({
  el: "#app",
  data: {
    premium: true,
    cart: [],
  },
  methods: {
    updateCart(id) {
      this.cart.push(id);
    },
    removeFromCart(id) {
      for (var i = this.cart.length - 1; i >= 0; i--) {
        if (this.cart[i] === id) this.cart.splice(i, 1);
      }
    },
  },
});
